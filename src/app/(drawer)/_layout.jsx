import { Drawer } from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{
      headerShown: false,
      drawerActiveTintColor: '#007BFF',
      drawerInactiveTintColor: '#666',
      drawerStyle: {
        backgroundColor: 'white',
      },
    }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="camera"
        options={{
          drawerLabel: 'Camera',
          title: 'Camera',
          drawerIcon: ({ color }) => <Ionicons name="camera-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          drawerLabel: 'Contacts',
          title: 'Contacts',
          drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="location"
        options={{
          drawerLabel: 'Location',
          title: 'Location',
          drawerIcon: ({ color }) => <Ionicons name="location-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="clipboard"
        options={{
          drawerLabel: 'Clipboard',
          title: 'Clipboard',
          drawerIcon: ({ color }) => <Ionicons name="clipboard-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="preview"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Preview',
        }}
      />
    </Drawer>
  )
}
