import axios from "axios";

/**
 * Configuración de la API para el frontend.
 *
 * 1. En la raíz del proyecto, dentro de la carpeta "frontend", crea un archivo llamado ".env.local".
 * 2. Agrega la siguiente variable de entorno:
 *    VITE_API_URL=<URL_DE_LA_API>/api
 *    (Reemplaza "<URL_DE_LA_API>" con la dirección correspondiente).
 *
 */

// Configuración de la instancia global de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir el token en cada petición si el usuario está autenticado
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));  //cambiar teniendo en cuenta como se guarda el token en localstorage
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;