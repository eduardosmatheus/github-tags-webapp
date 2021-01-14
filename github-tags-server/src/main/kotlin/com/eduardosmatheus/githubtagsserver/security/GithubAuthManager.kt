package com.eduardosmatheus.githubtagsserver.security

import com.eduardosmatheus.githubtagsserver.model.GithubUser
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component

@Component
class GithubAuthManager: AuthenticationManager {
    override fun authenticate(authentication: Authentication?): Authentication {
        val githubUser = authentication?.principal as GithubUser
        return UsernamePasswordAuthenticationToken(githubUser, null)
    }
}