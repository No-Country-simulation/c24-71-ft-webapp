import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axiosConfig";
import GameMechanics from "../../component/GameSessionJoin/GameMechanics";

function GameSessionJoin() {

    const { sessionData, loading, error, sessionId } = useOutletContext();
  
    const [gameStarted, setGameStarted] = useState(false);
    const [startError, setStartError] = useState(null);
    const [starting, setStarting] = useState(false);


    const startGame = async () => {
        setStarting(true);
        setStartError(null);
        try {
            await api.patch(`/game-sessions/patient/join/${sessionId}/start`);
            setGameStarted(true);
        } catch (err) {
            setStartError(err.response?.data?.error || "No se pudo iniciar la partida.");
        } finally {
            setStarting(false);
        }
    };

    // Muestra un indicador de carga si los datos aún están siendo obtenidos
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#4E5C82] border-dashed rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-lg font-semibold">Cargando...</p>
                </div>
            </div>
        );
    }

    // Muestra un mensaje de error si ocurrió un problema al obtener los datos de la sesión de juego
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center border-3 border-red-400">
                    <p className="text-2xl font-bold text-red-600">¡Error!</p>
                    <p className="mt-2 text-gray-600">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer shadow-md hover:bg-red-600 transition"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    // Verifica el estado de la sesión si ya está finalizada o  cancelada
    if (sessionData.status === "COMPLETED" || sessionData.status === "CANCELED") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-3 bg-gray-100 w-full">
                <div className={`shadow-xl rounded-xl px-8 py-12 max-w-xl w-full text-center border-3 ${
                    sessionData.status === "COMPLETED" ? "border-green-400 bg-green-100 text-green-800" 
                    : "border-red-400 bg-red-100 text-red-800"
                }`}>
                    <h2 className="text-3xl font-bold mb-5">
                        {sessionData.status === "COMPLETED" ? "🎉 Sesión Completada" : "❌ Sesión Cancelada"}
                    </h2>
                    <p className="text-base font-medium">
                        {sessionData.status === "COMPLETED" 
                            ? "Esta sesión ha sido completada exitosamente. ¡Felicidades por tu esfuerzo!" 
                            : "Esta sesión ha sido cancelada y no puede ser jugada."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-3 bg-gray-100 w-full">
            {!gameStarted ? (

                // Pantalla de bienvenida antes de iniciar la sesión
                <div className="bg-[#4E5C82] shadow-xl rounded-3xl p-8 max-w-xl w-full text-center border-2 border-[#ECE5DD] text-[#ECE5DD]">
                    <h2 className="text-3xl font-bold mb-5">¡Te damos la bienvenida a tu sesión, {sessionData.patientName}!</h2>
                
                    <p className="text-base font-medium text-[#D1D5DB] mt-2 mb-6">
                        Esta sesión ha sido diseñada especialmente para ti. Enfoca tu atención y da lo mejor de ti en esta sesión de juego.
                    </p>
                
                    {/* Instrucciones antes de iniciar */}
                    <div className="bg-white text-gray-800 rounded-lg border border-gray-300 p-5 shadow-md text-left">
                        <p className="text-lg font-semibold text-center mb-1">🧠 Prepárate:</p>
                        <p className="leading-5">
                            Antes de comenzar, revisa las indicaciones a la izquierda de la pantalla ⬅️ para entender la dinámica del juego.
                        </p>
                        <p className="leading-5 mt-3">
                            Ejercita tu mente y avanza a tu propio ritmo. Cada sesión es una oportunidad para fortalecer tus habilidades y seguir progresando.
                        </p>
                    </div>
                
                    {/* Mensaje de error si no se puede iniciar la sesión de juego*/}
                    {startError && (
                        <p className="mt-4 text-white font-semibold bg-red-400 p-2 rounded-lg border-2 border-white">
                            {startError}
                        </p>
                    )}
                
                    {/* Botón para iniciar la sesión de juego */}
                    <button 
                        onClick={startGame}
                        disabled={starting}
                        className={`mt-6 px-6 py-2 rounded-lg text-lg font-semibold shadow-md border-2 border-[#ECE5DD] transition ${
                            starting ? "bg-gray-400 cursor-wait" : "bg-[#4E5C82] text-[#ECE5DD] hover:bg-green-500 hover:text-white cursor-pointer"
                        }`}
                    >
                        {starting ? "Iniciando..." : "¡Comenzar!"}
                    </button>
                </div>   
            ) : (
                // Cuendo la sesión de juego es iniciada, se renderiza el componente GameMechanics
                <GameMechanics numberOfPairs={sessionData.gameChips / 2} sessionId={sessionId} />
            )}
        </div>
    );
}

export default GameSessionJoin;
