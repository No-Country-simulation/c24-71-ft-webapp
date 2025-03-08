
export const Home = () => {
  return (
   <div className="flex flex-col p-15 " >

        

    <div className="max-w-screen-xl mb-10 bg-white border border-gray-200 rounded-lg shadow-sm p-5">
 
        <div className="w-full grid-cols-1 sm:grid md:grid-cols-4 gap-4 p-2 mx-auto text-gray-900  sm:p-8">
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">100 Mes</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Total Partidas Pendientes</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">100 Mes</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Total Partidas Finalizadas</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">1000 Mes</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Total Pacientes Activos</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">200 Mes</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Total Partidas Activas</dd>
                </div>
        </div>
    </div>

 <div>
    <h2 className="text-xl font-semibold mb-5 text-[#2d3147]">
            Ultimos juegos asignados
    </h2>
   
 </div>
<div className="relative w-full  text-gray-700 bg-white shadow-md rounded-lg bg-clip-border max-w-screen-xl">
   
   

    <table className="w-full text-left table-auto  text-slate-800">
    <thead>
        <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
        <th className="p-4">
            <p className="text-m leading-none font-normal">
            Nombre Paciente
            </p>
        </th>
        <th className="p-4">
            <p className="text-m leading-none font-normal">
            Juego Asignado
            </p>
        </th>
        <th className="p-4">
            <p className="text-m leading-none font-normal">
            Fecha Asignación
            </p>
        </th>
        <th className="p-4">
            <p className="text-m leading-none font-normal">
            Estado
            </p>
        </th>
        <th className="p-4">
            <p className="text-m leading-none font-normal">
            Resultado
            </p>
        </th>       
        </tr>
    </thead>
    <tbody>
        <tr className="hover:bg-slate-50">
        <td className="p-4">
            <p className="text-m font-bold">
            Project Alpha
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            01/01/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            30/06/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            John Michael
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            $50,000
            </p>
        </td>
       
        </tr>
        <tr className="hover:bg-slate-50">
        <td className="p-4">
            <p className="text-m font-bold">
            Beta Campaign
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            15/02/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            15/08/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            Alexa Liras
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            $75,000
            </p>
        </td>
       
        </tr>
        <tr className="hover:bg-slate-50">
        <td className="p-4">
            <p className="text-m font-bold">
            Campaign Delta
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            01/03/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            01/09/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            Laurent Perrier
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            $60,000
            </p>
        </td>
      
        </tr>
        <tr className="hover:bg-slate-50">
        <td className="p-4">
            <p className="text-m font-bold">
            Gamma Outreach
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            10/04/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            10/10/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            Michael Levi
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            $80,000
            </p>
        </td>
       
        </tr>
        <tr className="hover:bg-slate-50">
        <td className="p-4">
            <p className="text-m font-bold">
            Omega Strategy
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            01/05/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            01/11/2024
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            Richard Gran
            </p>
        </td>
        <td className="p-4">
            <p className="text-m">
            $100,000
            </p>
        </td>       
        </tr>
    </tbody>
    </table>
</div>

   
   
   
   </div>
   

  )
}
