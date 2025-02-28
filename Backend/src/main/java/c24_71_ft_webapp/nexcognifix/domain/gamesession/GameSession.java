package c24_71_ft_webapp.nexcognifix.domain.gamesession;

import c24_71_ft_webapp.nexcognifix.domain.boardgame.BoardGame;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.enums.GameStatus;
import c24_71_ft_webapp.nexcognifix.domain.patient.Patient;
import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;


import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "game_sessions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_session", nullable = false, updatable = false)
    private UUID idSession;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id", nullable = false)
    private BoardGame boardGame;

    @Column(name = "estimated_attempts", nullable = false)
    private Integer estimatedAttempts;

    @Column(name = "game_chips", nullable = false)
    private Integer gameChips;

    @Column(name = "estimated_time", nullable = false)
    private Integer estimatedTime;

    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "status", nullable = false, columnDefinition = "game_status")
    private GameStatus status = GameStatus.PENDING;

    @Column(name = "attempts_made")
    private Integer attemptsMade = 0;

    @Column(name = "time_played")
    private Integer timePlayed = 0;

    @Column(name = "observation")
    private String observation;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    public GameSession(Patient patient, BoardGame boardGame, Integer estimatedAttempts, Integer gameChips, Integer estimatedTime) {
        this.patient = patient;
        this.boardGame = boardGame;
        this.estimatedAttempts = estimatedAttempts;
        this.gameChips = gameChips;
        this.estimatedTime = estimatedTime;
    }

    // Verifica que la sesión de juego esté en estado PENDING.
    public void validateIsPending() {
        if (this.status != GameStatus.PENDING) {
            throw new AppException("La sesión de juego ya no está activa. No se pueden realizar más acciones.", "CONFLICT");
        }
    }


    // Inicia la sesión de juego, estableciendo el estado en IN_PROGRESS.
    public void startSession() {
        if (this.status != GameStatus.PENDING) {
            throw new AppException("No puedes iniciar una sesión de juego que ya ha comenzado.", "CONFLICT");
        }
        this.status = GameStatus.IN_PROGRESS;
        this.startedAt = LocalDateTime.now();
    }

    // Completa la sesión de juego, estableciendo el estado en COMPLETED.
    public void completeSession() {
        if (this.status != GameStatus.IN_PROGRESS) {
            throw new AppException("No puedes completar una sesión que no está en progreso.", "CONFLICT");
        }
        this.status = GameStatus.COMPLETED;
        this.completedAt = LocalDateTime.now();
    }

    // Cancela la sesión de juego, estableciendo el estado en CANCELED.
    public void cancelSession() {
        if (this.status == GameStatus.COMPLETED) {
            throw new AppException("No puedes cancelar una sesión que ya ha finalizado.", "BAD_REQUEST");
        }
        this.status = GameStatus.CANCELED;
    }

    @PrePersist
    private void prePersist() {
        if (this.gameChips % 2 != 0) {
            throw new AppException("Las fichas de juego deben ser un número par.", "BAD_REQUEST");
        }
    }

}
