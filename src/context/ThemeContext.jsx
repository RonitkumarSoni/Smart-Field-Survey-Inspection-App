import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const themeColors = {
  light: {
    primary: '#4F46E5',
    primaryLight: '#818CF8',
    primaryDark: '#3730A3',
    accent: '#7C3AED',
    background: '#F8F9FC',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1E1B4B',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    success: '#059669',
    successLight: '#D1FAE5',
    danger: '#DC2626',
    dangerLight: '#FEE2E2',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    inputBg: '#FFFFFF',
    headerBg: '#4F46E5',
    headerText: '#FFFFFF',
    divider: '#E5E7EB',
    drawerBg: '#FFFFFF',
    drawerActiveBg: '#EEF2FF',
    shadow: 'rgba(0,0,0,0.08)',
    tabBarBg: '#FFFFFF',
    gradient: ['#4F46E5', '#7C3AED'],
    cardBorder: '#E5E7EB',
    surfaceElevated: '#FFFFFF',
    chipBg: '#EEF2FF',
    chipText: '#4F46E5',
    statusDraft: '#F59E0B',
    statusSubmitted: '#059669',
    overlay: 'rgba(0,0,0,0.5)',
  },
  dark: {
    primary: '#818CF8',
    primaryLight: '#A5B4FC',
    primaryDark: '#6366F1',
    accent: '#A78BFA',
    background: '#0A0A0F',
    surface: '#12121F',
    card: '#16162A',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#1E293B',
    borderLight: '#1E2340',
    success: '#34D399',
    successLight: 'rgba(52, 211, 153, 0.15)',
    danger: '#F87171',
    dangerLight: 'rgba(248, 113, 113, 0.15)',
    warning: '#FBBF24',
    warningLight: 'rgba(251, 191, 36, 0.15)',
    inputBg: '#1A1A2E',
    headerBg: '#12121F',
    headerText: '#F1F5F9',
    divider: '#1E293B',
    drawerBg: '#0A0A0F',
    drawerActiveBg: 'rgba(129, 140, 248, 0.12)',
    shadow: 'rgba(0,0,0,0.6)',
    tabBarBg: '#12121F',
    gradient: ['#4F46E5', '#7C3AED'],
    cardBorder: '#1E293B',
    surfaceElevated: '#1A1A2E',
    chipBg: 'rgba(129, 140, 248, 0.15)',
    chipText: '#A5B4FC',
    statusDraft: '#FBBF24',
    statusSubmitted: '#34D399',
    overlay: 'rgba(0,0,0,0.7)',
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
