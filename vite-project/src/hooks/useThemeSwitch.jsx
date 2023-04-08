import { useState, useEffect } from "react"

export function useThemeSwitch() {

    const [theme, setTheme] = useState('light')

    // light/dark theme
    // credit to https://www.youtube.com/watch?v=VylXkPy-MIc
    useEffect(() => {
        if(theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    },[theme])

    function handleThemeSwitch() {
        setTheme(theme === 'dark'? 'light' : 'dark')
    }

    return [theme, setTheme, handleThemeSwitch]


}