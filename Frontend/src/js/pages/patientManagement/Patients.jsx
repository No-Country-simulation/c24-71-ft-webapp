import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import api from '../../api/axiosConfig.js';
import { FaRegClipboard } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import AddPatient from './AddPatient';

const Patients = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("");
  //Connecting Patients data from api
  const patientsData = async () => {
    try{
      const response = await api.get('/patients');
      setData(response.data.content);
    } catch (error){
      setError(error.response?.data?.error ?? "Hubo un error al cargar la lista de pacientes.");
    } finally {
    setLoading(false);
  }
  };
  useEffect(() => {
    patientsData();
  }, [])

  //Add new Patient

  const newPatients = (newPatient) => {
    setData((prevData) => [...prevData, newPatient]);
  }

  // Search

  const searcher = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  }
  //Search Filter
  const result = !search ? data : data.filter((patient)=> patient.name.toLowerCase().includes(search.toLowerCase()));


  return (
    <div className='w-full'>
      {/* Searcher */}
    <div className='text-black grid grid-cols-[0.32fr_2fr_0.15fr_0.1fr_0.7fr_0fr] grid-rows-[1fr_1fr_1fr] w-full '>
			<input value={search} onChange={searcher} type='search' placeholder='Buscar...' className='bg-[#EEEEEE] w-full h-[67px] col-start-2 row-start-2 col-span-1 border-solid first:border-r-0 border-1 border-[#A69487] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-4 focus:outline-none' />
			<div className='bg-[#EEEEEE] w-full h-[67px] col-start-3 row-start-2 col-span-1 border-solid border-1 border-[#A69487] last:border-l-0 mr-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-center items-center'>
        <MdSearch size='23px' />
      </div>
      <div className='col-start-5 row-start-2'>
        <AddPatient addData={newPatients}/> {/*Add patient button / popup */}
    </div>
    </div>
    {/* Show Patients table */}
      <div className='grid grid-cols-[0.17fr_1.4fr_0.2fr]'>
      <table className='w-full col-start-2 border border-[#939191] border-collapse'>
        <thead className='bg-[#EEEEEE] border-b-4 border-gray-300 text-[#3F4B6E] text-xl'>
          <tr>
            <th className='p-3 text-left font-semibold'>DNI</th>
            <th className='p-3 text-left font-semibold'>Nombre y Apellido</th>
            <th className='p-3 text-left font-semibold'>Edad</th>
            <th className='p-3 text-left font-semibold'>Email</th>
            <th className='p-3 text-left font-semibold'>Acciones</th>
          </tr>
        </thead>
        {result.map((patient, index) => (
        <tbody key={index} className={`bg-[#f0f0f0] h-[44px]  border-solid border-[#939191] ${index === 0 ? "border-t-0" : "border-t"} content-center`}>
          <tr className='text-[#4E5C82] text-xl'>
            <th className='p-3 text-left font-normal'>{patient.dni}</th>
            <th className='p-3 text-left font-normal'>{patient.name}</th>
            <th className='p-3 text-left font-normal'>{patient.age}</th>
            <th className='p-3 text-left font-normal'>{patient.email}</th>
            <th className='p-3 flex gap-4 justify-start pl-6'>
            <MdEdit className='cursor-pointer' color='#2D3147'/>
            <FaRegClipboard className='cursor-pointer'  color='#2D3147'/>
            </th>
          </tr>
        </tbody>
          )
          )}
      </table>
      </div>
    </div>
  )
}
export default Patients;
