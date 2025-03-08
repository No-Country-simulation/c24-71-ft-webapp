
import { Link } from 'react-router-dom'

export const PlayGame = () => {
  return (
   <>
    <h2 className='text-2xl'> Juego XXXXX </h2>

    <p> Reglas de juego </p>

    <nav >
        <Link className='bg-sky-500/100' to="/play/game">Iniciar Jugar</Link>   
    </nav>
   </>
  )
}
