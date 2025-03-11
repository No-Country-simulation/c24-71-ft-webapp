import { Navigate, Route, Routes } from "react-router"




import LayoutAuth from "./component/layout/LayoutAuth"
import LayoutDashboard from "./component/layout/LayoutDashboard"
import LayoutGame from "./component/layout/LayoutGame"
import PrivateRoute from "./component/layout/PrivateRoute"
import PublicRoute from "./component/layout/PublicRoute"

import { Home } from "./pages/home/Home"
import { Login } from "./pages/auth/Login"
import PatientManagement from "./pages/patientManagement/patientManagement"
import { Register } from "./pages/auth/Register"
import GameManagement from "./pages/gameManagement/gameManagement"
import NotFound from "./pages/noFound/NotFound"
import GameSessionJoin from "./pages/gameSessionJoin/GameSessionJoin"


export const AppRouter = () => {
  return (
    <Routes>
    {/* Rutas de autenticación (públicas) */}
    <Route path="auth/*" element={<PublicRoute />}>
        <Route element={<LayoutAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<Navigate to="login" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
    </Route>

    {/* Rutas de juego (públicas) */}
    <Route path="game-sessions/patient/join/:sessionId" element={<LayoutGame />}>
        <Route index element={<GameSessionJoin />} />
        <Route path="*" element={<NotFound />} />
    </Route>

    {/* Rutas del Dashboard (privadas) */}
    <Route path="dashboard/*" element={<PrivateRoute/>}>
      <Route element={<LayoutDashboard />}>
        <Route index element={<Home />} />
        <Route path="patients" element={<PatientManagement/>} />
        <Route path="games" element={<GameManagement />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>

    <Route index element={<Navigate to="auth" />} />


    {/* Página 404 para cualquier otra ruta */}
    <Route path="*" element={<NotFound />} />

    
  </Routes>
  )
}
