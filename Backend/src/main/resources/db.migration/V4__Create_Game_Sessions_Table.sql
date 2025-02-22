CREATE TABLE game_sessions
(
    id_session UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL,
    game_id UUID NOT NULL,
    estimated_attempts INTEGER NOT NULL CHECK (estimated_attempts >= 0),
    game_chips INTEGER NOT NULL CHECK (game_chips >= 0),
    estimated_time INTEGER NOT NULL CHECK (estimated_time >= 0), -- En segundos
    status game_status DEFAULT 'PENDING',
    attempts_made INTEGER DEFAULT 0 CHECK (attempts_made >= 0),
    time_played INTEGER DEFAULT 0 CHECK (time_played >= 0), -- En segundos
    started_at TIMESTAMP DEFAULT NULL,
    completed_at TIMESTAMP DEFAULT NULL,
    observation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,


    -- Relación con board_games (uno a muchos)
    CONSTRAINT fk_game_sessions_board_games FOREIGN KEY (game_id)
        REFERENCES board_games (id_game) ON DELETE CASCADE,

    -- Relación con patients (uno a muchos)
    CONSTRAINT fk_game_sessions_patients FOREIGN KEY (patient_id)
        REFERENCES patients (id_patient) ON DELETE CASCADE
)