package com.eduardosmatheus.githubtagsserver.controllers

import com.eduardosmatheus.githubtagsserver.services.GithubService
import com.eduardosmatheus.githubtagsserver.services.GithubUser
import com.eduardosmatheus.githubtagsserver.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UserController {

    @Autowired
    private lateinit var userService: UserService

    @PostMapping("/claim-access")
    fun authorize(@RequestParam code: String) = userService.getClaims(code)

    @GetMapping("/current")
    fun getCurrentUser(authentication: Authentication) = authentication.principal as GithubUser
}