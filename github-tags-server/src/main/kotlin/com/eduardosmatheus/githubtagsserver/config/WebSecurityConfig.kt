package com.eduardosmatheus.githubtagsserver.config

import com.auth0.jwt.algorithms.Algorithm
import com.eduardosmatheus.githubtagsserver.security.AuthenticationFilter
import com.eduardosmatheus.githubtagsserver.security.AuthorizationFilter
import com.eduardosmatheus.githubtagsserver.security.SystemUserAuthProvider
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    @Autowired
    private lateinit var authProvider: SystemUserAuthProvider

    @Throws(Exception::class)
    override fun configure(httpSecurity: HttpSecurity) {
        httpSecurity.sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and().cors().and()
            .csrf().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS).permitAll()
            .antMatchers(HttpMethod.POST, "/login").permitAll()
            .antMatchers(HttpMethod.POST, "/api/users").permitAll()
            .antMatchers(HttpMethod.POST, "/api/users/claim-access").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilter(AuthenticationFilter(authenticationManagerBean()))
            .addFilterBefore(AuthorizationFilter(), BasicAuthenticationFilter::class.java)
    }

    @Bean
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.authenticationProvider(authProvider)
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf(
            "http://localhost:3000",
            "https://localhost:3000",
        )
        configuration.allowedMethods = listOf("POST", "PUT", "OPTIONS", "GET", "DELETE")
        configuration.maxAge = 3600
        configuration.allowedHeaders = listOf("Authorization", "Origin", "Content-Type")
        configuration.exposedHeaders = listOf("Authorization", "Origin", "Content-Type")
        configuration.allowCredentials = true
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun bCryptPasswordEncoder() = BCryptPasswordEncoder()

    @Bean
    fun algorithm() = Algorithm.HMAC256("MySecret")
}