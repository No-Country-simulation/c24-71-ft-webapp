-- Tabla de juegos de mesa
CREATE TABLE board_games (
    id_game UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    rules TEXT,
    category game_category NOT NULL,
    type game_type NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
