import { Outlet, Link } from "react-router-dom";
import puzzlesbrain from "../../../assets/puzzlesbrain.jpg";

const LayoutAuth = () => {
  return (

   
    <div className="flex flex-row">
        <div className="basis-1/3 h-screen bg-[#3F4B6E]">
        <div className="auth-layout text-center" >        

            <Outlet />

                
            </div>
        </div>
        <div className="basis-2/3 text-[#3F4B6E]"><img className= "h-full"src={puzzlesbrain}></img></div>
    </div>

  );
};

export default LayoutAuth;