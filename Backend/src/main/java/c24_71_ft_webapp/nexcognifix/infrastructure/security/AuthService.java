package c24_71_ft_webapp.nexcognifix.infrastructure.security;

import c24_71_ft_webapp.nexcognifix.domain.professional.Professional;
import c24_71_ft_webapp.nexcognifix.domain.professional.ProfessionalRepository;
import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.UUID;



@Service
@RequiredArgsConstructor
public class AuthService {

    private final ProfessionalRepository professionalRepository;


    public Professional getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof Professional) {
            return (Professional) authentication.getPrincipal();
        }

        throw new AppException("El usuario autenticado no es válido.", "FORBIDDEN");
    }

}
