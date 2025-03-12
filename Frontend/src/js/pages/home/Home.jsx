import { useEffect, useReducer } from "react";
import DashboardCard from "../../component/dashboard/DashboardCard";
import GameSessionsTable from "../../component/dashboard/GameSessionsTable";
import GamesPlayedChart from "../../component/dashboard/GamesPlayedChart";
import SessionsBarChart from "../../component/dashboard/SessionsBarChart";
import api from "../../api/axiosConfig";


// Estado inicial
const initialState = {
    stats: [],
    loading: true,
    error: null,
  };
  
  // Reducer para manejar el estado
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return { ...state, stats: action.payload, loading: false };
      case "FETCH_ERROR":
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };


export const Home = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/summary-statistics");
        console.log(response);
        
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        console.log(error);
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchStats();
  }, []);


  return (
   <div className="flex flex-col  p-8 xl:p-16 lg:p-8" >

        <div className="pb-6 grid gap-6 w-full sm:grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 ">
            {state.stats.map((stat, index) => (
                <DashboardCard key={index} {...stat} />
            ))}
        </div>         
   

        <div className="pb-6 grid md:grid-cols-1  lg:grid-cols-3 xl:grid-cols-3 gap-4">
        
            <div className="md:col-span-1 lg:col-span-2 ">
                <GameSessionsTable />
            </div>
            <div className="md:col-span-1  lg:col-span-1 grid grid-cols-1 gap-4 ">
                <SessionsBarChart />       
                <GamesPlayedChart />      
            </div>
        </div>
   
   </div>
   

  )
}
