import React from "react";
import { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";

const AddPatient = () => {
    const [openPopUp, setOpenPopUp] = useState(false);

    const [values, setValues] = useState({
        //Save form data
        name: "",
        dni: "",
        age: "",
        email: "",
        diagnosis: "",
    });

    const handleOnChange = (event) => {
        //set form data with onChange event
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        //Handle form values
        event.preventDefault();
        console.log(values);
    };

    return (
        <div className="grid grid-cols-[0.7fr_0.8fr]">
            <button
                onClick={() => setOpenPopUp(true)}
                className="bg-[#4E5C82] w-full h-[69px] rounded-[8px] flex justify-center items-center hover:bg-[#65749e] transform active:translate-y-[2px] transition-all duration-300"
            >
                <MdPersonAdd size="33px" color="#ECE5DE" />
            </button>

            {/* pop up Add Patient */}
            {openPopUp && (
                <div className="grid fixed top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/2 w-full max-w-[750px] h-[560px] bg-[#4E5C82] text-white rounded-xl p-8 z-50">
                    <div className="flex justify-between">
                        <h2 className="text-2xl pb-10 pt-4 mx-auto">
                            Agregar Paciente
                        </h2>
                        <button
                            onClick={() => setOpenPopUp(false)}
                            className="self-start"
                        >
                            <FaRegWindowClose size={24} />
                        </button>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-[1.2fr_1.3fr_0.5fr_1.3fr] grid-rows-[0.5fr_0.5fr_1fr_0.5fr] gap-4"
                    >
                        <div className="grid col-span-2 content-center">
                            <label htmlFor="name">Nombre y Apellido:</label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                placeholder="José Peréz"
                                maxLength="20"
                                required
                                onChange={handleOnChange}
                                className="bg-[#EEEEEE] col-start-2 max-w-[200px] h-[40px] p-2 placeholder-[#939191] text-[#616060]"
                            />
                        </div>
                        <div className="grid col-span-2 content-center">
                            <label htmlFor="dni" className="">
                                DNI:
                            </label>
                            <input
                                type="number"
                                name="dni"
                                value={values.dni}
                                placeholder="11.111.111"
                                required
                                onChange={handleOnChange}
                                className="bg-[#EEEEEE] col-start-4 max-w-[200px] h-[40px] p-2 placeholder-[#939191] text-[#616060]"
                            />
                        </div>
                        <div className="grid col-span-2 content-center">
                            <label htmlFor="age" className="">
                                Edad:
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={values.age}
                                placeholder="99"
                                required
                                min="1"
                                max="99"
                                onChange={handleOnChange}
                                className="bg-[#EEEEEE] col-start-2 max-w-[200px] h-[40px] p-2 placeholder-[#939191] text-[#616060]"
                            />
                        </div>
                        <div className="grid col-span-2 content-center">
                            <label htmlFor="email" className="">
                                E-mail:
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                placeholder="joseperez@gmail.com"
                                required
                                onChange={handleOnChange}
                                className="bg-[#EEEEEE] col-start-4 max-w-[200px] h-[40px] p-2 placeholder-[#939191] text-[#616060]"
                            />
                        </div>
                        <div className="col-span-4">
                            <label htmlFor="diagnosis" className="">
                                Diagnóstico:
                            </label>
                            <textarea
                                type="text"
                                name="diagnosis"
                                value={values.diagnosis}
                                placeholder="Escriba aquí"
                                onChange={handleOnChange}
                                className="bg-[#EEEEEE] w-full h-[100px] mt-2 p-2 placeholder-[#939191] text-[#616060]"
                            />
                        </div>
                        <div className="col-span-4 justify-self-center content-center">
                            <button
                                typeof="submit"
                                className="bg-[#4E5C82] p-2 border border-[#ECE5DE] rounded-[8px] hover:bg-[#65749e] transform active:translate-y-[2px] transition-all duration-300"
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddPatient;
