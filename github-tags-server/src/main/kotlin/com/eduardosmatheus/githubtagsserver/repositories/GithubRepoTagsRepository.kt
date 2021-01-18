package com.eduardosmatheus.githubtagsserver.repositories

import com.eduardosmatheus.githubtagsserver.model.github.GithubRepositoryTag
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GithubRepoTagsRepository: JpaRepository<GithubRepositoryTag, Int>