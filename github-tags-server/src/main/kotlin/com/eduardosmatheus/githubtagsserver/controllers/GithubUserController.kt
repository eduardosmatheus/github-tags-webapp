package com.eduardosmatheus.githubtagsserver.controllers

import com.eduardosmatheus.githubtagsserver.model.github.GithubRepository
import com.eduardosmatheus.githubtagsserver.services.GithubAPI
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/github")
class GithubUserController {

	@Autowired
	private lateinit var githubAPI: GithubAPI

	@GetMapping("/starred-repos")
	fun getStarredRepos(authentication: Authentication): Array<GithubRepository> {
		val currentUser = authentication.principal as Map<*, *>
		val githubClaims = currentUser["githubClaims"] as Map<*, *>
		return githubAPI.getUserStarredRepositories(githubClaims["githubAccessToken"]!!.toString())
	}
}