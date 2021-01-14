package com.eduardosmatheus.githubtagsserver.repositories

import com.eduardosmatheus.githubtagsserver.model.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UsersRepository: CrudRepository<User, Int>