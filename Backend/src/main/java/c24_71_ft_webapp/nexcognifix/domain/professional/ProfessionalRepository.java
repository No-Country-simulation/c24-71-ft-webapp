package c24_71_ft_webapp.nexcognifix.domain.professional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfessionalRepository extends JpaRepository<Professional, UUID> {

//    @Query("SELECT p FROM Professional p WHERE p.email = :email")
    Professional findByEmail(String subject);

}
