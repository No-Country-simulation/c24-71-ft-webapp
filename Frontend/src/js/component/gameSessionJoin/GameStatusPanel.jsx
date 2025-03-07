import React from 'react'

function GameStatusPanel({ attempts, countdownTimer, gameTimer, matched, totalCards }) {
    return (
        <div className="flex space-x-6 mb-3 bg-[#4E5C82] h-32 text-white p-4 rounded-xl shadow-xl">
            <div className="bg-[#3E4B6A] shadow-lg rounded-xl px-6 py-3 w-36 text-center">
                <p className="text-lg font-semibold">Intentos</p>
                <p className="text-3xl font-bold">{attempts}</p>
            </div>
            <div className={`bg-[#3E4B6A] flex flex-col justify-center items-center shadow-lg rounded-xl px-6 py-3 w-36 text-center ${countdownTimer.running ? "text-red-400" : "text-white"}`}>
                {matched.length === totalCards ? (
                    <p className="text-xl font-semibold leading-5 text-blue-400">Partida Finalizada</p>
                ) : gameTimer.running ? (
                    <p className="text-xl font-semibold leading-5 text-green-400">¡Comienza!</p>
                ) : (
                    <>
                        <p className="text-lg font-semibold leading-5">Cuenta regresiva</p>
                        <p className="text-3xl font-bold">{countdownTimer.running ? countdownTimer.time : "-"}</p>
                    </>
                )}
            </div>

            <div className="bg-[#3E4B6A] shadow-lg rounded-xl px-6 py-3 w-36 text-center">
                <p className="text-lg font-semibold">Tiempo</p>
                <p className="text-3xl font-bold">{gameTimer.time}</p>
            </div>
        </div>
    )
}

export default GameStatusPanel