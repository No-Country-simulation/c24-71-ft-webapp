import React, { useState, useEffect } from "react";
import "../../../styles/App.css";
import Modal from "../../component/Modal";
import { useNavigate, Link } from "react-router";
import api from "../../api/axiosConfig";
import { formatCategory } from "../../utils/generalUtils";
import { useForm } from "react-hook-form";
import SearchBarPatient from "../../component/SearchBarPatient.jsx";
import { showLoadingToast, updateToastToSuccess, updateToastToError } from "../../utils/toastifyNotifications.js";

const GameManagement = () => {
    const [dataGame, setDataGame] = useState(null);
    const [dataPatient, setDataPatient] = useState([])
    const [selectedItem, setSelectedPatient] = useState(null)
    const [selectedGame, setSelectedGame] = useState(null)
    const [isListOpen, setIsListOpen] = useState(false)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // To open and close de "Asign Game" Modal
    const [open, setOpen] = useState(false);
    
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
        
    } = useForm();
    

    // Get the list of games from the API
    const listOfGames = async () => {
        let toastId;
        toastId = showLoadingToast();
        try {
            const response = await api.get(`/board-games`);
            updateToastToSuccess(toastId, "Juegos cargados!");
            setDataGame(response.data);
        } catch (error) {
            setError(
                error.response?.data?.error || "No se pudo cargar los juegos"
            );
            updateToastToError(toastId, error.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    // Get the patient list from the API and handle the search. Returns an Array.

    const handleSearchPatientList = async (patientName) => {
        try{
            const response = await api.get(`/patients`)
            const resultFilter = response.data.content.filter((patient) => {
                return patientName && patient && patient.name && patient.name.toLowerCase().includes(patientName)
            });
            setIsListOpen(true)
            setDataPatient(resultFilter)
        } catch (error) {
            setError(error.response?.data?.error || "No se pudo cargar la lista de pacientes")
        } finally {
            setLoading(false);
        }
    }

    //Post the game data to the API

    const sendGameDataToApi = async (dataGameCreation) => {
        let toastId;
        toastId = showLoadingToast();
        try {
            const response = await api.post('/game-sessions/create', dataGameCreation)
            updateToastToSuccess(toastId, "Sesion creada!");
            setOpen(false)
            console.log(response)
        } catch (error) {
            setError(error.response?.data?.error) || "No se pudo enviar los datos a la API"
            updateToastToError(toastId, error.response?.data?.error);
        } finally {
            setLoading(false)
        }
    };


    // Handle to select the game ID from the Data fetched from the API

    const handleSelectGame = (game) => {
        setOpen(true)
        setSelectedGame(game)
        setValue("gameId", game)
    }

    // Handle to click and select a patient based from the Array got at handleSearchPatientList(). PatiendId field modifified in DataGameCreation

    const handlePatientClick = (item) => {
        console.log(item)
        setSelectedPatient(item); // Almacenar el elemento seleccionado en el estado
        setValue("patientId", item.idPatient); // Registrar el valor seleccionado en el formulario
        setIsListOpen(false) // Cerrar la lista después de seleccionar un paciente
      };

      console.log(selectedItem)
    // Function to collect and submit the data to the API

    const onSubmit = (dataGameCreation) => {
        console.log(dataGameCreation)
        sendGameDataToApi(dataGameCreation)

        //Clean form fields
        reset({
            gameId: "",
            patientId: "",
            estimated_time: "",
            game_chips: "",
            estimated_attempts: "",
        });

        setSelectedPatient(null);
        setDataPatient([]); // Limpiar los resultados de la búsqueda
        setIsListOpen(false); // Ocultar la lista de resultados

    };

    const handleCloseModal = () => {
        setOpen(false); // Cerrar el modal
        setDataPatient([]); // Limpiar los resultados de la búsqueda
        setIsListOpen(false); // Ocultar la lista de resultados
    };


    useEffect(() => {
      listOfGames()
    }, []);

    
    return (
        <div>
            <div className="text-black p-5 my-10 mx-auto grid gap-6 space-y-10 md:space-y-0 sm:gap-6 lg:grid-cols-3 w-full">
                {/*Grid. Game menu will go here*/}
                {dataGame && dataGame.map((game) => (
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
                                 {formatCategory(game.category)}
                            </h1>
                            <div className="flex justify-center">
                                < >
                                <button
                                    className="my-2 bg-[#4E5C82] hover:bg-red-700 text-white font-bold py-2 px-4 w-auto rounded-full inline-flex items-center"
                                    onClick={() => handleSelectGame(game.id)}
                                >  
                                
                                    <span>Asignar juego</span>
                                </button>
                                </>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal starts here */}
            <Modal open={open} onClose={handleCloseModal}>
                <div className="bg-[#4E5C82] text-center h-144 w-144 text-white">
                    <h1>NEXCOGNITIVE</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                    <input type="hidden" {...register("gameId")}></input>
                    
                    <div className="grid gap-6 mb-6 md:grid-cols-2 mx-auto my-8 w-auto">
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 text-white"
                            >
                                Pacientes
                            </label>
                            <SearchBarPatient onSearchPatient={handleSearchPatientList} resetSearch={!open} displaySelectedName={selectedItem ? selectedItem.name : ""}></SearchBarPatient>
                            <input type="hidden" {...register("patientId")} />
                            
                            {isListOpen && dataPatient.length > 0 && (
                            <ul className="text-black absolute z-10 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
                            {dataPatient.map((item) => (
                            <li key={item.id} onClick={() => handlePatientClick(item)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors">{item.name}</li>
                                ))}
                            </ul>
                            )}
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
                                {...register('estimated_time', {required: true})}
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
                                {...register('game_chips', {required: true})}
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
                                {...register('estimated_attempts', {required: true})}
                            ></input>
                        </div>
                    </div>

                    <div className="flex gap-4 text-white">
                        <button
                            className="border-2 border-white bg-#4E5C82 hover:bg-blue-700 rounded-xl w-full p-4"
                            type = 'submit'
                            
                        >
                            Asignar
                        </button>
                    </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default GameManagement;
