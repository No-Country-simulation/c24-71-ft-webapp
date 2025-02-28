package c24_71_ft_webapp.nexcognifix.infrastructure.security;

import c24_71_ft_webapp.nexcognifix.domain.professional.Professional;
import c24_71_ft_webapp.nexcognifix.domain.professional.ProfessionalRepository;
import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.UUID;



@Service
@RequiredArgsConstructor
public class AuthService {

    private final ProfessionalRepository professionalRepository;


    public Professional getAuthenticatedProfessional() {
        String email = getAuthenticatedUserEmail();
        var professional = professionalRepository.findByEmail(email);
            if (professional == null) {
                throw new AppException("Professional not found", "NOT_FOUND");
            }
        return professional;
    }

    private String getAuthenticatedUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails userDetails) {
            return userDetails.getUsername(); // 🔹 `getUsername()` devuelve el email
        }

        throw new AppException("User not authenticated", "UNAUTHORIZED");
    }
}
