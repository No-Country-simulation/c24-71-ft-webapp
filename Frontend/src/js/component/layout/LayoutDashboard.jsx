import { Outlet, Link } from "react-router-dom";

import SideBar from "../SideBar";
import NavBar from "../Navbar";


const LayoutDashboard = () => {
   

  return (


        <>
         
            <NavBar />    
            <div className="flex flex-row  text-black  max-w-[2500px] mx-auto">
                <div className="basis-[20vw]"><SideBar /></div>
                <div className="basis-[80vw]"><Outlet /></div>
            </div>
        </>

  );
};

export default LayoutDashboard;