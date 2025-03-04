import { useState } from "react";
import "../../../styles/App.css";
import NavBar from "../../component/NavBar";
import SideBar from "../../component/SideBar";
import Modal from "../../component/Modal";

const GameManagement = () => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const games = [
    {
      name: "Juego de Memoria",
      imageUrl:
        "https://img.freepik.com/vector-gratis/tarjetas-juego-memoria-acuarela_23-2150149082.jpg?t=st=1741012500~exp=1741016100~hmac=e2443cd59d7297ce37a571d1f353ad54c8c4d0544e989e55a9365c6d10030d5b&w=900",
      description:
        "Juego de memoria para diagnosticar enfermedades y medir parametros",
    },
    // Other games
    {
      name: "Juego de Cartas",
      imageUrl:
        "https://phantom-telva.unidadeditorial.es/143ecf09966a7d87c251d4507e6535a5/resize/656/f/webp/assets/multimedia/imagenes/2021/08/12/16287613194864.jpg",
      description: "Juego de Cartas para aprender",
    },
    {
      name: "Rompecabezas",
      imageUrl:
        "https://previews.123rf.com/images/corbendallas/corbendallas1812/corbendallas181200106/127216648-9-piezas-de-rompecabezas-de-colores-jigsaw-rompecabezas-de-ilustraci%C3%B3n-vectorial-para-dise%C3%B1o-web.jpg",
      description:
        "Juego de Rompecabezas para ejercitar la capacidad de conectar ideas",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="flex gap-x-10">
        <SideBar />
        <div className="text-black my-10 mx-auto grid gap-12 space-y-10 md:space-y-0 sm:gap-16 lg:grid-cols-3 w-full">
          {/*Grid. Game menu will go here*/}
          {games.map((game) => (
            <div
              key={game.name}
              className="group h-96 w-96 [perspective:1000px]"
            >
              <div className="card-img-top relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/*Card Topper*/}
                <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
                  {/*Front Face*/}
                  {game.imageUrl && (
                    <img
                      className="object-cover cursor-pointer object-left h-full w-full rounded-xl"
                      src={game.imageUrl}
                      alt={game.name}
                      width={320}
                      height={320}
                    ></img>
                  )}
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  {/*Back Face*/}
                  <div className="flex min-h-full flex-col items-center justify-center">
                    <p className="text-lg text-pretty text-center mb-4">
                      {game.description}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {/*Card Footer*/}
                <h1 className="md:my-6 text-2xl flex justify-center">
                  {game.name}
                </h1>
                <h1 className="md:my-6 text-2xl flex justify-center">
                  Prueba Diagnostica
                </h1>
                <div className="flex justify-center">
                  <button
                    className="my-2 bg-yellow-800 hover:bg-yellow-700 text-white font-bold py-2 px-4 w-auto rounded-full inline-flex items-center"
                    onClick={() => setOpen(true)}
                  >
                    <span>Asignar juego</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div> */}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center h-144 w-144">
          <h1>MEMOTEST</h1>
          <div className="grid gap-6 mb-6 md:grid-cols-2 mx-auto my-8 w-auto">
            <div>
              <label htmlFor="first_name" className= "block mb-2 text-sm font-medium text-gray-900 dark:text-black">Pacientes</label>
              <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required></input>
            </div>
            <div>
              <label>Tiempo estimado</label>
              <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="30 segundos" required></input>
            </div>
            <div>
              <label>Numero de Fichas</label>
              <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required></input>
            </div>
            <div>
              <label>Intentos estimados</label>
              <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5" required></input>
            </div>
          </div>

          <div className="flex gap-4 text-black">
            {/* <button className="bg-blue-500 hover:bg-blue-700 rounded w-full">Delete</button> */}
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded w-full"
              onClick={() => setOpen(false)}
            >
              Asignar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GameManagement;
