package com.eduardosmatheus.githubtagsserver.security

import com.eduardosmatheus.githubtagsserver.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component

@Component
class SystemUserAuthProvider: AuthenticationProvider {
	@Autowired
	private lateinit var userService: UserService

	@Autowired
	private lateinit var bCryptPasswordEncoder: BCryptPasswordEncoder

	override fun authenticate(authentication: Authentication?): Authentication {
		val email = authentication?.principal as String
		val password = authentication.credentials as String

		val verifiedUser = userService.findByEmail(email)
			?: throw BadCredentialsException("E-mail/Senha inválidos.")

		if (!bCryptPasswordEncoder.matches(password, verifiedUser.password)) {
			throw BadCredentialsException("E-mail/Senha inválidos.")
		}
		return UsernamePasswordAuthenticationToken(verifiedUser, null, emptyList())
	}

	override fun supports(authentication: Class<*>?): Boolean {
		return authentication == UsernamePasswordAuthenticationToken::class.java
	}

}