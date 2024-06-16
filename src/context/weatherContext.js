import { createContext,useContext, useState } from "react";

const WeatherContext = createContext(null);

export const useWeather = () => {
    return useContext(WeatherContext)
}

export const WeatherProvider = (props) => {
    const [darkMode, setDarkMode] = useState(false)
    const [background, setBackground] = useState('light')

    const onChangeMode = () =>{
        setDarkMode(!darkMode)
        darkMode ? setBackground('dark') : setBackground('light')
    }

    return(
        <WeatherContext.Provider value={{darkMode, background, onChangeMode}}>
            {props.children}
        </WeatherContext.Provider>
    )
}