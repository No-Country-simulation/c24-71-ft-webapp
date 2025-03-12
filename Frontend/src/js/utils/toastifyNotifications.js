import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Función para mostrar un toast de "loading"
export const showLoadingToast = () => {
    return toast.loading("Cargando...");
  };
  

// Función para actualizar un toast a éxito
export const updateToastToSuccess = (toastId, message = "Operación exitosa") => {
    toast.update(toastId, {
      render: message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeButton: true,
    });
  };
  
  // Función para actualizar un toast a error
  export const updateToastToError = (toastId, message = "Error en la operación") => {
    toast.update(toastId, {
      render: message,
      type: "error",
      isLoading: false,
      autoClose: 3000,
      closeButton: true,
    });
  };