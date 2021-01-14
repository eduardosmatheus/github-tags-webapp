package com.eduardosmatheus.githubtagsserver.services

import com.eduardosmatheus.githubtagsserver.model.GithubUser
import com.eduardosmatheus.githubtagsserver.security.UserClaims
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import org.springframework.http.*
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

object GithubService {
    private val githubApiBaseURL = "https://api.github.com/user"

    fun getCurrentUser(token: String): GithubUser? {
        val restClient = RestTemplate()
        val headers = HttpHeaders()
        headers["Authorization"] = token
        val entity = HttpEntity<Any>(headers)
        val response = restClient.exchange(githubApiBaseURL, HttpMethod.GET,
            entity, GithubUser::class.java)
        return response.body
    }

    /**
     * TODO: Mover para variáveis de ambiente, em prol de não commitar publicamente.
     */
    private val githubBaseURL = "https://github.com/login/oauth/access_token"
    private val client_id = "b34d2a6fc9da4d853f0a"
    private val client_secret = "bf7914d3bce7e9a5cb6ec9eb9126cc6eeafc8bc3"
    private val BAD_VERIFICATION_CODE = "bad_verification_code"

    fun getClaims(code: String): ResponseEntity<Any> {
        val response = getGithubAuthorization(code)
        val errorCode = response["error"]
        if (errorCode != null && errorCode.asText() == BAD_VERIFICATION_CODE) {
            return ResponseEntity(response, HttpStatus.FORBIDDEN)
        }
        return ResponseEntity(response, HttpStatus.OK)
    }

    private fun getGithubAuthorization(code: String): JsonNode {
        val client = RestTemplate()
        val headers = HttpHeaders()
        headers["Accept"] = "application/json"
        val entity = HttpEntity<UserClaims>(headers)
        val response = client.exchange(
            "$githubBaseURL?client_id=${client_id}&client_secret=${client_secret}&code=$code",
            HttpMethod.POST,
            entity,
            JsonNode::class.java
        )
        return response.body!!
    }
}
