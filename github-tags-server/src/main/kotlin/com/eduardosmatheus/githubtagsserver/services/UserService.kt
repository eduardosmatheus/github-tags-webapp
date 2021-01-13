package com.eduardosmatheus.githubtagsserver.services

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.JsonNodeFactory
import com.fasterxml.jackson.databind.node.ObjectNode
import org.springframework.http.*
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.util.DefaultUriBuilderFactory
import java.net.URI
import java.net.URL

@Service
class UserService {

    private val githubBaseURL = "https://github.com/login/oauth/access_token"
    private val client_id = "b34d2a6fc9da4d853f0a"
    private val client_secret = "bf7914d3bce7e9a5cb6ec9eb9126cc6eeafc8bc3"
    private val BAD_VERIFICATION_CODE = "bad_verification_code"

    fun authorize(code: String): UserClaims {
        val (client, entity) = githubClient()
        val response = getGithubAuthorization(client, code, entity)
        val errorCode = response["error"]
        if (errorCode != null && errorCode.asText() == BAD_VERIFICATION_CODE) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Renove as credenciais no login.")
        }
        return UserClaims(
            response["access_token"].asText(),
            response["scope"].asText(),
            response["token_type"].asText()
        )
    }

    private fun githubClient(): Pair<RestTemplate, HttpEntity<UserClaims>> {
        val client = RestTemplate()
        val headers = HttpHeaders()
        headers["Accept"] = "application/json"
        val entity = HttpEntity<UserClaims>(headers)
        return Pair(client, entity)
    }

    private fun getGithubAuthorization(
        client: RestTemplate,
        code: String,
        entity: HttpEntity<UserClaims>
    ): JsonNode {
        val response = client.exchange(
            "$githubBaseURL?client_id=${client_id}&client_secret=${client_secret}&code=$code",
            HttpMethod.POST,
            entity,
            JsonNode::class.java
        )
        return response.body!!
    }

}

data class UserClaims(val access_token: String, val scope: String, val token_type: String)