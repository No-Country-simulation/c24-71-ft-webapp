package c24_71_ft_webapp.nexcognifix.domain.gamesession;

import c24_71_ft_webapp.nexcognifix.domain.boardgame.BoardGame;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.BoardGameRepository;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.dto.BoardGameDTO;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.dto.BoardGameSummaryDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.*;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.enums.GameStatus;
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
    @Transactional(readOnly = true)
    public GameSessionDetailsDTO getGameSessionById(UUID sessionId) {
        GameSession session = findSessionById(sessionId);
        return toGameSessionDetailsDTO(session);
    }

    @Transactional
    public GameSessionDTO startGameSession(UUID sessionId) {
        GameSession session = findSessionById(sessionId);
        if (session.getStatus() != GameStatus.PENDING) {
            throw new AppException("La sesión ya no esta disponible.", "CONFLICT");
        }
        session.startSession();
        gameSessionRepository.save(session);
        return toGameSessionDTO(session);
    }

    @Transactional
    public GameSessionCancelDTO cancelGameSession(UUID sessionId, GameSessionCancelInputDTO observation) {
        GameSession session = findSessionById(sessionId);
        if (session.getStatus() == GameStatus.COMPLETED) {
            throw new AppException("No se puede cancelar una sesión completada.", "BAD_REQUEST");
        }
        var previousStatus = session.getStatus();
        session.cancelSession(observation.observation());
        gameSessionRepository.save(session);
        emailService.sendGameResultEmail(session);
        return new GameSessionCancelDTO(session.getIdSession(), session.getPatient().getName(),session.getBoardGame().getName(), previousStatus, session.getStatus(), observation.observation());
    }

    @Transactional
    public GameSessionResultDTO submitGameResults(UUID sessionId, GameSessionResultInputDTO resultDTO) {
        GameSession session = findSessionById(sessionId);
        if (session.getStatus() != GameStatus.IN_PROGRESS) {
            throw new AppException("La sesión de juego no está en progreso.", "CONFLICT");
        }
        session.completeSession();
        session.setAttemptsMade(resultDTO.attemptsMade());
        session.setTimePlayed(resultDTO.timePlayed());
        gameSessionRepository.save(session);
        emailService.sendGameResultEmail(session);
        return new GameSessionResultDTO(sessionId, session.getPatient().getName(), session.getBoardGame().getName(), session.getEstimatedAttempts(), session.getGameChips(), session.getEstimatedTime(), session.getStatus(), session.getAttemptsMade(), session.getTimePlayed());
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

    private GameSessionDetailsDTO toGameSessionDetailsDTO(GameSession gameSession) {
        var boardGame = gameSession.getBoardGame();

        var game = new BoardGameSummaryDTO(
                boardGame.getIdGame(),
                boardGame.getName(),
                boardGame.getDescription(),
                boardGame.getRules(),
                boardGame.getCategory(),
                boardGame.getType()
        );

        return new GameSessionDetailsDTO(
                gameSession.getIdSession(),
                gameSession.getPatient().getName(),
                game,
                gameSession.getEstimatedAttempts(),
                gameSession.getGameChips(),
                gameSession.getEstimatedTime(),
                gameSession.getStatus()
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
