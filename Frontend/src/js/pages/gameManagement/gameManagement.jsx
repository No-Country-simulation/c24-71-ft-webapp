import React, { useState, useEffect } from "react";
import "../../../styles/App.css";
import Modal from "../../component/Modal";
import { useNavigate, Link } from "react-router";
import api from "../../api/axiosConfig";

const GameManagement = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [open, setOpen] = useState(false);

    const listOfGames = async () => {
        try {
            const response = await api.get(`/board-games`);
            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            setError(
                error.response?.data?.error || "No se pudo cargar los juegos"
            );
        } finally {
            setLoading(false);
        }
    };
    console.log(error)
    console.log(listOfGames())

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
            <div className="text-black p-5 my-10 mx-auto grid gap-6 space-y-10 md:space-y-0 sm:gap-6 lg:grid-cols-3 w-full">
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
                                    className="my-2 bg-[#4E5C82] hover:bg-red-700 text-white font-bold py-2 px-4 w-auto rounded-full inline-flex items-center"
                                    onClick={() => setOpen(true)}
                                >
                                    <span>Asignar juego</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal starts here */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="bg-[#4E5C82] text-center h-144 w-144 text-white">
                    <h1>MEMOTEST</h1>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 mx-auto my-8 w-auto">
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 text-white"
                            >
                                Pacientes
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                className="text-sm rounded-lg w-full p-2.5 bg-white text-black"
                                placeholder="Juan Herrera"
                                required
                            ></input>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-white">
                                Tiempo estimado
                            </label>
                            <input
                                type="number"
                                className="text-sm rounded-lg w-full p-2.5 bg-white text-black"
                                placeholder="30 segundos"
                                required
                            ></input>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-white">
                                Numero de Fichas
                            </label>
                            <input
                                type="number"
                                className="text-sm rounded-lg w-full p-2.5 bg-white text-black"
                                placeholder="10"
                                required
                            ></input>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-white">
                                Intentos estimados
                            </label>
                            <input
                                type="number"
                                className="text-sm rounded-lg w-full p-2.5 bg-white text-black"
                                placeholder="5"
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="flex gap-4 text-white">
                        <button
                            className="border-2 border-white bg-#4E5C82 hover:bg-blue-700 rounded-xl w-full p-4"
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
