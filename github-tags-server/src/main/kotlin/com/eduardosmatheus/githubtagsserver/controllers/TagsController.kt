package com.eduardosmatheus.githubtagsserver.controllers

import com.eduardosmatheus.githubtagsserver.model.Tag
import com.eduardosmatheus.githubtagsserver.repositories.TagsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tags")
class TagsController {

	@Autowired
	private lateinit var tagsRepository: TagsRepository

	@GetMapping
	fun findAll() = tagsRepository.findAll()

	@PostMapping
	fun create(@RequestBody payload: Tag) = tagsRepository.save(payload)

	@PutMapping
	fun update(@RequestBody payload: Tag) = tagsRepository.save(payload)

	@DeleteMapping("/{id}")
	fun delete(@PathVariable id: Int) = tagsRepository.deleteById(id)
}