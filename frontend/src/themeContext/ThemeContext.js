import React, {useState, useContext} from 'react'

const ThemeContextvalue = React.createContext()
const ThemeContextUpdate = React.createContext()

export function useTheme(){
    return useContext(ThemeContextvalue)
}

export function useThemeUpdate(){
    return useContext(ThemeContextUpdate)
}

function ThemeContext({children}) {
    const [darkTheme, setDarkTheme] = useState(false)
    function toggleTheme(){
        setDarkTheme(prevDarkTheme => !prevDarkTheme)
    }
  return (
    <ThemeContextvalue.Provider value={darkTheme}>
        <ThemeContextUpdate.Provider value={toggleTheme}>
            {children}
        </ThemeContextUpdate.Provider>
    </ThemeContextvalue.Provider>
  )
}

export default ThemeContext