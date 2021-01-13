package com.eduardosmatheus.githubtagsserver.security

import com.eduardosmatheus.githubtagsserver.services.GithubService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.stereotype.Service
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class AuthorizationFilter(authManager: AuthenticationManager) : BasicAuthenticationFilter(authManager) {

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val accessToken = request.getHeader("Authorization")
        if (accessToken == null) {
            chain.doFilter(request, response)
            return
        }
        val authenticatedUser = getAuthenticatedUser(accessToken)
        SecurityContextHolder.getContext().authentication = authenticatedUser
        chain.doFilter(request, response)
    }

    private fun getAuthenticatedUser(accessToken: String): UsernamePasswordAuthenticationToken? {
        val githubUser = GithubService.getCurrentUser(accessToken) ?: return null
        return UsernamePasswordAuthenticationToken(githubUser, null)
    }
}