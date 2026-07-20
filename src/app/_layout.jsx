import { useEffect } from 'react'
import { Stack, useRouter, useSegments } from 'expo-router'
import { SurveyProvider } from '../context/SurveyContext'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { StatusBar } from 'expo-status-bar'
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper'
import { View } from 'react-native'

function AuthGuard({ children }) {
  const { user, isLoading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    const inAuthGroup = segments[0] === '(auth)'

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login')
    } else if (user && inAuthGroup) {
      // Redirect to dashboard if authenticated
      router.replace('/(drawer)')
    }
  }, [user, isLoading, segments, router])

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: '#0A0A0F' }} />
  }

  return children
}

function AppContent() {
  const { darkMode, colors } = useTheme()
  
  const paperTheme = darkMode ? {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: colors.primary,
      secondary: colors.accent,
      background: colors.background,
      surface: colors.surface,
      surfaceVariant: colors.card,
      onSurface: colors.text,
      onSurfaceVariant: colors.textSecondary,
      outline: colors.border,
      error: colors.danger,
    },
    roundness: 12,
  } : {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: colors.primary,
      secondary: colors.accent,
      background: colors.background,
      surface: colors.surface,
      surfaceVariant: colors.card,
      onSurface: colors.text,
      onSurfaceVariant: colors.textSecondary,
      outline: colors.border,
      error: colors.danger,
    },
    roundness: 12,
  }

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(drawer)" />
        </Stack>
      </AuthGuard>
    </PaperProvider>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SurveyProvider>
          <AppContent />
        </SurveyProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
