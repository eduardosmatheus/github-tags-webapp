package com.eduardosmatheus.githubtagsserver.controllers

import com.eduardosmatheus.githubtagsserver.model.github.GithubRepositoryTag
import com.eduardosmatheus.githubtagsserver.repositories.GithubRepoTagsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/repositories/{repositoryId}/tags")
class GithubRepoTagsController {

	@Autowired
	private lateinit var githubRepoTagsRepository: GithubRepoTagsRepository

	@PostMapping
	fun create(@RequestBody githubRepositoryTag: GithubRepositoryTag) =
		githubRepoTagsRepository.save(githubRepositoryTag)

	@DeleteMapping("/{id}")
	fun remove(@PathVariable id: Int) {
		try {
			githubRepoTagsRepository.deleteById(id)
		} catch (e: EmptyResultDataAccessException) {
			throw ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Tag já foi removida.")
		}
	}
}