import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const themeColors = {
  light: {
    primary: '#007BFF',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#333333',
    textMuted: '#666666',
    border: '#e0e0e0',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    inputBg: '#ffffff',
    headerBg: '#007BFF',
    headerText: '#ffffff',
    divider: '#e0e0e0',
    drawerBg: '#f4f6f8',
    drawerActiveBg: '#e6f0ff',
    shadow: 'rgba(0,0,0,0.05)',
    tabBarBg: '#ffffff',
  },
  dark: {
    primary: '#ffffff',
    background: '#121212',
    card: 'rgba(255, 255, 255, 0.06)',
    text: '#ffffff',
    textMuted: '#8e8e93',
    border: 'rgba(255, 255, 255, 0.1)',
    success: '#2e7d32', 
    danger: '#c62828', 
    warning: '#f9a825', 
    inputBg: 'rgba(255, 255, 255, 0.04)',
    headerBg: '#1a1a1a',
    headerText: '#ffffff',
    divider: 'rgba(255, 255, 255, 0.1)',
    drawerBg: '#121212',
    drawerActiveBg: 'rgba(255, 255, 255, 0.08)',
    shadow: 'rgba(0,0,0,0.5)',
    tabBarBg: '#1a1a1a',
  }
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  const activeColors = darkMode ? themeColors.dark : themeColors.light

  return (
    <ThemeContext.Provider value={{
      darkMode,
      setDarkMode,
      toggleTheme,
      colors: activeColors
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
