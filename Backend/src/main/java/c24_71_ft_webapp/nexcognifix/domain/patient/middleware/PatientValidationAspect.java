package c24_71_ft_webapp.nexcognifix.domain.patient.middleware;


import c24_71_ft_webapp.nexcognifix.domain.patient.Patient;
import c24_71_ft_webapp.nexcognifix.domain.patient.PatientRepository;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientCreateDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientUpdateDTO;
import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import c24_71_ft_webapp.nexcognifix.infrastructure.security.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class PatientValidationAspect {

    private final PatientRepository patientRepository;
    private final AuthService authService;


//    // Middleware para validar si existen parametros en la base de datos como email, y dni.
//    @Around("execution(* *..PatientService.createPatient(..)) && args(patientCreateDTO,..) || " +
//            "execution(* *..PatientService.updatePatient(..)) && args(id, patientUpdateDTO,..)")
//    public Object validateCreateOrUpdatePatient(ProceedingJoinPoint joinPoint) throws Throwable {
//
//        System.out.println("entro validacion de paciente");
//
//        Object[] args = joinPoint.getArgs();
//        for (Object arg : args) {
//            if (arg instanceof PatientCreateDTO dto) {
//                validateDniAndEmail(dto.dni(), dto.email());
//            } else if (arg instanceof PatientUpdateDTO dto) {
//                validateDniAndEmail(null, dto.email());
//            }
//        }
//
//        return joinPoint.proceed();
//    }


    @Around("execution(* c24_71_ft_webapp.nexcognifix.domain.patient.*.*(..))")
    public Object validateDniAndEmail(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            if (arg instanceof PatientCreateDTO dto) {
                validateDniAndEmail(dto.dni(), dto.email());
            } else if (arg instanceof PatientUpdateDTO dto) {
                System.out.println("Entra a validar update");
                validateDniAndEmail(null, dto.email());
            }
        }

        return joinPoint.proceed();
    }


    // Middleware para validar parametro de ID `updatePatient`, `getPatientById` y `deletePatient`
    @Around("execution(* *..PatientService.getPatientById(..)) && args(id,..) || " +
            "execution(* *..PatientService.updatePatient(..)) && args(id,..) || " +
            "execution(* *..PatientService.deletePatient(..)) && args(id,..)")
    public Object validateParamsIDPatient(ProceedingJoinPoint joinPoint, UUID id) throws Throwable {

        validatePatientExistsAndBelongsToProfessional(id);
        return joinPoint.proceed();
    }


    // Función para validar si existe DNI o Email
    private void validateDniAndEmail(Long dni, String email) {
        if (dni != null && patientRepository.existsByDni(dni)) {
            throw new AppException("El DNI ya existe.", "CONFLICT");
        }
        if (email != null && patientRepository.existsByEmail(email)) {
            System.out.println("valida email");
            throw new AppException("El Email ya existe.", "CONFLICT");
        }
    }

    // Valida que el ID sea un UUID válido, que el paciente exista, esté activo y pertenezca al profesional autenticado
    private void validatePatientExistsAndBelongsToProfessional(UUID id) {
        if (id == null) {
            throw new AppException("El ID del paciente no puede ser nulo.", "BAD_REQUEST");
        }

        UUID professionalId = authService.getAuthenticatedProfessional().getIdProfessional();

        Optional<Patient> patientOpt = patientRepository.findByIdPatientAndProfessional_IdProfessionalAndStatusTrue(id, professionalId);
        if (patientOpt.isEmpty()) {
            throw new AppException("Paciente no encontrado o no pertenece al profesional.....", "NOT_FOUND");
        }
    }






}