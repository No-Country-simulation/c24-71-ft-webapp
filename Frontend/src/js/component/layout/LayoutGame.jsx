import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import CancelGameModal from '../GameSessionJoin/CancelGameModal';

function LayoutGame() {
    const { sessionId } = useParams();
        
    const [sessionData, setSessionData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);
    

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

    const formatRules = (rules) => {
        return rules.split(/\d+\.\s/).filter(Boolean);
    };

    const handleCancelGame = () => {
        setShowCancelModal(true);
    };

    return (
        <div className='relative flex'>
            
            {/* Contenedor lateral con información del juego */}
            <div className='bg-[#4E5C82] p-5 w-96'>
                <h1 className='text-[#ECE5DE] text-3xl font-bold pb-5 border-b-3 text-center'>NEXCOGNITIVE</h1>
                {sessionData && (
                    <div className="space-y-6 mt-4">

                        {/* Nombre del juego */}
                        <h2 className="text-lg font-bold mb-5 text-[#ECE5DE] leading-6 text-center">{sessionData.game.name}</h2>

                        {/* Descripción del juego */}
                        <div className="bg-white text-gray-800 rounded-lg border border-gray-300 p-3 shadow-md text-left">
                            <p className="text-base font-semibold">Descripción:</p>
                            <p className="text-sm leading-4 mt-2">{sessionData.game.description}</p>
                        </div>

                        {/* Reglas del juego */}
                        <div className="bg-white text-gray-800 rounded-lg border border-gray-300 p-3 shadow-md text-left">
                            <p className="text-base font-semibold">Reglas:</p>
                            <ul className="text-sm mt-2 list-disc pl-5 space-y-2 leading-4">
                                {formatRules(sessionData.game.rules).map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Botón para cancelar la sesión si aún está activa */}
                        {sessionData.status !== "CANCELED" && sessionData.status !== "COMPLETED" && (
                            <div className='flex justify-center mt-8'>
                                <button 
                                    onClick={handleCancelGame}
                                    className="px-4 py-2 rounded-lg text-base font-semibold shadow-md border-2 border-[#ECE5DD] bg-red-400 text-white hover:bg-red-500 cursor-pointer duration-200"
                                >
                                    Cancelar Juego
                                </button>
                            </div>
                        )}
                        
                    </div>
                )}
            </div>   

            {/* Área donde se renderizan los componentes hijos */}
            <Outlet context={{ sessionData, loading, error, sessionId }} />

            {/* Modal de cancelación */}
            {showCancelModal && (
                <CancelGameModal
                    onClose={() => setShowCancelModal(false)}
                    sessionId={sessionId}
                />
            )}
        </div>
    );
}

export default LayoutGame;
