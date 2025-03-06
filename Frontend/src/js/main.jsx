import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '../styles/index.css'
import { App } from './app'
import PatientManagement from './pages/patientManagement/PatientManagement'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <PatientManagement />
      </App>
    </BrowserRouter>    
  </StrictMode>,
)
