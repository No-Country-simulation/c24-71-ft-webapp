package c24_71_ft_webapp.nexcognifix.domain.patient;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface PatientRepository  extends JpaRepository<Patient, UUID> {

    // Validar si existe el DNI y este activo
    boolean existsByDni(Long dni);

    // Validar si existe el Email y este activo
    boolean existsByEmail(String email);

    // Filtrar solo pacientes activos con paginación y relacionados a un profesional
    Page<Patient> findAllByProfessional_IdProfessionalAndStatusTrue(UUID professionalId, Pageable pageable);

    // Filtrar por Id de paciente relacionado a un profesional
    Optional<Patient> findByIdPatientAndProfessional_IdProfessionalAndStatusTrue(UUID idPatient , UUID professionalId);


    // Filtrar por DNI y status activo relacionados a un profesional
    @Query("SELECT p FROM Patient p WHERE p.dni = :dni AND p.professional.idProfessional = :professionalId AND p.status = TRUE")
    Page<Patient> findByDniAndProfessional(@Param("dni") Long dni, @Param("professionalId") UUID professionalId, Pageable pageable);

    // Filtrar por nombre (búsqueda parcial) y status activo relacionados a un profesional
    @Query("SELECT p FROM Patient p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) AND p.professional.idProfessional = :professionalId AND p.status = TRUE")
    Page<Patient> findByNameContaining(@Param("name") String name, @Param("professionalId") UUID professionalId, Pageable pageable);

    @Query("""
        SELECT COUNT(p) 
        FROM Patient p 
        WHERE p.status = true
        AND MONTH(p.createdAt) = MONTH(CURRENT_DATE) 
        AND YEAR(p.createdAt) = YEAR(CURRENT_DATE)
        """)
    Integer countActivePatientsThisMonth();
}
