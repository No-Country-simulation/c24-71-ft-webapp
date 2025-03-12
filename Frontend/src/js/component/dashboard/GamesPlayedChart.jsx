import { useEffect, useReducer } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../api/axiosConfig";


// Reducer para manejar el estado de la data
const initialState = { data: null, loading: true, error: null };

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

const COLORS = ["#4e5c82", "#A69487", "#FFAF5E"]; // Verde (Completado), Amarillo (En progreso), Rojo (Cancelado)

const GamesPlayedChart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dashboard/games-played-month");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchData();
  }, []);

  if (state.loading) return <p className="text-center text-gray-500">Cargando datos...</p>;
  if (state.error) return <p className="text-center text-red-500">Error al cargar datos</p>;

  const { completed, inProgress, canceled, totalPlayed } = state.data;

  const data = [
    { name: "Completado", value: completed },
    { name: "En Progreso", value: inProgress },
    { name: "Cancelado", value: canceled },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full flex flex-col items-center">
      <h2 className="text-xl text-center font-semibold mb-4 text-gray-700">Sesiones Jugados en el Mes</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80} // Aumentamos el tamaño del gráfico
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`} // Muestra % en cada sector
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-gray-600 mt-4 text-lg">Total Jugados: <span className="font-bold">{totalPlayed}</span></p>
    </div>
  );
};

export default GamesPlayedChart;