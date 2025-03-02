package c24_71_ft_webapp.nexcognifix.infrastructure.security;

import org.springframework.http.HttpMethod;

public record PublicEndpoint(
        String url,
        HttpMethod method
) {
}