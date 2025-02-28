package c24_71_ft_webapp.nexcognifix.domain.gamesession;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GameSessionRepository extends JpaRepository<GameSession, UUID> {
}
