ALTER TABLE board_games ADD COLUMN image_url TEXT;

UPDATE board_games
	SET image_url = 'https://img.freepik.com/vector-gratis/tarjetas-juego-memoria-acuarela_23-2150149082.jpg?t=st=1741012500~exp=1741016100~hmac=e2443cd59d7297ce37a571d1f353ad54c8c4d0544e989e55a9365c6d10030d5b&w=900'
	WHERE id_game = '0e25e4d3-8ccf-4b8d-986e-6b7caebdf032';

UPDATE board_games
    SET image_url = 'https://previews.123rf.com/images/corbendallas/corbendallas1812/corbendallas181200106/127216648-9-piezas-de-rompecabezas-de-colores-jigsaw-rompecabezas-de-ilustraci%C3%B3n-vectorial-para-dise%C3%B1o-web.jpg'
    WHERE id_game = '52a63f3f-39a0-460e-92cb-2f43d584de61';

UPDATE board_games
    SET image_url = 'https://phantom-telva.unidadeditorial.es/143ecf09966a7d87c251d4507e6535a5/resize/656/f/webp/assets/multimedia/imagenes/2021/08/12/16287613194864.jpg'
    WHERE id_game = '6e09c7a5-881c-4e78-a6b7-3782bdc91899';
