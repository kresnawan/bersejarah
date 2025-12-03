import authContext from "./auth";
import { useState } from "react";

export default function AuthContextProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <authContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </authContext.Provider>
  )
}
