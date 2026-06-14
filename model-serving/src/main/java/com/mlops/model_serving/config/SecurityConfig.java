package com.mlops.model_serving.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.ignoringRequestMatchers("/api/v1/health", "/actuator/**")) // 對健康檢查和監控端點忽略 CSRF
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/v1/health").permitAll() // 健康檢查端點允許匿名訪問
                .requestMatchers("/actuator/**").permitAll() // Actuator 端點允許匿名訪問
                .anyRequest().authenticated() // 其他所有請求需要認證
            )
            .httpBasic(Customizer.withDefaults()) // 啟用基本認證
            .headers(headers -> headers
                .frameOptions(frame -> frame.deny()) // 防止點擊劫持
                .contentTypeOptions(content -> {}) // 防止 MIME 類型嗅探
            );
        
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
