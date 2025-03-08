import React, { useState } from "react"; 
import api from "../../api/axiosConfig";


function CancelGameModal({ onClose, sessionId }) {


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
            <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Por qué deseas cancelar esta sesión?</h3>

                {cancelError && (
                    <p className="my-4 text-white font-semibold bg-red-400 p-2 rounded-lg">
                        {cancelError}
                    </p>
                )}

                <textarea
                    className="w-full border p-2 rounded mb-4 text-black min-h-28"
                    placeholder="Agrega una observación"
                    value={cancelObservation}
                    onChange={(e) => setCancelObservation(e.target.value)}
                    disabled={isSubmitting}
                />


                <div className="flex justify-between">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 cursor-pointer duration-200"
                        disabled={isSubmitting}
                    >
                        Cerrar
                    </button>
                    <button 
                        onClick={cancelGame} 
                        className={`px-4 py-2  text-white rounded-lg  duration-200 ${isSubmitting ? 'bg-gray-400 cursor-wait' : 'bg-red-500 hover:bg-red-600 cursor-pointer'}`}
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
