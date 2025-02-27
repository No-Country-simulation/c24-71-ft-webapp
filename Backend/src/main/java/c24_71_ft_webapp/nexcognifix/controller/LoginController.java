package c24_71_ft_webapp.nexcognifix.controller;

import c24_71_ft_webapp.nexcognifix.domain.professional.DataLoginProfessional;
import c24_71_ft_webapp.nexcognifix.domain.professional.Professional;
import c24_71_ft_webapp.nexcognifix.infrastructure.security.DataJWTToken;
import c24_71_ft_webapp.nexcognifix.infrastructure.security.TokenService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/login")
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);


    @Autowired
        private TokenService tokenService;

        @Autowired
        private AuthenticationManager authenticationManager;

    @PostConstruct
    public void init() {
        System.out.println("🚀 LoginController cargado correctamente");
    }

    @PostMapping
    public ResponseEntity<DataJWTToken> autenticateProfessional(@RequestBody @Valid DataLoginProfessional dataLoginProfessional) {
        logger.info("Intentando autenticar al usuario: {}", dataLoginProfessional.email());

        Authentication authToken = new UsernamePasswordAuthenticationToken(
                dataLoginProfessional.email(), dataLoginProfessional.password());

        var professionalAuthenticated = authenticationManager.authenticate(authToken);

        var JWTToken = tokenService.generateToken((Professional) professionalAuthenticated.getPrincipal());
        System.out.println("Autenticación exitosa para: " + dataLoginProfessional.email());
            return ResponseEntity.ok(new DataJWTToken(JWTToken));
    }
}
