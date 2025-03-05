package c24_71_ft_webapp.nexcognifix.domain.dashboard.dto;

public record StatisticsDTO(
        Integer pendingSessionsThisMonth,
        Integer completedSessionsThisMonth,
        Integer createdSessionsThisMonth,
        Integer activePatientsThisMonth
){
}