import { Stack } from 'expo-router'
import { SurveyProvider } from '../context/SurveyContext'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import { StatusBar } from 'expo-status-bar'

function AppContent() {
  const { darkMode } = useTheme()
  return (
    <>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </>
  )
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SurveyProvider>
        <AppContent />
      </SurveyProvider>
    </ThemeProvider>
  )
}
