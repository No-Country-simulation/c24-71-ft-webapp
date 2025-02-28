package c24_71_ft_webapp.nexcognifix.domain.gamesession;

import c24_71_ft_webapp.nexcognifix.domain.boardgame.BoardGame;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.BoardGameRepository;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionRequestDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.Patient;
import c24_71_ft_webapp.nexcognifix.domain.patient.PatientRepository;
import c24_71_ft_webapp.nexcognifix.domain.professional.Professional;
import c24_71_ft_webapp.nexcognifix.infrastructure.email.EmailService;
import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GameSessionService {

    private final BoardGameRepository boardGameRepository;
    private final GameSessionRepository gameSessionRepository;
    private final PatientRepository patientRepository;
    private final EmailService emailService;

    @Transactional
    public GameSessionDTO createGameSession(GameSessionRequestDTO data) {

        Professional professional = getAuthenticatedUser();
        Patient patient = findPatientById(data.patientId());
        BoardGame game = findGameById(data.gameId());
        validatePatientBelongsToProfessional(patient, professional);

        GameSession gameSession =  gameSessionRepository.save(
                new GameSession(patient, game, data.estimated_attempts(), data.game_chips(), data.estimated_time())
        );

        emailService.sendGameSessionEmail(gameSession);
        return toGameSessionDTO(gameSession);
    }

    @Transactional
    public GameSessionDTO resendGameSessionEmail(UUID sessionId) {
        Professional professional = getAuthenticatedUser();
        GameSession gameSession = findSessionById(sessionId);
        validatePatientBelongsToProfessional(gameSession.getPatient(), professional);
        gameSession.validateIsPending();
        emailService.sendGameSessionEmail(gameSession);
        return toGameSessionDTO(gameSession);
    }

    private Patient findPatientById(UUID patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new AppException("El paciente no fue encontrado.", "NOT_FOUND"));
    }

    private BoardGame findGameById(UUID gameId) {
        return boardGameRepository.findById(gameId)
                .orElseThrow(() -> new AppException("El juego de mesa no fue encontrado.", "NOT_FOUND"));
    }

    private GameSession findSessionById(UUID sessionId) {
        return gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new AppException("La sesión de juego no fue encontrada.",  "NOT_FOUND"));
    }

    private void validatePatientBelongsToProfessional(Patient patient, Professional professional) {
        if (!patient.getProfessional().getIdProfessional().equals(professional.getIdProfessional())) {
            throw new AppException("El paciente no pertenece al profesional autenticado.", "FORBIDDEN");
        }
    }

    private GameSessionDTO toGameSessionDTO(GameSession gameSession) {

        return new GameSessionDTO(
                gameSession.getIdSession(),
                gameSession.getPatient().getName(),
                gameSession.getBoardGame().getName(),
                gameSession.getEstimatedAttempts(),
                gameSession.getGameChips(),
                gameSession.getEstimatedTime(),
                gameSession.getStatus(),
                gameSession.getAttemptsMade(),
                gameSession.getTimePlayed()
        );
    }

    // TODO: Esta función debería trasladarse a un servicio común o helper,
    // ya que se usa en diferentes servicios. Se encuentra aquí provisionalmente.
    public Professional getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof Professional) {
            return (Professional) authentication.getPrincipal();
        }

        throw new AppException("El usuario autenticado no es válido.", "FORBIDDEN");
    }

}
