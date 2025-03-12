import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import api from '../../api/axiosConfig.js';

const Patients = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  //Catch Patients data from api
  const patientsData = async () => {
    try{
      const response = await api.get('/api/patients');
      console.log("Respuesta de la API:", response);
      setData(response.data);
    } catch (error){
      console.error("Error al obtener datos:", error)
      setError(error.response?.data?.error ?? "Hubo un error al cargar la lista de pacientes.");
    } finally {
    setLoading(false);
  }
  };
  useEffect(() => {
    patientsData();
  }, [])

  console.log(data);

  return (
    <div className='w-full '>
      {/* {patientsData.map((patient, index) => (
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
      )} */}
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