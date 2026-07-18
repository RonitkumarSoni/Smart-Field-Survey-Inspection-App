import { Stack } from 'expo-router'
import { SurveyProvider } from '../context/SurveyContext'

export default function RootLayout() {
  return (
    <SurveyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </SurveyProvider>
  )
}
