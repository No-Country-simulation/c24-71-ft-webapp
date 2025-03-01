package c24_71_ft_webapp.nexcognifix.domain.boardgame;

import c24_71_ft_webapp.nexcognifix.domain.boardgame.enums.GameCategory;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.enums.GameType;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.GameSession;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "board_games")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardGame {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_game", nullable = false, updatable = false)
    private UUID idGame;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "rules")
    private String rules;

    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "category", nullable = false, columnDefinition = "game_category")
    private GameCategory category;

    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "type", nullable = false, columnDefinition = "game_type")
    private GameType type;

    @Column(name = "status", nullable = false)
    private Boolean status = true;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "boardGame", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GameSession> gameSessions = new ArrayList<>();

}
