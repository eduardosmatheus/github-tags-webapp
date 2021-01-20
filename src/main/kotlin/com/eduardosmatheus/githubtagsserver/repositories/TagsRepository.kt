package com.eduardosmatheus.githubtagsserver.repositories

import com.eduardosmatheus.githubtagsserver.model.Tag
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TagsRepository: CrudRepository<Tag, Int>