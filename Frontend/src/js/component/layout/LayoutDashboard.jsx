import { Outlet, Link } from "react-router-dom";

import SideBar from "../SideBar";
import NavBar from "../Navbar";


const LayoutDashboard = () => {
   

  return (


        <>
         
            <NavBar />    
            <div class="flex flex-row  text-black  max-w-[2500px] mx-auto">
                <div class="basis-[20vw]"><SideBar /></div>
                <div class="basis-[80vw]"><Outlet /></div>
            </div>
        </>

  );
};

export default LayoutDashboard;