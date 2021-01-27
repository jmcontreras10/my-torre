//  Imports
//  React
import { useContext, createContext, useState, useEffect } from "react";

//  Contexts
const ScreenContext = createContext();
const LoadingContext = createContext();

export const useScreenContext = () => {
  return useContext(ScreenContext);
};

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};

export const ScreenProvider = ({ children }) => {
  const [screen, setScreen] = useState(0);
  const [globalLoading, setGlobalLoading] = useState(false);
  //  Initial state
  //  [0: auth, 1: Home]
  useEffect(() => {
    setScreen(sessionStorage.getItem("JWTtorreJobsToken") ? 1 : 0);
  }, []);

  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      <LoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
        {children}
      </LoadingContext.Provider>
    </ScreenContext.Provider>
  );
};
