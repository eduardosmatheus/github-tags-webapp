package com.eduardosmatheus.githubtagsserver.services

import com.eduardosmatheus.githubtagsserver.repositories.UsersRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {

    @Autowired
    private lateinit var usersRepository: UsersRepository

    fun findByEmail(email: String) = usersRepository.findByEmail(email)
}