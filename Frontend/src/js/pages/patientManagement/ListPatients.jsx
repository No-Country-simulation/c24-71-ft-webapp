import React from 'react';
import Patients from './Patients';

const ListPatients = () => {
  return (
    <div className='grid grid-cols-[0.70fr_5.6fr_0.85fr] grid-rows-[1fr_4.5fr_1fr]'>
				<div className='bar bg-[#EEEEEE] col-start-2 border-solid border-1 border-[#939191] mb-10 content-center'>
          <ul className='grid grid-cols-[1fr_1.5fr_0.5fr_1.5fr_0.2fr] text-[#3F4B6E] text-xl font-semibold justify-between px-10'>
            <li>DNI</li>
            <li>Nombre y Apellido</li>
            <li className='text-center pr-2'>Edad</li>
            <li className='pl-23'>Mail</li>
            <li>Acciones</li>
          </ul>
        </div>
        <div className='row-start-2 col-start-2 border border-solid border-[#939191]'>
        <Patients />
        </div>
        
    </div>
  )
}

export default ListPatients;
