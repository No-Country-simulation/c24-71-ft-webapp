package c24_71_ft_webapp.nexcognifix.domain.gamesession;


import c24_71_ft_webapp.nexcognifix.domain.dashboard.dto.RecentResultsDTO;
import c24_71_ft_webapp.nexcognifix.domain.dashboard.dto.SessionPerDayDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionResultDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.security.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface GameSessionRepository extends JpaRepository<GameSession, UUID> {


    Page<GameSession> findAllByPatient_IdPatient(UUID patientId, Pageable pageable);


    @Query("SELECT g " +
            "FROM GameSession g " +
                "JOIN g.patient p " +
            "WHERE p.professional.idProfessional = :professionalId " +
            "ORDER BY g.createdAt DESC LIMIT 10")
    List<RecentResultsDTO> findLastTenResults(@Param("professionalId") UUID professionalId);

    @Query("""
        SELECT COUNT(gs)
        FROM GameSession gs 
            JOIN gs.patient p 
        WHERE gs.status = 'PENDING' 
        AND MONTH(gs.createdAt) = MONTH(CURRENT_DATE) 
        AND YEAR(gs.createdAt) = YEAR(CURRENT_DATE) 
        AND p.professional.idProfessional = :professionalId
        """)
    Integer countPendingSessionsThisMonth(@Param("professionalId") UUID professionalId);

    @Query("""
        SELECT COUNT(gs)
        FROM GameSession gs 
        JOIN gs.patient p 
        WHERE gs.status = 'COMPLETED' 
        AND MONTH(gs.createdAt) = MONTH(CURRENT_DATE) 
        AND YEAR(gs.createdAt) = YEAR(CURRENT_DATE) 
        AND p.professional.idProfessional = :professionalId 
        """)
    Integer countCompletedSessionsThisMonth(@Param("professionalId") UUID professionalId);

    @Query("""
        SELECT COUNT(gs) 
        FROM GameSession gs 
        JOIN gs.patient p 
        WHERE p.professional.idProfessional  = :professionalId AND (MONTH(gs.createdAt) = MONTH(CURRENT_DATE) 
        AND YEAR(gs.createdAt) = YEAR(CURRENT_DATE)) 
        """)
    Integer countCreatedSessionsThisMonth(@Param("professionalId") UUID professionalId);


    @Query(value = """
        SELECT
            TO_CHAR(g.created_at, 'YYYY/MM/DD') AS date,
            COUNT(g.id_session) AS count
        FROM game_sessions g
            INNER JOIN patients p
            ON g.patient_id = p.id_patient
        WHERE g.created_at::DATE BETWEEN :startDate AND :endDate AND p.professional_id = :professionalId
        GROUP BY date
        ORDER BY date ASC
    """, nativeQuery = true)
    List<Object[]> countSessionsPerDay(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("professionalId") UUID professionalId);


    @Query(value = """
        SELECT
            COUNT(*) AS totalPlayed,
            COUNT(CASE WHEN g.status = 'COMPLETED' THEN 1 END) AS completed,
            COUNT(CASE WHEN g.status = 'IN_PROGRESS' THEN 1 END) AS inProgress,
            COUNT(CASE WHEN g.status = 'CANCELED' THEN 1 END) AS canceled
        FROM game_sessions g
            INNER JOIN patients p
            ON g.patient_id = p.id_patient
        WHERE g.created_at >= DATE_TRUNC('month', CURRENT_DATE) AND p.professional_id = :professionalId
    """, nativeQuery = true)
    List<Object[]> countGamesPlayedThisMonth(@Param("professionalId") UUID professionalId);

    @Query(value = """
        SELECT
            COUNT(*) AS totalJuegos,
            COUNT(CASE WHEN g.status = 'PENDING' THEN 1 END) AS juegosPendientes,
            COUNT(CASE WHEN g.status = 'COMPLETED' THEN 1 END) AS juegosFinalizados
        FROM game_sessions g
            INNER JOIN patients p
            ON g.patient_id = p.id_patient
        WHERE p.professional_id = :professionalId
    """, nativeQuery = true)
    List<Object[]> getGameStatistics( @Param("professionalId") UUID professionalId);


}
