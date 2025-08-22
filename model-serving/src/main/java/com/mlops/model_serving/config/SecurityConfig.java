package com.mlops.model_serving.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.enable()) // 啟用 CSRF 保護
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/v1/health").permitAll() // 健康檢查端點允許匿名訪問
                .requestMatchers("/actuator/**").permitAll() // Actuator 端點允許匿名訪問
                .anyRequest().authenticated() // 其他所有請求需要認證
            )
            .httpBasic(Customizer.withDefaults()); // 啟用基本認證
        
        return http.build();
    }
}
