import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

  const login =  (name= '') => {
    dispatch({ type: "LOGIN_START" });
    try {
      const user = { id: 'ABC', name: name };
      dispatch({ type: "LOGIN_SUCCESS", payload: user });      
      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response?.data?.message || "Error en el login" });
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