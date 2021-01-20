package com.eduardosmatheus.githubtagsserver.controllers

import com.eduardosmatheus.githubtagsserver.services.GithubService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController {

    @Autowired
    private lateinit var githubService: GithubService

    @PostMapping("/claim-access")
    fun authorize(@RequestParam code: String) = githubService.authorize(code)

    @GetMapping("/current")
    fun getCurrentUser(authentication: Authentication) = authentication.principal

}