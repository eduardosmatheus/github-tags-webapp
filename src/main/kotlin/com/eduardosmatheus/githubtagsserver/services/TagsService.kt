package com.eduardosmatheus.githubtagsserver.services

import com.eduardosmatheus.githubtagsserver.model.Tag
import com.eduardosmatheus.githubtagsserver.repositories.GithubRepoTagsRepository
import com.eduardosmatheus.githubtagsserver.repositories.TagsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class TagsService {

	@Autowired
	private lateinit var tagsRepository: TagsRepository
	@Autowired
	private lateinit var githubRepoTagsRepository: GithubRepoTagsRepository

	fun create(tag: Tag): Tag {
		return try {
			tagsRepository.save(tag)
		} catch (e: DataIntegrityViolationException) {
			throw ResponseStatusException(
				HttpStatus.UNPROCESSABLE_ENTITY,
				"Já existe uma tag com esse nome."
			)
		}
	}

	fun delete(id: Int) {
		val existingAssociations = githubRepoTagsRepository.findByTagId(id)
		if (existingAssociations.isNotEmpty()) {
			throw ResponseStatusException(
				HttpStatus.UNPROCESSABLE_ENTITY,
				"Não é possível remover tags que ainda possuem associações."
			)
		}
		tagsRepository.deleteById(id)
	}
}