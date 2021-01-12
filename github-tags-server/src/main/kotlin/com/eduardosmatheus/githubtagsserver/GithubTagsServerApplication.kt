package com.eduardosmatheus.githubtagsserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class GithubTagsServerApplication

fun main(args: Array<String>) {
	runApplication<GithubTagsServerApplication>(*args)
}
