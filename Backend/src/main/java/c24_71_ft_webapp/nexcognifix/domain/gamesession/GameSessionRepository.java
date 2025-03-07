package c24_71_ft_webapp.nexcognifix.domain.gamesession;


import c24_71_ft_webapp.nexcognifix.domain.dashboard.dto.RecentResultsDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionResultDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface GameSessionRepository extends JpaRepository<GameSession, UUID> {


    @Query("SELECT g FROM GameSession g ORDER BY createdAt DESC LIMIT 10")
    List<RecentResultsDTO> findLastTenResults();

    @Query("""
        SELECT COUNT(gs) 
        FROM GameSession gs 
        WHERE gs.status = 'PENDING' 
        AND MONTH(gs.createdAt) = MONTH(CURRENT_DATE) 
        AND YEAR(gs.createdAt) = YEAR(CURRENT_DATE)
        """)
    Integer countPendingSessionsThisMonth();

    @Query("""
        SELECT COUNT(gs) 
        FROM GameSession gs 
        WHERE gs.status = 'COMPLETED' 
        AND MONTH(gs.createdAt) = MONTH(CURRENT_DATE) 
        AND YEAR(gs.createdAt) = YEAR(CURRENT_DATE)
        """)
    Integer countCompletedSessionsThisMonth();

    @Query("""
        SELECT COUNT(gs) 
        FROM GameSession gs 
        WHERE MONTH(gs.createdAt) = MONTH(CURRENT_DATE) 
        AND YEAR(gs.createdAt) = YEAR(CURRENT_DATE)
        """)
    Integer countCreatedSessionsThisMonth();


    Page<GameSession> findAllByPatient_IdPatient(UUID patientId, Pageable pageable);

}
