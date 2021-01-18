package com.eduardosmatheus.githubtagsserver.services

import com.eduardosmatheus.githubtagsserver.model.User
import com.eduardosmatheus.githubtagsserver.model.github.GithubUser
import com.eduardosmatheus.githubtagsserver.repositories.UsersRepository
import com.eduardosmatheus.githubtagsserver.security.JwtTokenGenerator
import com.eduardosmatheus.githubtagsserver.security.UserClaims
import com.fasterxml.jackson.databind.JsonNode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.util.UriComponentsBuilder

@Service
class GithubService {

    private val githubApiBaseURL = "https://api.github.com/user"

    @Autowired
    private lateinit var usersRepository: UsersRepository

    fun authorize(code: String): String {
        val userClaims = getClaims(code)
        val currentGithubUser = getCurrentUser(userClaims.access_token)
            ?: throw BadCredentialsException("")
        val verifiedUser =
            usersRepository.findByEmail(currentGithubUser.email)
            ?: usersRepository.save(
                User(
                    id = null,
                    email = currentGithubUser.email,
                    fullName = currentGithubUser.name,
                    username = currentGithubUser.login,
                    avatarURL = currentGithubUser.avatar_url
                )
            )
        return JwtTokenGenerator.generate(verifiedUser.copy(githubClaims = userClaims))
    }

    fun getCurrentUser(token: String): GithubUser? {
        val restClient = RestTemplateBuilder()
            .defaultHeader("Authorization", "token $token")
            .build()
        val response = restClient.getForEntity(githubApiBaseURL, GithubUser::class.java)
        return response.body
    }

    /**
     * TODO: Mover para variáveis de ambiente, em prol de não commitar publicamente.
     */
    private val githubBaseURL = "https://github.com/login/oauth/access_token"
    private val client_id = "b34d2a6fc9da4d853f0a"
    private val client_secret = "bf7914d3bce7e9a5cb6ec9eb9126cc6eeafc8bc3"
    private val BAD_VERIFICATION_CODE = "bad_verification_code"

    fun getClaims(code: String): UserClaims {
        val response = getGithubAuthorization(code)
        val errorCode = response["error"]
        if (errorCode != null && errorCode.asText() == BAD_VERIFICATION_CODE) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Por favor, autorize esta aplicação novamente.")
        }
        return UserClaims(
            response["access_token"]!!.asText(),
            response["scope"]!!.asText(),
            response["token_type"]!!.asText()
        )
    }

    private fun getGithubAuthorization(code: String): JsonNode {
        val url = UriComponentsBuilder.newInstance()
            .scheme("https")
            .host("github.com")
            .path("/login/oauth/access_token")
            .queryParam("client_id", client_id)
            .queryParam("client_secret", client_secret)
            .queryParam("code", code)
            .build()

        val client = RestTemplateBuilder()
            .defaultHeader("Accept", "application/json")
            .build()

        val response = client.postForEntity(url.toUriString(), null, JsonNode::class.java)

        return response.body!!
    }
}
