package com.eduardosmatheus.githubtagsserver.security

import com.eduardosmatheus.githubtagsserver.model.LoginUser
import com.eduardosmatheus.githubtagsserver.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component

@Component
class SystemUserAuthManager: AuthenticationManager {
	@Autowired
	private lateinit var userService: UserService

	@Autowired
	private lateinit var bCryptPasswordEncoder: BCryptPasswordEncoder

	override fun authenticate(authentication: Authentication?): Authentication {
		val claimedUser = authentication?.principal as LoginUser
		val verifiedUser = userService.findByEmail(claimedUser.email)
			?: throw BadCredentialsException("E-mail/Senha inválidos.")

		if (!bCryptPasswordEncoder.matches(claimedUser.password, verifiedUser.password)) {
			throw BadCredentialsException("E-mail/Senha inválidos.")
		}
		return UsernamePasswordAuthenticationToken(verifiedUser, null)
	}

}