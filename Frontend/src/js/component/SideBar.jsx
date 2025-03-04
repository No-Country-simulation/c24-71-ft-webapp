import React from 'react';
import { MdHome } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { BiSolidCastle } from "react-icons/bi";


const SideBar = () => {
    return (
<div className='side-bar bg-[#4e5c82] w-[333px] h-screen'>
<div className='pages text-[#ECE5DE] text-[27px] font-semibold '>
  <ul className='flex flex-col gap-7 pl-14 pt-6'>
    <li className='flex items-center gap-2'><MdHome /><a href=''>Home</a></li>
    <li className='flex items-center gap-2'><MdGroups /><a href=''>Pacientes</a></li>
    <li className='flex items-center gap-2'><BiSolidCastle /><a href=''>Juegos</a></li>
  </ul>
</div>
</div>
    )
}

export default SideBar;
