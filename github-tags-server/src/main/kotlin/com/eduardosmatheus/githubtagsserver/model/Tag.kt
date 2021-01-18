package com.eduardosmatheus.githubtagsserver.model

import javax.persistence.*

@Entity
@Table(name = "tags")
data class Tag(
	@Id @GeneratedValue
	val id: Int,
	@Column
	val name: String,
	@OneToOne
	@JoinColumn(name = "user_id")
	val user: User
)