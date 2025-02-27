package c24_71_ft_webapp.nexcognifix.domain.patient;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface PatientRepository  extends JpaRepository<Patient, UUID> {
    Optional<Patient> findByDni(Long dni);
    Optional<Patient> findByEmail(String email);


    // Filtrar solo pacientes activos con paginación
    Page<Patient> findAllByStatusTrue(Pageable pageable);

    // Filtrar por DNI y status activo
    Page<Patient> findByDniAndStatusTrue(Long dni, Pageable pageable);

    // Filtrar por nombre (búsqueda parcial) y status activo
    Page<Patient> findByNameContainingIgnoreCaseAndStatusTrue(String name, Pageable pageable);

    Optional<Patient> findByIdPatientAndStatusTrue(UUID idPatient);
}
