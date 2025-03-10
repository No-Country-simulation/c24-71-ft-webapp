import React from 'react';
import { MdEdit } from "react-icons/md";

const Patients = () => {

  const patientsData = [
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" },
    {dni: "12.345.678", name: "Mariana Vazquez", age: "65", email: "mariana@gmail.com" }
  ]

  return (
    <div className='w-full '>
      {patientsData.map((patient, index) => (
      <div key={index} className={`bg-[#F7F7F7] h-[44px] border-solid border-[#939191] ${index === 0 ? "border-t-0" : "border-t"} content-center`}>
        <ul className='grid grid-cols-[1fr_1.5fr_0.5fr_1.5fr_0.2fr] text-start text-[#4E5C82] text-xl font-normal px-10'>
          <li>{patient.dni}</li>
          <li>{patient.name}</li>
          <li className='text-start'>{patient.age}</li>
          <li>{patient.email}</li>
          <li className='flex justify-center pr-4 items-center'><MdEdit color='#2D3147'/></li>
        </ul>
      </div>
      )
      )}
    </div>
  )
}
export default Patients;







// const Patients = () => {
//   return (
//     <div className='w-full'>
//       <div className='bg-[#F7F7F7] h-[44px] border-t border-solid border-[#939191] content-center'>
//         <ul className='grid grid-cols-[1fr_1.5fr_0.5fr_1.5fr_0.2fr] text-start text-[#4E5C82] text-xl font-normal px-10'>
//           <li>12.345.678</li>
//           <li>Soledad Vazquez</li>
//           <li className='text-start'>#00</li>
//           <li>soledad@gmail.com</li>
//           <li className='flex justify-center pr-4 items-center'><MdEdit color='#2D3147'/></li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Patients;