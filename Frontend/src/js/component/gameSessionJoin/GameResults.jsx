
export default function GameResults({ attempts, time }) {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-96">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">¡Has completado la sesión!</h2>

                <div className="flex justify-center space-x-4 mb-6">
                    <div className="bg-[#3E4B6A] shadow-lg rounded-xl px-6 py-3 w-32 text-center text-white">
                        <p className="text-lg font-semibold">Intentos</p>
                        <p className="text-3xl font-bold">{attempts}</p>
                    </div>

                    <div className="bg-[#3E4B6A] shadow-lg rounded-xl px-6 py-3 w-32 text-center text-white">
                        <p className="text-lg font-semibold">Tiempo</p>
                        <p className="text-3xl font-bold">{time} s</p>
                    </div>
                </div>

                <p className="text-[#3E4B6A] font-semibold">
                    Gracias por jugar en <span className="font-bold">NexCognitive</span>.  
                    Tu progreso ha sido registrado y enviado a tu especialista para su análisis.
                </p>
            </div>
        </div>
    );
}
