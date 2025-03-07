import React from 'react';
import { MdPersonAdd } from "react-icons/md";

const AddPatient = () => {
  return (
    <div className='grid grid-cols-[0.7fr_0.8fr]'>
      <button className='bg-[#4E5C82] w-full h-[69px] rounded-[8px] flex justify-center items-center hover:bg-[#65749e] transform active:translate-y-[2px] transition-all duration-300'><MdPersonAdd size='33px' color='#ECE5DE'/></button>
    </div>
  )
}

export default AddPatient;
