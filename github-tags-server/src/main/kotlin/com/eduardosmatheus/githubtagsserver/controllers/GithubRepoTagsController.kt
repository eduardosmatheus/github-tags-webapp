package com.eduardosmatheus.githubtagsserver.controllers

import com.eduardosmatheus.githubtagsserver.model.github.GithubRepositoryTag
import com.eduardosmatheus.githubtagsserver.repositories.GithubRepoTagsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/repos-tags")
class GithubRepoTagsController {

	@Autowired
	private lateinit var githubRepoTagsRepository: GithubRepoTagsRepository

	@PostMapping
	fun create(@RequestBody githubRepositoryTag: GithubRepositoryTag) =
		githubRepoTagsRepository.save(githubRepositoryTag)

	@DeleteMapping
	fun remove(@PathVariable id: Int) = githubRepoTagsRepository.deleteById(id)
}