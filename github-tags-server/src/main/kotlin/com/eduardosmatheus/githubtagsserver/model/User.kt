package com.eduardosmatheus.githubtagsserver.model

import com.eduardosmatheus.githubtagsserver.security.UserClaims
import com.fasterxml.jackson.annotation.JsonInclude
import javax.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue
    val id: Int?,
    @Column
    val email: String,
    @Column
    val password: String,
    @Column
    val fullName: String,
    @Column
    val username: String,
    @Column
    val avatarURL: String,
    @JsonInclude
    @Transient
    val githubClaims: UserClaims? = null
)