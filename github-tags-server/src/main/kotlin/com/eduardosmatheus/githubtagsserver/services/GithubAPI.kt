package com.eduardosmatheus.githubtagsserver.services

import com.eduardosmatheus.githubtagsserver.model.github.GithubRepository
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.stereotype.Service

@Service
class GithubAPI {

	private val githubUserApiURL = "https://api.github.com/user"

	fun getUserStarredRepositories(userToken: String): Array<GithubRepository> {
		val apiClient = RestTemplateBuilder()
			.defaultHeader("Authorization", "token $userToken")
			.defaultHeader("Accept", "application/vnd.github.v3+json")
			.rootUri(githubUserApiURL)
			.build()
		val response = apiClient.getForEntity("/starred", Array<GithubRepository>::class.java)
		return response.body ?: emptyArray()
	}

}