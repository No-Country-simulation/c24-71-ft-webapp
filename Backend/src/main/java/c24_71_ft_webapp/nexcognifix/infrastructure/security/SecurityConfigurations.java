package c24_71_ft_webapp.nexcognifix.infrastructure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class SecurityConfigurations {

    @Value("${frontend.cors.url}")
    private String frontendCors;

    @Autowired
    private SecurityFilter securityFilter;

    public static final List<PublicEndpoint> PUBLIC_ENDPOINTS = List.of(
            new PublicEndpoint("/api/login", HttpMethod.POST),
            new PublicEndpoint("/api/game-sessions/patient/join/{sessionId}", HttpMethod.GET),
            new PublicEndpoint("/api/game-sessions/patient/join/{sessionId}/start", HttpMethod.PATCH),
            new PublicEndpoint("/api/game-sessions/patient/join/{sessionId}/cancel", HttpMethod.PATCH),
            new PublicEndpoint("/api/game-sessions/patient/join/{sessionId}/results", HttpMethod.POST),
            new PublicEndpoint("/api/docs", HttpMethod.GET),
            new PublicEndpoint("/api/docs/swagger-config", HttpMethod.GET),
            new PublicEndpoint("/api/docs/swagger-ui/**", HttpMethod.GET),
            new PublicEndpoint("/api/v3/api-docs/**", HttpMethod.GET)
    );

    private final UserDetailsService userDetailsService;

    public SecurityConfigurations(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    // Permitir acceso sin autenticación a los endpoints públicos
                    PUBLIC_ENDPOINTS.forEach(endpoint ->
                            auth.requestMatchers(endpoint.method(), endpoint.url()).permitAll()
                    );

                    // Requerir autenticación para cualquier otro endpoint
                    auth.anyRequest().authenticated();
                })
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Collections.singletonList(frontendCors));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
