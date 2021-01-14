package com.eduardosmatheus.githubtagsserver.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table
data class User(
    @Id @GeneratedValue
    val id: Int,
    val email: String,
    val password: String,
    val fullName: String
)