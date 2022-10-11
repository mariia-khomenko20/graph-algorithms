import { createContext, useContext } from "react";
import useData from "../hook";

export const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }) {
  return (
    <AppContext.Provider value={useData()}>{children}</AppContext.Provider>
  );
}
