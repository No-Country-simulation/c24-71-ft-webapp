import React from 'react';
import { MdSearch } from "react-icons/md";
import AddPatient from './AddPatient';

const SearchPatient = () => {
  return (
    <div className='text-black grid grid-cols-[156px_1005px_80px_28px_150px_150px] grid-rows-[141px_1fr_1fr] w-full max-w-none'>
			<input type='search' placeholder='Buscar...' className='bg-[#EEEEEE] w-full h-[67px] col-start-2 row-start-2 col-span-1 border-solid border-2 border-[#A69487] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-4' />
			<button className='bg-[#EEEEEE] w-full h-[67px] col-start-3 row-start-2 col-span-1 border-solid border-2 border-[#A69487] mr-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-center items-center'><MdSearch size='23px' /></button>
      <div className='col-start-5 row-start-2'>
        <AddPatient />
      </div>
    </div>
  )
}

export default SearchPatient;
//absolute top-[141px] left-[1501px] button