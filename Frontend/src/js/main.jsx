import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import PatientManagement from './pages/patientManagement/PatientManagement.jsx';
import GameManagement from './pages/gameManagement/gameManagement.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PatientManagement />
    {/* <GameManagement /> */}
  </StrictMode>
)
