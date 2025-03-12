export const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  };


  export const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return { ...state, loading: true, error: null };
      case "LOGIN_SUCCESS":
        return { user: action.payload, loading: false, error: null };
      case "LOGIN_FAILURE":
        return { ...state, loading: false, error: action.payload };
      case "LOGOUT":
        return { user: null, loading: false, error: null };
      default:
        return state;
    }
  };