package c24_71_ft_webapp.nexcognifix.domain.gamesession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GameSessionRepository extends JpaRepository<GameSession, UUID> {


    Page<GameSession> findAllByPatient_IdPatient(UUID patientId, Pageable pageable);


}
