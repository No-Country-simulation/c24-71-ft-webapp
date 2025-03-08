import React from 'react';
import { MdHome } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { BiSolidCastle } from "react-icons/bi";
import { Link } from 'react-router-dom';


const SideBar = () => {
    return (
      <div className='side-bar bg-[#4e5c82] min-w-[333px] h-screen'>
        <div className='pages text-[#ECE5DE] text-[27px] font-semibold '>
          <ul className='flex flex-col gap-7 pl-14 pt-6'>
            <li className='flex items-center gap-2'><MdHome /> <Link to="/dashboard/">Home</Link></li>
            <li className='flex items-center gap-2'><MdGroups /><Link to="/dashboard/patients">Pacientes</Link></li>
            <li className='flex items-center gap-2'><BiSolidCastle /><Link to="/dashboard/games">Juegos</Link></li>
          </ul>
        </div>
      </div>
    )
}

export default SideBar;
