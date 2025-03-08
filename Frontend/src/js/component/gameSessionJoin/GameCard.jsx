import { useMemo } from 'react'

function GameCard({ index, emoji, isSelected, isMatched, isIncorrect, showAll, onSelect, numberOfPairs, isColorBlindMode }) {

    const cardSize = useMemo(() => {
        const totalCards = numberOfPairs * 2;
        if (totalCards <= 18) return "w-40 h-40 text-[80px]"; // Tamaño grande
        if (totalCards <= 24) return "w-32 h-32 text-[60px]"; // Tamaño mediano
        if (totalCards <= 32) return "w-26 h-26 text-[50px]"; // Tamaño más pequeño
        return "w-24 h-24 text-[40px]"; // Tamaño mínimo
    }, [numberOfPairs]);

    return (
        <div 
            key={index}
            className={`relative transition-transform transform-3d ${cardSize} m-2 flex items-center justify-center select-none cursor-pointer rounded-2xl
                        ${isSelected || isMatched || showAll ? 'rotate-x-180' : ''}
                        ${isMatched ? 'animate-correct-card' : ''}
                        ${isIncorrect ? 'animate-incorrect-card' : ''}`}
            onClick={() => onSelect(index)}
        >
            {/* Lado frontal (emoji) */}
            <div
                className={`absolute text-black backface-hidden p-5 -rotate-x-180 w-full h-full flex justify-center items-center rounded-2xl border-2
                    ${isColorBlindMode ? 'border-blind-border bg-blind-accent' : 'border-[#4E5C82] bg-[#ECE5DD]'}
                    ${isMatched ? (isColorBlindMode ? 'border-blind-hover shadow-[0_0_25px_#D08700]' : 'border-[#ABDC6A] shadow-[0_0_25px_#ABDC6A]') : ''}
                    ${isIncorrect ? 'border-[#c1c1c1]' : ''}`}
            >
                {isColorBlindMode ? emoji.colorBlind : emoji.normal}
            </div>
            {/* Lado trasero (oculto) */}
            <div className={`absolute backface-hidden w-full h-full flex justify-center items-center rounded-2xl border-2 
                ${isColorBlindMode ? 'border-blind-secondary bg-blind-secondary' : 'border-[#4E5C82] bg-[#4E5C82]'}`}
            >
                ❔
            </div>
        </div>
    )
}

export default GameCard;