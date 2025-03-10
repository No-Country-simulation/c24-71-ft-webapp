import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import CancelGameModal from '../gameSessionJoin/CancelGameModal';

function LayoutGame() {
    const { sessionId } = useParams();
        
    const [sessionData, setSessionData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isColorBlindMode, setIsColorBlindMode] = useState(
        () => JSON.parse(localStorage.getItem("isColorBlindMode")) || false
    );

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await api.get(`/game-sessions/patient/join/${sessionId}`);
                setSessionData(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        fetchSessionData();
    }, [sessionId]);

    useEffect(() => {
        localStorage.setItem("isColorBlindMode", JSON.stringify(isColorBlindMode));
    }, [isColorBlindMode]);

    const formatRules = (rules) => {
        return rules.split(/\d+\.\s/).filter(Boolean);
    };

    const handleCancelGame = () => {
        setShowCancelModal(true);
    };

    return (
        <div className='relative flex'>
            
            {/* Botón para activar el modo daltónico */}
            <div className="absolute right-0 flex justify-center m-4">
                <button
                    onClick={() => setIsColorBlindMode(!isColorBlindMode)}
                    className={`px-2 py-2 rounded-lg text-xs font-semibold shadow-md border-2 
                        ${isColorBlindMode ? "bg-blind-primary text-blind-text border-blind-primary" : "bg-[#4E5C82] text-[#ECE5DE] border-[#4E5C82]"} 
                        cursor-pointer duration-200`}
                >
                    {isColorBlindMode ? "Modo Normal" : "Modo Daltonismo"}
                </button>
            </div>

            {/* Contenedor lateral con información del juego */}
            <div className={`p-5 w-96 transition-colors 
                ${isColorBlindMode ? 'bg-blind-secondary' : 'bg-[#4E5C82]'}`}>

                <h1 className={`text-3xl font-bold pb-5 border-b-3 text-center transition-colors
                    ${isColorBlindMode ? 'text-blind-primary' : 'text-[#ECE5DE]'}`}>
                    NEXCOGNITIVE
                </h1>

                {sessionData && (
                    <div className="space-y-6 mt-4">

                        {/* Nombre del juego */}
                        <h2 className={`text-lg font-bold mb-5 leading-6 text-center transition-colors
                            ${isColorBlindMode ? 'text-blind-primary' : 'text-[#ECE5DE]'}`}>
                            {sessionData.game.name}
                        </h2>

                        {/* Descripción del juego */}
                        <div className={`rounded-lg border p-3 shadow-md text-left transition-colors 
                            ${isColorBlindMode ? 'bg-blind-background text-blind-primary border-blind-border' : 'bg-white text-gray-800 border-gray-300'}`}>
                            <p className="text-base font-semibold">Descripción:</p>
                            <p className="text-sm leading-4 mt-2">{sessionData.game.description}</p>
                        </div>

                        {/* Reglas del juego */}
                        <div className={`rounded-lg border p-3 shadow-md text-left transition-colors
                            ${isColorBlindMode ? 'bg-blind-background text-blind-primary border-blind-border' : 'bg-white text-gray-800 border-gray-300'}`}>
                            <p className="text-base font-semibold">Reglas:</p>
                            <ul className="text-sm mt-2 list-disc pl-5 space-y-2 leading-4">
                                {formatRules(sessionData.game.rules).map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Botón para cancelar la sesión */}
                        {sessionData.status !== "CANCELED" && sessionData.status !== "COMPLETED" && (
                            <div className='flex justify-center mt-8'>
                                <button 
                                    onClick={handleCancelGame}
                                    className={`px-4 py-2 rounded-lg text-base font-semibold shadow-md border-2 transition-colors duration-300 cursor-pointer
                                    ${isColorBlindMode ? 'border-blind-border bg-blind-accent text-blind-text hover:bg-blind-hover' 
                                    : 'border-[#ECE5DD] bg-red-400 text-white hover:bg-red-500'}`}
                                >
                                    Cancelar Juego
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>   

            {/* Área donde se renderizan los componentes hijos */}
            <Outlet context={{ sessionData, loading, error, sessionId, isColorBlindMode }} />

            {/* Modal de cancelación */}
            {showCancelModal && (
                <CancelGameModal
                    onClose={() => setShowCancelModal(false)}
                    sessionId={sessionId}
                    isColorBlindMode={isColorBlindMode}
                />
            )}
        </div>
    );
}

export default LayoutGame;
