import { useEffect, useReducer } from "react";

const initialState = (initialTime) => ({
    time: initialTime ?? 0,
    running: false,
    countdown: initialTime !== undefined, // Indica si es cuenta regresiva
});

const timerReducer = (state, action) => {
    switch (action.type) {
        case "START":
            return { ...state, running: true };
        case "PAUSE":
            return { ...state, running: false };
        case "RESET":
            return initialState(action.payload);
        case "TICK":
            return {
                ...state,
                time: state.countdown ? Math.max(state.time - 1, 0) : state.time + 1,
                running: state.countdown && state.time <= 1 ? false : state.running,
            };
        default:
            return state;
    }
};

const useGameTimer = (initialTime) => {
    const [state, dispatch] = useReducer(timerReducer, initialTime, initialState);

    useEffect(() => {
        if (!state.running) return;
        const interval = setInterval(() => dispatch({ type: "TICK" }), 1000);
        return () => clearInterval(interval);
    }, [state.running]);

    return {
        start: () => dispatch({ type: "START" }),
        pause: () => dispatch({ type: "PAUSE" }),
        reset: () => dispatch({ type: "RESET", payload: initialTime }),
        time: state.time,
        running: state.running,
    };
};

export default useGameTimer;
