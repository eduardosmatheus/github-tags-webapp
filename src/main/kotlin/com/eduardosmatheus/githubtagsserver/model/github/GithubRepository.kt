package com.eduardosmatheus.githubtagsserver.model.github

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class GithubRepository(
	val id: Int,
	val name: String,
	val full_name: String,
	val html_url: String,
	val description: String,
	val tags: List<GithubRepositoryTag>? = emptyList()
)