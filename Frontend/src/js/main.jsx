import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import GameManagement from './pages/gameManagement/GameManagement.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameManagement/>
  </StrictMode>,
)
