import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import '../styles/index.css'
import { App } from './app'
import PatientManagement from './pages/patientManagement/PatientManagement'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer />
      <App>
        <PatientManagement />
      </App>
    </BrowserRouter>    
  </StrictMode>
)
