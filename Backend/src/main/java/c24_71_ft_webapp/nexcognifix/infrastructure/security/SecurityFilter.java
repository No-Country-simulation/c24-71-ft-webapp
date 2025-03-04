package c24_71_ft_webapp.nexcognifix.infrastructure.security;

import c24_71_ft_webapp.nexcognifix.domain.professional.ProfessionalRepository;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ProfessionalRepository professionalRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        var authHeader = request.getHeader("Authorization");

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                var token = authHeader.replace("Bearer ", "");
                var subject = tokenService.getSubject(token);
                if (subject != null) {
                    var professional = professionalRepository.findByEmail(subject);
                    if (professional != null) {
                        var authentication = new UsernamePasswordAuthenticationToken(
                                professional, null, professional.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (JWTVerificationException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json; charset=UTF-8");
            String jsonErrorResponse = "{\"error\": \"Token inválido o expirado. Autenticación fallida.\"}";
            response.getWriter().write(jsonErrorResponse);
            return;
        }
        filterChain.doFilter(request, response);
    }


}
