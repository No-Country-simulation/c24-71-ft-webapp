package c24_71_ft_webapp.nexcognifix.domain.dashboard;

import c24_71_ft_webapp.nexcognifix.domain.dashboard.dto.*;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.GameSessionRepository;
import c24_71_ft_webapp.nexcognifix.domain.patient.PatientRepository;
import c24_71_ft_webapp.nexcognifix.domain.professional.Professional;
import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import c24_71_ft_webapp.nexcognifix.infrastructure.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final GameSessionRepository gameSessionRepository;
    private final PatientRepository patientRepository;
    private final AuthService authService;

    public List<RecentResultsDTO> recentResults(){
        try {
            // Obtener el profesional authenticado
            Professional professional = authService.getAuthenticatedUser();
            return gameSessionRepository.findLastTenResults(professional.getIdProfessional());
        } catch (RuntimeException e) {
            throw new AppException("Servicio no disponible.", "INTERNAL_SERVER_ERROR");
        }
    }

    public StatisticsDTO getMonthlyStatistics() {
        try {

            // Obtener el profesional authenticado
            Professional professional = authService.getAuthenticatedUser();

            Integer pendingSessions = gameSessionRepository.countPendingSessionsThisMonth(professional.getIdProfessional());
            Integer completedSessions = gameSessionRepository.countCompletedSessionsThisMonth(professional.getIdProfessional());
            Integer createdSessions = gameSessionRepository.countCreatedSessionsThisMonth(professional.getIdProfessional());
            Integer activePatients = patientRepository.countActivePatientsThisMonth(professional.getIdProfessional());
            return new StatisticsDTO(pendingSessions, completedSessions, createdSessions, activePatients);
        } catch (RuntimeException e) {
            throw new AppException("Servicio no disponible.", "INTERNAL_SERVER_ERROR");
        }
    }

    public List<SessionPerDayDTO> getSessionsPerDay(LocalDate startDate, LocalDate endDate) {

        // Obtener el profesional authenticado
        Professional professional = authService.getAuthenticatedUser();

//        Obtener Estadistico de total de juegos jugados agrupado por dias
        List<Object[]> results = gameSessionRepository.countSessionsPerDay(startDate, endDate, professional.getIdProfessional());

        return results.stream()
                .map(obj -> new SessionPerDayDTO(
                        (String) obj[0],
                        ((Number) obj[1]).longValue()
                ))
                .toList();
    }


    public GamesPlayedSummaryDTO getGamesPlayedThisMonth() {

        // Obtener el profesional authenticado
        Professional professional = authService.getAuthenticatedUser();

        //Obtener Estadisticos de Juegos jugados en el Mes segun el estado
        List<Object[]> results = gameSessionRepository.countGamesPlayedThisMonth(professional.getIdProfessional());

        if (results.isEmpty()) {
            return new GamesPlayedSummaryDTO(0L, 0L, 0L, 0L);
        }

        Object[] result = results.get(0); // Obtener la primera fila del resultado

        return new GamesPlayedSummaryDTO(
                ((Number) result[0]).longValue(), // totalPlayed
                ((Number) result[1]).longValue(), // completed
                ((Number) result[2]).longValue(), // inProgress
                ((Number) result[3]).longValue()  // canceled
        );
    }

    public List<DashboardStatisticsDTO>  getDashboardStatistics() {

        // Obtener el profesional authenticado
        Professional professional = authService.getAuthenticatedUser();

        // Obtener estadísticas de juegos
        List<Object[]> gameStatsResult = gameSessionRepository.getGameStatistics(professional.getIdProfessional());

        Object[] gameStats = gameStatsResult.isEmpty() ? new Object[]{0L, 0L, 0L} : gameStatsResult.get(0);

        Long totalGames = ((Number) gameStats[0]).longValue();
        Long gamesPending = ((Number) gameStats[1]).longValue();
        Long gamesFinished = ((Number) gameStats[2]).longValue();

        Long totalMonthlyGames = Long.valueOf(gameSessionRepository.countCreatedSessionsThisMonth(professional.getIdProfessional()));

        // Obtener pacientes activos este mes

        Long totalMonthlyPatient = Long.valueOf(patientRepository.countActivePatientsThisMonth(professional.getIdProfessional()));
        Long totalPatient = (patientRepository.countActivePatients(professional.getIdProfessional()));

        // Construir lista de estadísticas

        return List.of(
                new DashboardStatisticsDTO("Juegos Pendientes", gamesPending, totalGames),
                new DashboardStatisticsDTO("Juegos Finalizados", gamesFinished, totalGames),
                new DashboardStatisticsDTO("Juegos Creados este Mes", totalMonthlyGames, totalGames),
                new DashboardStatisticsDTO("Pacientes Activos este mes", totalMonthlyPatient, totalPatient)
        );
    }

}
