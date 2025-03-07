package c24_71_ft_webapp.nexcognifix.domain.professional;

import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import c24_71_ft_webapp.nexcognifix.infrastructure.security.DataJWTToken;
import c24_71_ft_webapp.nexcognifix.infrastructure.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class ProfessionalService {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public DataJWTToken validarLogin(DataLoginProfessional dataLoginProfessional){
        Professional ifProfessional = professionalRepository.findByEmail(dataLoginProfessional.email());
        if (ifProfessional != null) {
            Authentication authToken = new UsernamePasswordAuthenticationToken(
                    dataLoginProfessional.email(), dataLoginProfessional.password());
            var professionalAuthenticated = authenticationManager.authenticate(authToken);
            var JWTToken = tokenService.generateToken((Professional) professionalAuthenticated.getPrincipal());
            return new DataJWTToken(JWTToken, ifProfessional.getName());
        } else {
            throw new AppException("Las credenciales proporcionadas son incorrectas.", "UNAUTHORIZED");
        }
    }
}
