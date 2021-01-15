package com.eduardosmatheus.githubtagsserver.services

import com.eduardosmatheus.githubtagsserver.model.User
import com.eduardosmatheus.githubtagsserver.repositories.UsersRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService {

    @Autowired
    private lateinit var usersRepository: UsersRepository
    @Autowired
    private lateinit var bCryptPasswordEncoder: BCryptPasswordEncoder

    @Transactional
    fun signUp(user: User): User {
        val encodedPassword = bCryptPasswordEncoder.encode(user.password)
        return usersRepository.save(user.copy(password = encodedPassword))
    }

    fun findByEmail(email: String) = usersRepository.findByEmail(email)
}