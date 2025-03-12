import { useEffect, useReducer } from "react";
import { FaSpinner } from "react-icons/fa";
import api from "../../api/axiosConfig";
import { gameSessionsReducer, initialState } from "../../context/gameSessionsReducer";

const statusColors = {
  PENDING: "bg-[#F7E693]",
  COMPLETED: "bg-[#ABDC6A]",
  CANCELED: "bg-[#F5A447]",
  IN_PROGRESS: "bg-[#4798F5]",  
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleDateString("es-ES", options);
};

const GameSessionsTable = () => {
  const [state, dispatch] = useReducer(gameSessionsReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await getLatestGames();
        dispatch({ type: "FETCH_SUCCESS", payload: data.slice(0, 10) }); // Solo las últimas 10 sesiones
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: "Error al cargar las sesiones de juego" });
      }
    };

    fetchData();
  }, []);


  const getLatestGames = async () => {
    try {
      const response = await api.get("/dashboard/latestgames");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las últimas sesiones de juego", error);
      throw error;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <h2 className="text-3xl font-semibold text-gray-700 mt-4 mb-8">Últimas 10 Sesiones de Juego</h2>
        
      {state.loading ? (
        <div className="flex justify-center items-center h-24">
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
        </div>
      ) : state.error ? (
        <p className="text-red-500 text-center">{state.error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#ECE5DE] text-gray-600 text-left">
                <th className="p-3">Paciente</th>
                <th className="p-3">Juego</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody className=" text-gray-600 text-left">
              {state.sessions.map((session, index) => (
                <tr key={index} className="border-b border-b-[#ECE5DE]  hover:bg-gray-50">
                  <td className="p-3">{session.patientName}</td>
                  <td className="p-3">{session.gameName}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-white text-xs ${statusColors[session.status] || "bg-gray-500"}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="p-3">{formatDate(session.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GameSessionsTable;