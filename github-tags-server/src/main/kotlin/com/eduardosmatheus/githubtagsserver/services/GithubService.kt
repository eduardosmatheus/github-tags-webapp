package com.eduardosmatheus.githubtagsserver.services

import com.eduardosmatheus.githubtagsserver.model.User
import com.eduardosmatheus.githubtagsserver.model.github.GithubRepository
import com.eduardosmatheus.githubtagsserver.model.github.GithubUser
import com.eduardosmatheus.githubtagsserver.repositories.GithubRepoTagsRepository
import com.eduardosmatheus.githubtagsserver.repositories.UsersRepository
import com.eduardosmatheus.githubtagsserver.security.JwtTokenGenerator
import com.eduardosmatheus.githubtagsserver.security.UserClaims
import com.fasterxml.jackson.databind.JsonNode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.util.UriComponentsBuilder

@Service
class GithubService {

    @Value("\${com.tags-server.github.user-base-url}")
    private lateinit var githubApiBaseURL: String

    @Value("\${com.tags-server.github.client-id}")
    private lateinit var clientID: String

    @Value("\${com.tags-server.github.client-secret}")
    private lateinit var clientSecret: String

    @Autowired
    private lateinit var usersRepository: UsersRepository

    @Autowired
    private lateinit var githubRepoTagsRepository: GithubRepoTagsRepository

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

    fun getClaims(code: String): UserClaims {
        val response = getGithubAuthorization(code)
        val errorCode = response["error"]
        if (errorCode != null && errorCode.asText() == "bad_verification_code") {
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
            .queryParam("client_id", clientID)
            .queryParam("client_secret", clientSecret)
            .queryParam("code", code)
            .build()

        val client = RestTemplateBuilder()
            .defaultHeader("Accept", "application/json")
            .build()

        val response = client.postForEntity(url.toUriString(), null, JsonNode::class.java)

        return response.body!!
    }

    fun getUserStarredRepositories(userToken: String): List<GithubRepository> {
        val apiClient = RestTemplateBuilder()
            .defaultHeader("Authorization", "token $userToken")
            .defaultHeader("Accept", "application/vnd.github.v3+json")
            .rootUri(githubApiBaseURL)
            .build()
        val response = apiClient.getForEntity("/starred", Array<GithubRepository>::class.java)
        val starredRepos = response.body ?: emptyArray()
        return starredRepos.map { repo ->
            val tags = githubRepoTagsRepository.findByRepositoryId(repo.id)
            repo.copy(tags = tags)
        }
    }
}
