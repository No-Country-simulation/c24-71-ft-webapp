package c24_71_ft_webapp.nexcognifix.domain.dashboard;

import c24_71_ft_webapp.nexcognifix.domain.dashboard.dto.RecentResultsDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.GameSessionRepository;
import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    public List<RecentResultsDTO> recentResults(){
        try {
            List<RecentResultsDTO> recentResults = gameSessionRepository.findLastTenResults();
            return recentResults;
        } catch (RuntimeException e) {
            throw new AppException("Servicio no disponible.", "INTERNAL_SERVER_ERROR");
        }
    }

}
