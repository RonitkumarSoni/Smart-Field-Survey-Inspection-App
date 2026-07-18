import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { students } from '../../data/students'

import { usePathname } from 'expo-router'

function CustomDrawerContent(props) {
  const student = students[0]
  const pathname = usePathname() || ''

  // Determine active state based on the current pathname
  const isDashboard = pathname === '/' || pathname === '/(drawer)/(tabs)' || pathname.includes('/index')
  const isSurvey = pathname.includes('/survey')
  const isCamera = pathname.includes('/camera')
  const isContact = pathname.includes('/contact')
  const isLocation = pathname.includes('/location')
  const isClipboard = pathname.includes('/clipboard')
  const isSettings = pathname.includes('/settings')

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{student.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View>
          <Text style={styles.username}>{student.name}</Text>
          <Text style={styles.userSub}>{student.course} • {student.year}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Navigation Items */}
      <View style={styles.menuContainer}>
        <DrawerItem
          label="Dashboard"
          focused={isDashboard}
          activeTintColor="#007BFF"
          inactiveTintColor="#666"
          icon={({ color, size }) => <Ionicons name="home-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('(tabs)', { screen: 'index' })}
          labelStyle={styles.drawerLabel}
        />

        <DrawerItem
          label="Survey"
          focused={isSurvey}
          activeTintColor="#007BFF"
          inactiveTintColor="#666"
          icon={({ color, size }) => <Ionicons name="create-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('(tabs)', { screen: 'survey' })}
          labelStyle={styles.drawerLabel}
        />

        <DrawerItem
          label="Camera"
          focused={isCamera}
          activeTintColor="#007BFF"
          inactiveTintColor="#666"
          icon={({ color, size }) => <Ionicons name="camera-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('camera')}
          labelStyle={styles.drawerLabel}
        />

        <DrawerItem
          label="Contacts"
          focused={isContact}
          activeTintColor="#007BFF"
          inactiveTintColor="#666"
          icon={({ color, size }) => <Ionicons name="people-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('contact')}
          labelStyle={styles.drawerLabel}
        />

        <DrawerItem
          label="Location"
          focused={isLocation}
          activeTintColor="#007BFF"
          inactiveTintColor="#666"
          icon={({ color, size }) => <Ionicons name="location-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('location')}
          labelStyle={styles.drawerLabel}
        />

        <DrawerItem
          label="Clipboard"
          focused={isClipboard}
          activeTintColor="#007BFF"
          inactiveTintColor="#666"
          icon={({ color, size }) => <Ionicons name="clipboard-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('clipboard')}
          labelStyle={styles.drawerLabel}
        />

        <DrawerItem
          label="Settings"
          focused={isSettings}
          activeTintColor="#007BFF"
          inactiveTintColor="#666"
          icon={({ color, size }) => <Ionicons name="settings-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('settings')}
          labelStyle={styles.drawerLabel}
        />
      </View>
    </DrawerContentScrollView>
  )
}

export default function DrawerLayout() {
  return (
    <Drawer 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#f4f6f8',
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="camera" options={{ title: 'Camera' }} />
      <Drawer.Screen name="contact" options={{ title: 'Contacts' }} />
      <Drawer.Screen name="location" options={{ title: 'Location' }} />
      <Drawer.Screen name="clipboard" options={{ title: 'Clipboard' }} />
      <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
      <Drawer.Screen name="preview" options={{ title: 'Preview', drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="edit" options={{ title: 'Edit Survey', drawerItemStyle: { display: 'none' } }} />
    </Drawer>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    paddingTop: 0,
  },
  header: {
    backgroundColor: '#f4f6f8', // Matches drawerStyle backgroundColor
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#007BFF', // Inverted avatar colors for contrast
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    color: '#333',
    fontSize: 17,
    fontWeight: 'bold',
  },
  userSub: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  menuContainer: {
    paddingHorizontal: 10,
  },
  drawerLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: -10,
  },
})
