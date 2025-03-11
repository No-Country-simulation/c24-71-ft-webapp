import React from 'react';
import Patients from './Patients';

const ListPatients = () => {
  return (
    <div className='grid grid-cols-[488px_1300px_150px] grid-rows-[1fr_30px_1fr] w-full'>
				<div className='bar bg-[#EEEEEE] w-full max-w-[1253px] h-[68px] col-start-2 border-solid border-1 border-[#939191] mb-10 content-center'>
          <ul className='text-[#3F4B6E] text-xl font-semibold flex justify-between px-10'>
            <li>DNI</li>
            <li>Nombre y Apellido</li>
            <li>Edad</li>
            <li>Mail</li>
            <li>Acciones</li>
          </ul>
        </div>
        <div className='row-start-2 col-start-2'>
        <Patients />
        <Patients />
        <Patients />
        <Patients />
        <Patients />
        <Patients />
        <Patients />
        <Patients />
        <Patients />
        <Patients />
        <Patients />
        </div>
        
    </div>
  )
}

export default ListPatients;
