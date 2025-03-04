package c24_71_ft_webapp.nexcognifix.domain.gamesession;

import c24_71_ft_webapp.nexcognifix.domain.dashboard.dto.RecentResultsDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionResultDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface GameSessionRepository extends JpaRepository<GameSession, UUID> {

    @Query("SELECT g FROM GameSession g ORDER BY createdAt DESC LIMIT 10")
    List<RecentResultsDTO> findLastTenResults();
}
