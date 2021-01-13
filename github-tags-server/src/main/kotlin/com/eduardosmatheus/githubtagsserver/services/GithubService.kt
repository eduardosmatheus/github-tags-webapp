package com.eduardosmatheus.githubtagsserver.services

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
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
        val response = restClient.exchange(githubApiBaseURL, HttpMethod.GET, entity, GithubUser::class.java)
        return response.body
    }
}

@JsonDeserialize
@JsonIgnoreProperties(ignoreUnknown = true)
data class GithubUser(
    val login: String,
    @JsonProperty("avatar_url")
    val avatarUrl: String,
    val email: String
)