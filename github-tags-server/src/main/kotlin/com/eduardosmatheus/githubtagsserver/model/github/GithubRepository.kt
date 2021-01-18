package com.eduardosmatheus.githubtagsserver.model.github

data class GithubRepository(
	val id: Int,
	val name: String,
	val full_name: String,
	val html_url: String,
	val description: String
)