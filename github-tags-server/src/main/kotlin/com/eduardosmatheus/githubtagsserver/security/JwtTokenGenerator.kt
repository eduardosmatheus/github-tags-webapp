package com.eduardosmatheus.githubtagsserver.security

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.eduardosmatheus.githubtagsserver.model.User

object JwtTokenGenerator {

	fun generate(verifiedUser: User): String {
		val algorithm = Algorithm.HMAC256("secret")
		val githubClaimsMap = mapOf(
			"githubAccessToken" to verifiedUser.githubClaims?.githubAccessToken,
			"scope" to verifiedUser.githubClaims?.scope,
			"token_type" to verifiedUser.githubClaims?.token_type
		)
		val map = mapOf(
			"id" to verifiedUser.id,
			"email" to verifiedUser.email,
			"fullName" to verifiedUser.fullName,
			"avatarURL" to verifiedUser.avatarURL,
			"username" to verifiedUser.username,
			"githubClaims" to githubClaimsMap
		)
		return JWT.create()
			.withClaim("user", map)
			.withSubject(verifiedUser.email)
			.sign(algorithm)
	}
}