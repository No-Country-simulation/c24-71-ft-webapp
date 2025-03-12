import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [ "#4e5c82", "#ECE5DE", "#2196F3", "#E91E63"];

const DashboardCard = ({ title, value, total }) => {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0; // Calcula el porcentaje
  const data = [
    { name: title, value },
    { name: "Resto", value: total - value }, // Para completar el 100%
  ];

  return (
    <div className="grid bg-white shadow-lg rounded-2xl p-4 w-full  text-center">
        <div className="grid grid-cols-2 items-center gap-4 w-full " >            
                <div className="flex justify-center  basis-1/3">
                    <PieChart width={125} height={125}>
                    <Pie
                        
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {/* Capa para el porcentaje dentro del círculo */}
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-lg font-bold fill-gray-700"
                    >
                        {percentage}%
                    </text>
                    <Tooltip />
                    </PieChart>
                </div>
            <div className="flex flex-col items-start content-start basis-3/3">                
                <h3 className="text-5xl font-bold  text-[#4e5c82]">{value}</h3>
                <p className=" text-base text-left  font-semibold text-gray-900">{title} </p>
            </div>
           
        </div>     
    </div>
  );
};

export default DashboardCard;