package com.eduardosmatheus.githubtagsserver.security

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.GenericFilterBean
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

@Component
class AuthorizationFilter : GenericFilterBean() {

    private fun getUser(token: String): UsernamePasswordAuthenticationToken {
        val algorithm = Algorithm.HMAC256("secret")
        val verifier = JWT.require(algorithm).build()
        val decodedToken = verifier.verify(token)
        val user = decodedToken.getClaim("user").asMap()

        return UsernamePasswordAuthenticationToken(user, null, emptyList())
    }

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        val accessToken = (request as HttpServletRequest).getHeader("Authorization")
        if (accessToken == null) {
            chain?.doFilter(request, response)
            return
        }
        val verifiedUser = getUser(accessToken.replace("Bearer ", ""))
        SecurityContextHolder.getContext().authentication = verifiedUser
        chain?.doFilter(request, response)
    }
}