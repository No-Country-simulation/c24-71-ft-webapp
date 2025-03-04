package c24_71_ft_webapp.nexcognifix.controller;

import c24_71_ft_webapp.nexcognifix.domain.professional.DataLoginProfessional;
import c24_71_ft_webapp.nexcognifix.domain.professional.Professional;
import c24_71_ft_webapp.nexcognifix.domain.professional.ProfessionalService;
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

    @Autowired
    private ProfessionalService professionalService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping
    public ResponseEntity<DataJWTToken> autenticateProfessional(@RequestBody @Valid DataLoginProfessional dataLoginProfessional) {
        DataJWTToken DJT = professionalService.validarLogin(dataLoginProfessional);
        return ResponseEntity.ok(DJT);
    }
}
