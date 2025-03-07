import React from 'react';
import { MdSearch } from "react-icons/md";
import AddPatient from './AddPatient';

const SearchPatient = () => {
  return (
    <div className='text-black grid grid-cols-[0.32fr_2fr_0.15fr_0.1fr_0.7fr_0fr] grid-rows-[2.2fr_1fr_1fr] w-full'>
			<input type='search' placeholder='Buscar...' className='bg-[#EEEEEE] w-full h-[67px] col-start-2 row-start-2 col-span-1 border-solid first:border-r-0 border-2 border-[#A69487] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-4' />
			<button className='bg-[#EEEEEE] w-full h-[67px] col-start-3 row-start-2 col-span-1 border-solid border-2 border-[#A69487] last:border-l-0 mr-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-center items-center'><MdSearch size='23px' /></button>
      <div className='col-start-5 row-start-2'>
        <AddPatient />
      </div>
    </div>
  )
}

export default SearchPatient;