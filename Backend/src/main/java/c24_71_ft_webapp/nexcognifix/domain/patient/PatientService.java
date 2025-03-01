package c24_71_ft_webapp.nexcognifix.domain.patient;

import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import lombok.RequiredArgsConstructor;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientCreateDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientDetailDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientUpdateDTO;
import c24_71_ft_webapp.nexcognifix.domain.professional.Professional;
import c24_71_ft_webapp.nexcognifix.domain.professional.ProfessionalRepository;
import c24_71_ft_webapp.nexcognifix.infrastructure.security.AuthService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    private final ProfessionalRepository professionalRepository;

    private final AuthService authService;

    public Page<PatientDTO> getAllPatients(String dni, String name, Pageable pageable) {

        Professional professional = authService.getAuthenticatedProfessional();

        Page<Patient> patientsPage;

        if (dni != null && !dni.isEmpty()) {
            patientsPage = patientRepository.findByDniAndProfessional(Long.valueOf(dni), professional.getIdProfessional(),  pageable);
        } else if (name != null && !name.isEmpty()) {
            patientsPage = patientRepository.findByNameContaining(name, professional.getIdProfessional(), pageable);
        } else {
            patientsPage = patientRepository.findAllByProfessional_IdProfessionalAndStatusTrue(professional.getIdProfessional(), pageable);
        }

        return patientsPage.map(this::convertToDTO);
    }


    public PatientDetailDTO getPatientById(UUID id) {

        Professional professional = authService.getAuthenticatedProfessional();

        Patient patient = patientRepository.findByIdPatientAndProfessional_IdProfessionalAndStatusTrue(id, professional.getIdProfessional())
                .orElseThrow(() -> new AppException("Paciente no encontrado o no pertenece al profesional.", "NOT_FOUND"));


        return new PatientDetailDTO(
                patient.getIdPatient(),
                patient.getDni(),
                patient.getName(),
                patient.getAge(),
                patient.getEmail(),
                patient.getDiagnosis(),
                patient.getStatus(),
                patient.getProfessional().getIdProfessional(),
                patient.getProfessional().getName()
        );
    }


    public PatientDTO createPatient(PatientCreateDTO patientCreateDTO) {

        Professional authenticatedProfessional = authService.getAuthenticatedProfessional();

        Patient patient = new Patient(
                patientCreateDTO.dni(),
                patientCreateDTO.name(),
                patientCreateDTO.age(),
                patientCreateDTO.email(),
                authenticatedProfessional,
                patientCreateDTO.diagnosis()
        );

        patient = patientRepository.save(patient);
        return convertToDTO(patient);
    }

    @Transactional
    public PatientDTO updatePatient(UUID id, PatientUpdateDTO patientUpdateDTO) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new AppException("Paciente no encontrado o no pertenece al profesional.", "NOT_FOUND"));

        patient.updatePatient(
                patientUpdateDTO.name(),
                patientUpdateDTO.age(),
                patientUpdateDTO.email(),
                patientUpdateDTO.diagnosis()
        );

        patient = patientRepository.save(patient);
        return convertToDTO(patient);
    }


    @Transactional
    public void deletePatient(UUID id) {
        Patient patient = patientRepository.findById(id)
            .orElseThrow(() -> new AppException("Paciente no encontrado o no pertenece al profesional.", "NOT_FOUND"));
        patient.disablePatient();
    }


    private PatientDTO convertToDTO(Patient patient) {
        return new PatientDTO(
                patient.getIdPatient(),
                patient.getDni(),
                patient.getName(),
                patient.getEmail(),
                patient.getProfessional().getIdProfessional()
        );
    }

}