import React, { useState } from "react"; 
import api from "../../api/axiosConfig";


function CancelGameModal({ onClose, sessionId, isColorBlindMode }) {


    const [cancelObservation, setCancelObservation] = useState("");
    const [cancelError, setCancelError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cancelGame = async () => {
        if (!cancelObservation.trim()) {
            setCancelError("Debes agregar una observación.");
            return;
        }

        setIsSubmitting(true);
        setCancelError(null);

        try {
            await api.patch(`/game-sessions/patient/join/${sessionId}/cancel`, { observation: cancelObservation });
            window.location.reload(); 
        } catch (err) {
            setCancelError(err.response?.data?.error || "No se pudo cancelar la sesión.");
            
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center">
            <div className={`p-6 rounded-lg shadow-lg w-[450px] ${isColorBlindMode ? 'bg-blind-secondary' : 'bg-white'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${isColorBlindMode ? 'text-blind-primary' : 'text-gray-800'}`}>
                    ¿Por qué deseas cancelar esta sesión?
                </h3>

                {cancelError && (
                    <p className={`my-4 font-semibold p-2 rounded-lg ${isColorBlindMode ? 'text-blind-text bg-blind-accent' : 'bg-red-400 text-white'}`}>
                        {cancelError}
                    </p>
                )}

                <textarea
                    className={`w-full border-2 p-2 rounded-lg mb-4  min-h-28 
                        ${isColorBlindMode ? 'bg-blind-background border-blind-border text-blind-primary placeholder:text-blind-hover' : 'text-black'}`}
                    placeholder="Agrega una observación"
                    value={cancelObservation}
                    onChange={(e) => setCancelObservation(e.target.value)}
                    disabled={isSubmitting}
                />


                <div className="flex justify-between font-semibold">
                    <button 
                        onClick={onClose} 
                        className={`px-4 py-2  rounded-lg  cursor-pointer duration-200
                            ${isColorBlindMode ? 'bg-blind-background text-blind-primary hover:bg-black' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                        disabled={isSubmitting}
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={cancelGame}
                        className={`px-4 py-2 rounded-lg duration-200 
                            ${isSubmitting ? 'bg-gray-400 cursor-wait' : 
                            isColorBlindMode 
                                ? 'bg-blind-accent hover:bg-blind-hover text-gray-800 cursor-pointer' 
                                : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                            }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Cancelando..." : "Confirmar Cancelación"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CancelGameModal;
