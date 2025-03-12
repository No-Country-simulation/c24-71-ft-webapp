export const initialState = {
    sessions: [],
    loading: false,
    error: null,
  };
  
  export const gameSessionsReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_START":
        return { ...state, loading: true, error: null };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, sessions: action.payload };
      case "FETCH_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };