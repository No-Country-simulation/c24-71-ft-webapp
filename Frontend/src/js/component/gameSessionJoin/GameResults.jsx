import { formatTime } from "../../utils/timeUtils";

export default function GameResults({ attempts, time, isColorBlindMode }) {
    return (
        <div className="flex justify-center items-center">
            <div className={`p-8 rounded-2xl shadow-2xl text-center w-96 ${isColorBlindMode ? 'bg-blind-secondary' : 'bg-white'}`}>
                <h2 className={`text-3xl font-bold  mb-6 ${isColorBlindMode ? 'text-blind-primary' : 'text-gray-800'}`}>¡Has completado la sesión!</h2>

                <div className="flex justify-center space-x-4 mb-6">
                    <div className={`shadow-lg rounded-xl px-4 py-3 w-32 text-center ${isColorBlindMode ? 'bg-blind-background text-blind-primary border border-blind-border' : 'bg-[#3E4B6A] text-white'}`}>
                        <p className="text-lg font-semibold">Intentos</p>
                        <p className="text-3xl font-bold">{attempts}</p>
                    </div>

                    <div className={`shadow-lg rounded-xl px-4 py-3 w-32 text-center ${isColorBlindMode ? 'bg-blind-background text-blind-primary border border-blind-border' : 'bg-[#3E4B6A] text-white'}`}>
                        <p className="text-lg font-semibold">Tiempo</p>
                        <p className="text-3xl font-bold">{formatTime(time)}</p>
                    </div>
                </div>

                <p className={`font-semibold ${isColorBlindMode ? 'text-blind-primary' : 'text-[#3E4B6A]'}`}>
                    Gracias por jugar en <span className="font-bold">NexCognitive</span>.  
                    Tu progreso ha sido registrado y enviado a tu especialista para su análisis.
                </p>
            </div>
        </div>
    );
}
