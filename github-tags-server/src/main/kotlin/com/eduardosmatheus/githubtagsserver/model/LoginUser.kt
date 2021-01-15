package com.eduardosmatheus.githubtagsserver.model

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.annotation.JsonDeserialize

@JsonDeserialize
data class LoginUser(@JsonProperty val email: String, @JsonProperty val password: String)