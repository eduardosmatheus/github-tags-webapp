package com.eduardosmatheus.githubtagsserver.security

import com.fasterxml.jackson.annotation.JsonProperty

data class UserClaims(
	@JsonProperty("access_token")
	val githubAccessToken: String,
	val scope: String,
	val token_type: String
)