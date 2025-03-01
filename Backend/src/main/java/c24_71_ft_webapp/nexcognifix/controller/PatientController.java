package c24_71_ft_webapp.nexcognifix.controller;

import c24_71_ft_webapp.nexcognifix.domain.patient.PatientService;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientCreateDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientDetailDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.dto.PatientUpdateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
@Tag(name = "Gestión Pacientes", description = "Endpoints para generar Listado de pacientes con filtros, Crear Pacientes, Editarlos, ver detalles de paciente y desactivar pacientes, unicamente del profesional asignado")
@SecurityRequirement(name = "Bearer Authentication")
public class PatientController {

    @Autowired
    PatientService patientService;


    @GetMapping
    @Operation(summary = "Obtener lista de Pacientes", description = "Devuelve una lista de pacientes paginadas y filtrada por DNI o Nombre.")
    public ResponseEntity<Page<PatientDTO>> getPatients(
            @RequestParam(required = false) String dni,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
            // @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Sort sort = sortDirection.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() :
                Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<PatientDTO> patients = patientService.getAllPatients(dni, name, pageable);
        return ResponseEntity.ok(patients);
    }


    @GetMapping("/{id}")
    @Operation(summary = "Obtener Pacientes por ID ", description = "Devuelve el detalle del paciente por el Id")
    public ResponseEntity<PatientDetailDTO> getPatientById(@PathVariable UUID id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @PostMapping
    @Operation(summary = "Crear Pacientes", description = "Entpoint para crear pacientes")
    public ResponseEntity<PatientDTO> createPatient(@Valid @RequestBody PatientCreateDTO patientCreateDTO) {
        return ResponseEntity.ok(patientService.createPatient(patientCreateDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar Pacientes", description = "Entpoint para editar pacientes")
    public ResponseEntity<PatientDTO> updatePatient(
            @PathVariable UUID id,
            @Valid @RequestBody PatientUpdateDTO patientUpdateDTO) {

        return ResponseEntity.ok(patientService.updatePatient(id, patientUpdateDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Desactivar Pacientes", description = "Entpoint para Delete pacientes")
    public ResponseEntity<Void> deletePatient(@PathVariable UUID id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}
