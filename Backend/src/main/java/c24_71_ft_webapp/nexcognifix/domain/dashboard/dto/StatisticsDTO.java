package c24_71_ft_webapp.nexcognifix.domain.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StatisticsDTO {
    private Integer pendingSessionsThisMonth;
    private Integer completedSessionsThisMonth;
    private Integer createdSessionsThisMonth;
    private Integer activePatientsThisMonth;
}