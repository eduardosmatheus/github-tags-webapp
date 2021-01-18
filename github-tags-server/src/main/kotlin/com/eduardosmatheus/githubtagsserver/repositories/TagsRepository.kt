package com.eduardosmatheus.githubtagsserver.repositories

import com.eduardosmatheus.githubtagsserver.model.Tag
import org.springframework.data.repository.CrudRepository

interface TagsRepository: CrudRepository<Tag, Int>