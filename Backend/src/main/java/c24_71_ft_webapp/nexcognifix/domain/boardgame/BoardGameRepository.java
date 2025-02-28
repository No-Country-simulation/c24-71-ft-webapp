package c24_71_ft_webapp.nexcognifix.domain.boardgame;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BoardGameRepository extends JpaRepository<BoardGame, UUID> {
}
