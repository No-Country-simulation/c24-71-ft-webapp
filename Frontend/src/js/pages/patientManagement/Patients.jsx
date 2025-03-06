import React from 'react';
import { MdEdit } from "react-icons/md";

const Patients = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#F7F7F7] h-[44px] border-solid border-1 border-[#939191] flex items-center'>
        <ul className='grid grid-cols-[1fr_6fr_6fr_1fr_1fr] gap-4 text-start text-[#4E5C82] text-xl font-normal px-10'>
          <li>12.345.678</li>
          <li>Soledad Vazquez</li>
          <li>#00</li>
          <li>soledad@gmail.com</li>
          <li className='flex justify-end'><MdEdit color='#2D3147'/></li>
        </ul>
      </div>
    </div>
  )
}

export default Patients;
