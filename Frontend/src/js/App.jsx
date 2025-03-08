import { AuthProvider } from "./context/AuthProvider"
import { AppRouter } from "./router"

export const App = () => {
  return (
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
    
  )
}
