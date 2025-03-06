import React from 'react';
import { MdPersonAdd } from "react-icons/md";

const AddPatient = () => {
  return (
    <div className='text-black'>
      <button className='bg-[#4E5C82] w-full max-w-[142px] h-[69px] rounded-[8px] flex justify-center items-center hover:bg-[#5a688f] transform hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-300'><MdPersonAdd size='33px' color='#ECE5DE'/></button>
    </div>
  )
}

export default AddPatient;
