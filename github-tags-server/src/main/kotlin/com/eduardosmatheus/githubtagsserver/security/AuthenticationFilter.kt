package com.eduardosmatheus.githubtagsserver.security

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.eduardosmatheus.githubtagsserver.model.LoginUser
import com.eduardosmatheus.githubtagsserver.model.User
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.stereotype.Component
import java.io.IOException
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class AuthenticationFilter(authManager: AuthenticationManager)
    : UsernamePasswordAuthenticationFilter(authManager) {
    override fun attemptAuthentication(request: HttpServletRequest?, response: HttpServletResponse?): Authentication {
        val mapper = jacksonObjectMapper()
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true)
        mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true)
        mapper.configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true)
        val user = mapper.readValue(request?.inputStream, LoginUser::class.java)
        return try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    user.email,
                    user.password,
                    emptyList()
                )
            )
        } catch (e: IOException) {
            throw RuntimeException("Erro ao fazer a leitura do usuário.")
        }
    }

    override fun successfulAuthentication(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        chain: FilterChain?,
        authResult: Authentication?
    ) {
        val verifiedUser = (authResult?.principal as User)
        val jwtToken = JwtTokenGenerator.generate(verifiedUser)
        response?.writer?.write(jwtToken)
        response?.writer?.flush()
    }
}