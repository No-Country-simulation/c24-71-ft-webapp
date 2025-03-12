import { Outlet, Link } from "react-router-dom";

import SideBar from "../SideBar";
import NavBar from "../Navbar";


const LayoutDashboard = () => {
   

  return (


        <div className= "">
         
            <NavBar />
            <div className="flex flex-row text-white max-w-[2500px] mx-auto">
                <div className="basis-[20vw]"><SideBar /></div>
                <div className="basis-[80vw]"><Outlet /></div>
            </div>
        </div>

  );
};

export default LayoutDashboard;