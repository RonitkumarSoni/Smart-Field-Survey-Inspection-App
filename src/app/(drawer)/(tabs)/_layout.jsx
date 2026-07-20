import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../../context/ThemeContext'
import { Platform } from 'react-native'

export default function TabsLayout() {
  const { colors, darkMode } = useTheme()

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.3,
      },
      tabBarStyle: {
        backgroundColor: colors.tabBarBg,
        borderTopWidth: 0,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 24 : 16,
        left: 16,
        right: 16,
        height: 64,
        borderRadius: 20,
        elevation: 8,
        shadowColor: darkMode ? '#000' : '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: darkMode ? 0.4 : 0.15,
        shadowRadius: 12,
        paddingBottom: Platform.OS === 'ios' ? 0 : 8,
        paddingTop: 8,
        borderWidth: darkMode ? 1 : 0,
        borderColor: colors.border,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="survey"
        options={{
          title: 'New Survey',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'time' : 'time-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
