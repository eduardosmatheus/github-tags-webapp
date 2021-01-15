package com.eduardosmatheus.githubtagsserver.model

import javax.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue
    val id: Int,
    @Column
    val email: String,
    @Column
    val password: String,
    @Column
    val fullName: String
)