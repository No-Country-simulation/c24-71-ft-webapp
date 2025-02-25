INSERT INTO board_games (id_game, name, description, rules, category, type, status, created_at)
VALUES (
    '6e09c7a5-881c-4e78-a6b7-3782bdc91899',
    'Camino de Precisión',
    'Un juego interactivo donde el jugador debe guiar un objeto a través de un camino sinuoso sin tocar los bordes, mejorando la coordinación mano-ojo y la motricidad fina.',
    '1. El jugador controla un punto o una pelota en la pantalla con el mouse o el dedo (en dispositivos táctiles).
     2. Debe moverse lentamente a lo largo de un camino estrecho sin salirse de los límites.
     3. Si toca los bordes del camino, debe reiniciar desde el último punto de control.
     4. A medida que avanza, el camino se vuelve más angosto y con más obstáculos.
     5. El tiempo de reacción y la precisión son clave para completar el nivel.',
    'MOTOR_COORDINATION',
    'DEDUCTION_GAME',
    TRUE,
    CURRENT_TIMESTAMP
);



INSERT INTO board_games(id_game, name, description, rules, category, type, status, created_at)
	VALUES (
	'0e25e4d3-8ccf-4b8d-986e-6b7caebdf032',
	'Juego emparejamiento de fichas',
	'Un juego diseñado para mejorar la memoria y la atención, donde los jugadores deben encontrar pares de fichas iguales.',
	'1. Se muestran todas las fichas boca abajo. 2. Los jugadores deben voltear dos fichas por turno. 3. Si las fichas coinciden, se retiran del tablero. 4. Si no coinciden, se vuelven a colocar boca abajo. 5. El juego continúa hasta que todas las fichas sean emparejadas.',
	 'MEMORY_IMPROVEMENT',
	 'MATCHING_GAME',
	 TRUE,
     CURRENT_TIMESTAMP
);

INSERT INTO board_games(id_game, name, description, rules, category, type, status, created_at)
VALUES (
    '52a63f3f-39a0-460e-92cb-2f43d584de61',
    'Encuentra la Diferencia',
    'Un juego diseñado para mejorar la capacidad de atención y observación, en el cual los jugadores deben encontrar diferencias entre dos imágenes similares.',
    '1. Se presentan dos imágenes similares con pequeñas diferencias.
     2. El jugador debe identificar todas las diferencias antes de que acabe el tiempo.
     3. Si encuentra todas las diferencias correctamente, gana puntos.
     4. Si el tiempo se agota sin encontrar todas, puede volver a intentarlo.',
    'ATTENTION_TRAINING',
    'DEDUCTION_GAME',
    TRUE,
    CURRENT_TIMESTAMP
);