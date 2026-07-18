import React from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { students } from '../../data/students'
import { useTheme } from '../../context/ThemeContext'

import { usePathname } from 'expo-router'

function CustomDrawerContent(props) {
  const student = students[0]
  const pathname = usePathname() || ''
  const { darkMode, toggleTheme, colors } = useTheme()

  const isDashboard = pathname === '/' || pathname === '/(drawer)/(tabs)' || pathname.includes('/index')
  const isSurvey = pathname.includes('/survey')
  const isCamera = pathname.includes('/camera')
  const isContact = pathname.includes('/contact')
  const isLocation = pathname.includes('/location')
  const isClipboard = pathname.includes('/clipboard')
  const isSettings = pathname.includes('/settings')

  return (
    <DrawerContentScrollView 
      {...props} 
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[styles.drawerContainer, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={[styles.avatarText, { color: darkMode ? colors.background : 'white' }]}>{student.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View>
          <Text style={[styles.username, { color: colors.text }]}>{student.name}</Text>
          <Text style={[styles.userSub, { color: colors.textMuted }]}>{student.course} • {student.year}</Text>
        </View>
      </View>

      <View style={[styles.toggleSection, { borderColor: colors.border }]}>
        <View style={styles.toggleRow}>
          <Ionicons name={darkMode ? "moon" : "sunny"} size={20} color={colors.primary} />
          <Text style={[styles.toggleText, { color: colors.text }]}>Dark Mode</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.menuContainer}>
        <DrawerItem
          label="Dashboard"
          focused={isDashboard}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          activeBackgroundColor={colors.drawerActiveBg}
          icon={({ color, size }) => <Ionicons name="home-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('(tabs)', { screen: 'index' })}
          labelStyle={[styles.drawerLabel, { color: isDashboard ? colors.primary : colors.text }]}
        />

        <DrawerItem
          label="Survey"
          focused={isSurvey}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          activeBackgroundColor={colors.drawerActiveBg}
          icon={({ color, size }) => <Ionicons name="create-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('(tabs)', { screen: 'survey' })}
          labelStyle={[styles.drawerLabel, { color: isSurvey ? colors.primary : colors.text }]}
        />

        <DrawerItem
          label="Camera"
          focused={isCamera}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          activeBackgroundColor={colors.drawerActiveBg}
          icon={({ color, size }) => <Ionicons name="camera-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('camera')}
          labelStyle={[styles.drawerLabel, { color: isCamera ? colors.primary : colors.text }]}
        />

        <DrawerItem
          label="Contacts"
          focused={isContact}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          activeBackgroundColor={colors.drawerActiveBg}
          icon={({ color, size }) => <Ionicons name="people-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('contact')}
          labelStyle={[styles.drawerLabel, { color: isContact ? colors.primary : colors.text }]}
        />

        <DrawerItem
          label="Location"
          focused={isLocation}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          activeBackgroundColor={colors.drawerActiveBg}
          icon={({ color, size }) => <Ionicons name="location-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('location')}
          labelStyle={[styles.drawerLabel, { color: isLocation ? colors.primary : colors.text }]}
        />

        <DrawerItem
          label="Clipboard"
          focused={isClipboard}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          activeBackgroundColor={colors.drawerActiveBg}
          icon={({ color, size }) => <Ionicons name="clipboard-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('clipboard')}
          labelStyle={[styles.drawerLabel, { color: isClipboard ? colors.primary : colors.text }]}
        />

        <DrawerItem
          label="Settings"
          focused={isSettings}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          activeBackgroundColor={colors.drawerActiveBg}
          icon={({ color, size }) => <Ionicons name="settings-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('settings')}
          labelStyle={[styles.drawerLabel, { color: isSettings ? colors.primary : colors.text }]}
        />
      </View>
    </DrawerContentScrollView>
  )
}

export default function DrawerLayout() {
  const { colors } = useTheme()
  return (
    <Drawer 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background,
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
    flex: 1,
  },
  header: {
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  userSub: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
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
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  }
})
