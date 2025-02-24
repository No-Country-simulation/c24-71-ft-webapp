-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear ENUM para categorías de juegos
CREATE TYPE game_category AS ENUM ('ATTENTION_TRAINING', 'COGNITIVE_ENHANCEMENT', 'MEMORY_IMPROVEMENT', 'PROCESSING_SPEED', 'LANGUAGE_COMMUNICATION', 'SOCIAL_SKILLS_TRAINING', 'LOGICAL_REASONING', 'MOTOR_COORDINATION','CREATIVITY_IMAGINATION');
CREATE TYPE game_type AS ENUM ('MATCHING_GAME', 'TRIVIA_GAME', 'WORD_GAME', 'DEDUCTION_GAME', 'LOGIC_PUZZLE', 'MEMORY_GAME', 'QUICK_THINKING', 'QUIZ_GAME', 'STORYTELLING_GAME');
CREATE TYPE game_status AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- Tabla de profesionales
CREATE TABLE professionals (
    id_professional UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profession VARCHAR(100),
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO professionals (id_professional, name, email, password, profession)
VALUES (
    'bc795de7-176e-4fd9-a535-54477cdc5c06',
    'Dr. Juan Pérez',
    'juan.perez@example.com',
    '$2a$10$KIX/H0bG8/NZkYpB5e6DOOSqfbbO8q/6XJtyuBfgUEfZ7D1G8Tz3C', -- Contraseña encriptada con Bcrypt: "MiContraseñaSegura"
    'Neuropsicólogo'
);