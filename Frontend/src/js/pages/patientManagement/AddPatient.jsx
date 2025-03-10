import React from 'react';
import { useState } from 'react';
import { MdPersonAdd } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";

const AddPatient = () => {

  const [openPopUp, setOpenPopUp] = useState(false);

  return (
    <div className='grid grid-cols-[0.7fr_0.8fr]'>
      <button onClick={() => setOpenPopUp(true)} className='bg-[#4E5C82] w-full h-[69px] rounded-[8px] flex justify-center items-center hover:bg-[#65749e] transform active:translate-y-[2px] transition-all duration-300'><MdPersonAdd size='33px' color='#ECE5DE'/></button>

      {/* pop up Add Patient */}
      { openPopUp &&
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/2 w-[750px] h-[560px] bg-[#4E5C82] text-white p-8 z-50 rounded-2xl'>
        <div className='flex justify-between'>
          <h2 className='text-2xl pb-10 pt-4 flex mx-auto'>Agregar Paciente</h2>
          <button onClick={() => setOpenPopUp(false)} className='self-start'><FaRegWindowClose size={24} /></button>
        </div>
        <div className='grid grid-cols-[0.8fr_1fr_0.3fr_1fr] gap-6'>
          <label htmlFor='name-tag' className=''>Nombre y Apellido:</label>
          <input type='text' id='name-tag' placeholder='José Peréz' className='bg-[#EEEEEE] w-[200px] h-[40px] pl-3 placeholder-[#939191] text-[#616060]'/>
          <label htmlFor='dni-tag' className=''>DNI:</label>
          <input type='number' id='dni-tag' placeholder='11.111.111' className='bg-[#EEEEEE] w-[200px] h-[40px] pl-3 placeholder-[#939191] text-[#616060]'/>
          <label htmlFor='age-tag' className=''>Edad:</label>
          <input type='number' id='age-tag' placeholder='99' className='bg-[#EEEEEE] w-[200px] h-[40px] pl-3 placeholder-[#939191] text-[#616060]'/>
          <label htmlFor='email-tag' className=''>E-mail:</label>
          <input type='email' id='email-tag' placeholder='joseperez@gmail.com' className='bg-[#EEEEEE] w-[200px] h-[40px] pl-3 placeholder-[#939191] text-[#616060]'/>
          <label htmlFor='diagnosis-tag' className=''>Diagnóstico:</label>
          <textarea type='text' id='diagnosis-tag' placeholder='Escriba aquí' className='col-start-1 col-span-4 bg-[#EEEEEE] w-[680px] h-[150px] px-3 pt-2 placeholder-[#939191] text-[#616060]'/>
          <div className='grid col-span-4 justify-center pt-4'>
            <button typeof='submit' className='bg-[#4E5C82] border border-[#ECE5DE] w-[100px] h-[36px] rounded-[8px] hover:bg-[#65749e] transform active:translate-y-[2px] transition-all duration-300'>Agregar</button>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default AddPatient;
