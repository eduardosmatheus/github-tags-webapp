package com.eduardosmatheus.githubtagsserver.model

import javax.persistence.*

@Entity
@Table(name = "tags")
data class Tag(
	@Id @GeneratedValue
	val id: Int,
	@Column
	val name: String,
	val user: User
)