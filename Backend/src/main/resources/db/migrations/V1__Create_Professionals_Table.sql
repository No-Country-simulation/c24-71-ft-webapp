-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear ENUM para categorías de juegos
CREATE TYPE game_category AS ENUM ('ATTENTION TRAINING', 'COGNITIVE ENHANCEMENT', 'MEMORY IMPROVEMENT', 'PROCESSING SPEED', 'LANGUAGE & COMMUNICATION', 'SOCIAL SKILLS TRAINING', 'LOGICAL REASONING', 'MOTOR COORDINATION','CREATIVITY & IMAGINATION');
CREATE TYPE game_type AS ENUM ('MATCHING GAME', 'TRIVIA GAME', 'WORD GAME', 'DEDUCTION GAME', 'LOGIC PUZZLE', 'MEMORY GAME', 'QUICK THINKING', 'QUIZ GAME', 'STORYTELLING GAME');
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


INSERT INTO professionals ( name, email, password, profession)
VALUES (
    'Dr. Juan Pérez',
    'juan.perez@example.com',
    '$2a$10$KIX/H0bG8/NZkYpB5e6DOOSqfbbO8q/6XJtyuBfgUEfZ7D1G8Tz3C', -- Contraseña encriptada con Bcrypt: "MiContraseñaSegura"
    'Neuropsicólogo'
);