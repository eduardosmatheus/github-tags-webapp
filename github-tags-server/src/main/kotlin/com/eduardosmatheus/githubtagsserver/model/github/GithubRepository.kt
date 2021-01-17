package com.eduardosmatheus.githubtagsserver.model.github

import com.fasterxml.jackson.annotation.JsonProperty

data class GithubRepository(
	val id: Int,
	val name: String,
	@JsonProperty("full_name")
	val fullName: String,
	@JsonProperty("html_url")
	val htmlUrl: String,
	val description: String
)