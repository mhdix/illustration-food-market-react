import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext()
const DarkModeContextDispatcher = createContext()


const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <DarkModeContext.Provider value={darkMode}>
            <DarkModeContextDispatcher.Provider value={setDarkMode}>
                {children}
            </DarkModeContextDispatcher.Provider>
        </DarkModeContext.Provider>
    );
}

export default DarkModeProvider;

export const useDarkMode = () => useContext(DarkModeContext)
export const useDarkModeAction = () => useContext(DarkModeContextDispatcher)