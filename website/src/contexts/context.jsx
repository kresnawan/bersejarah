import { createContext, useContext } from "react";

export const context = createContext(null);
export const useMyContext = () => useContext(context);