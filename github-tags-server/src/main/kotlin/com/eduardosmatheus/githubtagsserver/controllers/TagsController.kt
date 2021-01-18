package com.eduardosmatheus.githubtagsserver.controllers

import com.eduardosmatheus.githubtagsserver.model.Tag
import com.eduardosmatheus.githubtagsserver.repositories.GithubRepoTagsRepository
import com.eduardosmatheus.githubtagsserver.repositories.TagsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/tags")
class TagsController {

	@Autowired
	private lateinit var tagsRepository: TagsRepository
	@Autowired
	private lateinit var githubRepoTagsRepository: GithubRepoTagsRepository

	@GetMapping
	fun findAll() = tagsRepository.findAll()

	@PostMapping
	fun create(@RequestBody payload: Tag) = tagsRepository.save(payload)

	@PutMapping
	fun update(@RequestBody payload: Tag) = tagsRepository.save(payload)

	@DeleteMapping("/{id}")
	fun delete(@PathVariable id: Int) {
		val existingAssociations = githubRepoTagsRepository.findByTagId(id)
		if (existingAssociations.isNotEmpty()) {
			throw ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,
				"Não é possível remover tags que ainda possuem associações."
			)
		}
		tagsRepository.deleteById(id)
	}
}