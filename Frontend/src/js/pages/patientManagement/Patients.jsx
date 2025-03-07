import React from 'react';
import { MdEdit } from "react-icons/md";

const Patients = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#F7F7F7] h-[44px] border-t border-solid border-[#939191] content-center'>
        <ul className='grid grid-cols-[1fr_1.5fr_0.5fr_1.5fr_0.2fr] text-start text-[#4E5C82] text-xl font-normal px-10'>
          <li>12.345.678</li>
          <li>Soledad Vazquez</li>
          <li className='text-start'>#00</li>
          <li>soledad@gmail.com</li>
          <li className='flex justify-center pr-4 items-center'><MdEdit color='#2D3147'/></li>
        </ul>
      </div>
    </div>
  )
}

export default Patients;

//grid grid-cols-[1fr_1fr_0.5fr_1fr_1fr] gap-4 