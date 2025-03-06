import React from 'react';
import { MdNotifications } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import { MdHome } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { BiSolidCastle } from "react-icons/bi";
import { useAuth } from '../context/AuthContext';

const NavBar = () => {

    const { logout } = useAuth();


  return (
    <div className='nav-bar'>
      <div className='up-bar bg-[#ECE5DE] flex justify-between h-[88px] max-w-[2500px] mx-auto items-center px-14'>
        <h1 className='title text-[#3F4B6E] text-3xl font-bold'>NEXCOGNITIVE</h1>
        <div className='flex gap-12'>
          <div className='notifications'>
            <MdNotifications color='#2D3147' size={30} />
          </div>
          <div className='profile-pic flex gap-3 items-center'>
            <BsPersonCircle color='#2D3147' size={22} />
            <p className='text-[#2D3147] font-semibold text-[20px]'>Soledad</p>
            <SlArrowDown color='#2D3147' size={14} />
            <button onClick={logout} className='text-[#2D3147] font-semibold text-[20px]'>salir</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;