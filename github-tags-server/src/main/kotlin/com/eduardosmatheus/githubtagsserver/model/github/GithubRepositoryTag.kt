package com.eduardosmatheus.githubtagsserver.model.github

import com.eduardosmatheus.githubtagsserver.model.Tag
import javax.persistence.*

@Entity
data class GithubRepositoryTag(
	@Id @GeneratedValue
	val id: Int,
	@Column(name = "repository_id")
	val repositoryId: Int,
	@ManyToOne
	@JoinColumn(name = "tag_id")
	val tag: Tag
)