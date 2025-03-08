import axios from "axios";

// Configuración de la instancia global de Axios
const api = axios.create({
  baseURL: "https://api.ejemplo.com", 
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