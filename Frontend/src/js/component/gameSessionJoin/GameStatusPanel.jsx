import React from 'react'
import { formatTime } from '../../utils/timeUtils'

function GameStatusPanel({ attempts, countdownTimer, gameTimer, matched, totalCards, isColorBlindMode }) {
    
    return (
        <div className={`flex space-x-6 mb-3 h-32 p-4 rounded-xl shadow-xl ${isColorBlindMode ? 'bg-blind-secondary text-blind-primary' : 'bg-[#4E5C82] text-white'}`}>
            <div className={`${isColorBlindMode ? 'bg-blind-background border border-blind-border' : 'bg-[#3E4B6A]'} shadow-lg rounded-xl px-6 py-3 w-36 text-center`}>
                <p className="text-lg font-semibold">Intentos</p>
                <p className="text-3xl font-bold">{attempts}</p>
            </div>
            <div className={`flex flex-col justify-center items-center shadow-lg rounded-xl px-4 py-3 w-36 text-center 
                ${countdownTimer.running 
                    ? (isColorBlindMode 
                        ? 'bg-blind-accent text-blind-text'
                        : 'bg-[#3E4B6A] text-red-400') 
                    : (isColorBlindMode 
                        ? 'bg-blind-background border border-blind-border' 
                        : 'bg-[#3E4B6A]')}`}
            >
                {matched.length === totalCards ? (
                    <p className={`text-xl font-semibold leading-5 ${isColorBlindMode ? 'text-blind-primary' : 'text-blue-400'}`}>Partida Finalizada</p>
                ) : gameTimer.running ? (
                    <p className={`text-xl font-semibold leading-5 ${isColorBlindMode ? 'text-blind-primary' : 'text-green-400'}`}>¡Comienza!</p>
                ) : (
                    <>
                        <p className="text-lg font-semibold leading-5">Cuenta regresiva</p>
                        <p className="text-3xl font-bold text-center">{countdownTimer.running ? countdownTimer.time : "-"}</p>
                    </>
                )}
            </div>

            <div className={`${isColorBlindMode ? 'bg-blind-background border border-blind-border' : 'bg-[#3E4B6A]'} shadow-lg rounded-xl px-4 py-3 w-36 text-center`}>
                <p className="text-lg font-semibold">Tiempo</p>
                <p className="text-3xl font-bold [font-feature-settings:'tnum']">{formatTime(gameTimer.time)}</p>
            </div>
        </div>
    )
}

export default GameStatusPanel