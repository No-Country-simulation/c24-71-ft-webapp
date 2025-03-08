import { useState, useMemo, useEffect } from "react";
import useGameTimer from "../../hooks/useGameTimer";
import api from "../../api/axiosConfig";
import GameStatusPanel from "./GameStatusPanel";
import GameCard from "./GameCard";
import GameResults from "./GameResults";
import iconCards from "./IconCards";


function GameMechanics({ numberOfPairs, sessionId, isColorBlindMode }) {

    // Temporizador regresivo inicial de 5 segundos antes de iniciar el juego
    const countdownTimer = useGameTimer(5); 
    // Cronómetro que mide el tiempo del jugador una vez que empieza
    const gameTimer = useGameTimer(); 
    
    // Selecciona aleatoriamente un número de pares de emojis y los duplica para formar las parejas
    const selectedEmojis = useMemo(() => {
        const shuffled = [...iconCards].sort(() => Math.random() - 0.5).slice(0, numberOfPairs);
        return [...shuffled, ...shuffled].sort(() => Math.random() - 0.5);
    }, [numberOfPairs]);

    // Estados del juego
    const [selected, setSelected] = useState([]); // Índices de las cartas seleccionadas actualmente
    const [matched, setMatched] = useState([]); // Índices de las cartas encontradas correctamente
    const [incorrect, setIncorrect] = useState([]); // Índices de cartas incorrectas temporales
    const [attempts, setAttempts] = useState(0); // Contador de intentos
    const [showAll, setShowAll] = useState(false); // Estado inicial para mostrar todas las cartas
    const [gameFinished, setGameFinished] = useState(false); // Indica si el juego ha finalizado
    const [isSubmitting, setIsSubmitting] = useState(false); // Indica si los datos se están enviando al servidor
    const [submissionError, setSubmissionError] = useState(null); // Estado para almacenar errores al enviar los datos


    // Muestra todas las cartas al inicio y las oculta después de 5 segundos
    useEffect(() => {
        // Mostrar todas las cartas después de 0.6 segundo
        const showTimer = setTimeout(() => {setShowAll(true); countdownTimer.start(); }, 600);
    
        // Ocultar las cartas después de 6 segundos en total (1s de espera + 5s de visibilidad)
        const hideTimer = setTimeout(() => { setShowAll(false); gameTimer.start(); countdownTimer.pause(); }, 5600);
    
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    // Define el ancho del contenedor de fichas basado en la cantidad de fichas seleccionados
    const containerCardsWidth  = useMemo(() => {
        const totalCards = numberOfPairs * 2;
        if (totalCards <= 12) return "w-[60%]"; 
        if (totalCards <= 18) return "w-[90%]"; 
        if (totalCards <= 24) return "w-[80%]"; 
        if (totalCards <= 38) return "w-[90%]"; 
        return "w-[100%]"; 
    }, [numberOfPairs]);


     // Función para enviar los datos del juego a la API
     const sendGameData = async () => {

        setIsSubmitting(true);
        const gameData = {
            attemptsMade: attempts,
            timePlayed: gameTimer.time,
        };

        try {
            await api.post(`/game-sessions/patient/join/${sessionId}/results`, gameData);
            setGameFinished(true);
        } catch (error) {
            setSubmissionError("No se pudo enviar los resultados. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };



    // Detecta cuando todas las parejas han sido encontradas y finaliza el juego
    useEffect(() => {
        if (matched.length === selectedEmojis.length) {
            gameTimer.pause();
    
            setTimeout(() => {
                sendGameData();
            }, 600);
        }
    }, [matched]);

    // Maneja la selección de cartas
    const handleSelect = (index) => {
        // Evita seleccionar más de dos cartas o cartas ya encontradas
        if (selected.length === 2 || selected.includes(index) || matched.includes(index) || showAll || !gameTimer.running) return;

        // Agrega la carta seleccionada al estado
        const newSelected = [...selected, index];
        setSelected(newSelected);

        // Si hay dos cartas seleccionadas, verifica si coinciden
        if (newSelected.length === 2) {
            setAttempts((prev) => prev + 1);
            const [first, second] = newSelected;
            
            if (selectedEmojis[first] === selectedEmojis[second]) {
                // Si coinciden, las marca como encontradas
                setTimeout(() => {
                    setMatched((prev) => [...prev, first, second]);
                }, 200);
            } else {
                // Si no coinciden, las marca como incorrectas temporalmente
                setTimeout(() => setIncorrect([first, second]), 200);
            }

            // Reinicia la selección después de un breve tiempo
            setTimeout(() => {
                setSelected([]);
                setIncorrect([]);
            }, 800);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            {!gameFinished && (
                <>
                    {/* Panel de información */}
                    <GameStatusPanel
                        attempts={attempts}
                        countdownTimer={countdownTimer}
                        gameTimer={gameTimer}
                        matched={matched}
                        totalCards={selectedEmojis.length}
                        isColorBlindMode={isColorBlindMode}
                    />

                    {/* Tablero de juego */}
                    <div className={`flex flex-wrap  justify-center ${containerCardsWidth}`} >
                    {selectedEmojis.map((emoji, index) => (
                        <GameCard
                            key={index}
                            index={index}
                            emoji={emoji}
                            isSelected={selected.includes(index)}
                            isMatched={matched.includes(index)}
                            isIncorrect={incorrect.includes(index)}
                            showAll={showAll}
                            onSelect={handleSelect}
                            numberOfPairs={numberOfPairs}
                            isColorBlindMode={isColorBlindMode}
                        />
                    ))}
                    </div>
                </>
            )}
            
            {/* Mensaje de carga mientras se envían los resultados */}
            {isSubmitting && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                    <div className={`text-center p-6 rounded-2xl shadow-lg ${isColorBlindMode ? 'bg-blind-secondary text-blind-primary' : 'bg-white text-gray-800'}`}>
                        <div className={`w-16 h-16 border-4 border-dashed rounded-full animate-spin mx-auto ${isColorBlindMode ? 'border-blind-primary' : 'border-[#3E4B6A]'}`}></div>
                        <p className="mt-4 text-lg font-semibold">Enviando resultados...</p>
                    </div>
                </div>
            )}

            {/* Muestra un mensaje de error si el envío de resultados falla */}
            {submissionError && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                    <div className={` shadow-lg rounded-lg p-6 max-w-lg w-full text-center border-3 ${isColorBlindMode ? 'bg-blind-secondary border-blind-border' : 'bg-white border-red-400'}`}>
                        <p className={` text-lg font-semibold ${isColorBlindMode ? 'text-blind-primary' : 'text-red-600'}`}>{submissionError}</p>
                        <button 
                            className={`mt-4  px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer shadow-md  transition ${isColorBlindMode ? 'bg-blind-accent text-blind-text hover:bg-blind-hover' : 'bg-red-500 text-white hover:bg-red-600'}`}
                            onClick={() =>{ setSubmissionError(null); sendGameData();}}
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            )}

            {/* Pantalla de resultados cuando el juego ha finalizado */}
            {gameFinished && (
                <GameResults
                    attempts={attempts}
                    time={gameTimer.time}
                    isSubmitting={isSubmitting}
                    isColorBlindMode={isColorBlindMode}
                />
            )}
        </div>
    );
}

export default GameMechanics;
