package com.eduardosmatheus.githubtagsserver.security

data class UserClaims(val access_token: String, val scope: String, val token_type: String)