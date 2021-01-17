package com.eduardosmatheus.githubtagsserver.controllers

import com.eduardosmatheus.githubtagsserver.services.GithubAPI
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/github")
class GithubUserController {

	@Autowired
	private lateinit var githubAPI: GithubAPI

	@GetMapping
	fun getStarredRepos() = githubAPI.getUserStarredRepositories("4a496a6b0f067bd4e63a2e9d107dc0b876c07182")
}