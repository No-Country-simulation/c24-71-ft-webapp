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


    // Middleware para validar parametro de ID `updatePatient`, `createPatientById`
    @Around("execution(* *..PatientService.createPatient(..)) && args(patientCreateDTO,..)")
    public Object validateCreatePatient(ProceedingJoinPoint joinPoint, PatientCreateDTO patientCreateDTO) throws Throwable {

        validateDniAndEmailForCreate(patientCreateDTO.dni(), patientCreateDTO.email());

        return joinPoint.proceed();
    }

    // Middleware para validar parametro de ID e email `updatePatient`
    @Around("execution(* *..PatientService.updatePatient(..)) && args(id, patientUpdateDTO,..)")
    public Object validateUpdatePatient(ProceedingJoinPoint joinPoint, UUID id, PatientUpdateDTO patientUpdateDTO) throws Throwable {

            validatePatientExistsAndBelongsToProfessional(id);
            validateEmailForUpdate(id, patientUpdateDTO.email());

        return joinPoint.proceed();
    }

    // Middleware para validar parametro de ID `getPatientById` y `deletePatient`
    @Around("execution(* *..PatientService.getPatientById(..)) && args(id,..) || " +
            "execution(* *..PatientService.deletePatient(..)) && args(id,..)")
    public Object validateParamsIDPatient(ProceedingJoinPoint joinPoint, UUID id) throws Throwable {

        validatePatientExistsAndBelongsToProfessional(id);
        return joinPoint.proceed();
    }


    // Validación de `DNI` y `Email` para `createPatient()`
    private void validateDniAndEmailForCreate(Long dni, String email) {
        if (dni != null && patientRepository.existsByDni(dni)) {
            throw new AppException("El DNI ya existe.", "CONFLICT");
        }
        if (email != null && patientRepository.existsByEmail(email)) {
            throw new AppException("El Email ya existe.", "CONFLICT");
        }
    }

   // Validación de `Email` para `updatePatient()`
    private void validateEmailForUpdate(UUID id, String email) {
        if (email != null) {
            Optional<Patient> existingPatient = patientRepository.findByEmail(email);

            if (existingPatient.isPresent() && !existingPatient.get().getIdPatient().equals(id)) {
                throw new AppException("El Email ya está registrado en otro paciente.", "CONFLICT");
            }
        }
    }

    // Valida que el ID sea un UUID válido, que el paciente exista, esté activo y pertenezca al profesional autenticado
    private void validatePatientExistsAndBelongsToProfessional(UUID id) {
        if (id == null) {
            throw new AppException("El ID del paciente no puede ser nulo.", "BAD_REQUEST");
        }
        UUID professionalId = authService.getAuthenticatedUser().getIdProfessional();

        Optional<Patient> patientOpt = patientRepository.findByIdPatientAndProfessional_IdProfessionalAndStatusTrue(id, professionalId);
        if (patientOpt.isEmpty()) {
            throw new AppException("ID Paciente no encontrado", "NOT_FOUND");
        }
    }


}