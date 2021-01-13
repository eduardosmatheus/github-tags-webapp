package com.eduardosmatheus.githubtagsserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [UserDetailsServiceAutoConfiguration::class])
class GithubTagsServerApplication

fun main(args: Array<String>) {
	runApplication<GithubTagsServerApplication>(*args)
}
