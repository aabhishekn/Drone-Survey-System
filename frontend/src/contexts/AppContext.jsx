import { createContext, useContext, useReducer } from "react";

const AppContext = createContext(null);

const initialState = {
  drones: [],
  missions: [],
  selectedDrone: null,
  loading: false,
  errors: [],
  notifications: [],
  currentMission: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_DRONES":
      return { ...state, drones: action.payload };
    case "SET_MISSIONS":
      return { ...state, missions: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CURRENT_MISSION":
      return { ...state, currentMission: action.payload };
    case "ADD_ERROR":
      return { ...state, errors: [...state.errors, action.payload] };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "CLEAR_ERRORS":
      return { ...state, errors: [] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
