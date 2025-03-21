import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import { showLoadingToast, updateToastToSuccess, updateToastToError } from "../utils/toastifyNotifications";
  


import { authReducer, initialState } from "./authReducer";

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  const login =  async (data) => {
    let toastId;

    dispatch({ type: "LOGIN_START" });
    try {

      toastId = showLoadingToast();

      const user = await api.post("/login", data);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      console.log(user)

      updateToastToSuccess(toastId, "Login exitoso!");
      
      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response?.data?.error || "Error en el login" });
      updateToastToError(toastId, "Error en el login");
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};