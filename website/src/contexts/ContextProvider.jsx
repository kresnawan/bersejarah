import { useState } from "react";
import { context } from "./context.jsx";

function ContextProvider({ children }) {

    const [ticker, setTicker] = useState(0);
    const [ticker2, setTicker2] = useState(0);

    const [latFocus, setLatFocus] = useState(0);
    const [longFocus, setLongFocus] = useState(0);

    const [markerFocus, setMarkerFocus] = useState(0);
    const [theme, setTheme] = useState("dark");

    return (
        <context.Provider value={{
            theme, setTheme, 
            markerFocus, setMarkerFocus,
            ticker, setTicker,
            ticker2, setTicker2,
            latFocus, setLatFocus,
            longFocus, setLongFocus
            }}>
            {children}
        </context.Provider>
    )
}

export default ContextProvider;