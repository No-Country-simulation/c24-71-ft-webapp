import { useEffect, useReducer } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import api from "../../api/axiosConfig";


// Reducer para manejar el estado de la data
const initialState = { data: [], loading: true, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const SessionsBarChart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dashboard/sessions-per-day");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className="bg-white p-4 rounded-2xl shadow-md w-full flex flex-col items-center ">
        
      <h2 className="text-xl  font-semibold mb-4 text-gray-700 text-center">Sesiones de Juego Últimos 7 Días</h2>
      {state.loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : state.error ? (
        <p className="text-center text-red-500">Error al cargar datos { state.error } </p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={state.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#4e5c82" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SessionsBarChart;