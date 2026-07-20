import React from 'react'
import { View, Text, StyleSheet, Switch, Platform, Image } from 'react-native'
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { students } from '../../data/students'
import { useTheme } from '../../context/ThemeContext'
import { useSurveys } from '../../context/SurveyContext'
import { usePathname } from 'expo-router'

function CustomDrawerContent(props) {
  const student = students[0]
  const pathname = usePathname() || ''
  const { darkMode, toggleTheme, colors } = useTheme()
  const { userAvatar } = useSurveys()

  const isDashboard = pathname === '/' || pathname === '/(drawer)/(tabs)' || pathname.includes('/index')
  const isSurvey = pathname.includes('/survey')
  const isCamera = pathname.includes('/camera')
  const isContact = pathname.includes('/contact')
  const isLocation = pathname.includes('/location')
  const isClipboard = pathname.includes('/clipboard')
  const isSettings = pathname.includes('/settings')

  const menuItems = [
    { label: 'Dashboard', icon: 'home', focused: isDashboard, onPress: () => props.navigation.navigate('(tabs)', { screen: 'index' }) },
    { label: 'New Survey', icon: 'create', focused: isSurvey, onPress: () => props.navigation.navigate('(tabs)', { screen: 'survey' }) },
    { label: 'Camera', icon: 'camera', focused: isCamera, onPress: () => props.navigation.navigate('camera') },
    { label: 'Contacts', icon: 'people', focused: isContact, onPress: () => props.navigation.navigate('contact') },
    { label: 'Location', icon: 'location', focused: isLocation, onPress: () => props.navigation.navigate('location') },
    { label: 'Clipboard', icon: 'clipboard', focused: isClipboard, onPress: () => props.navigation.navigate('clipboard') },
    { label: 'Settings', icon: 'settings', focused: isSettings, onPress: () => props.navigation.navigate('settings') },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: colors.drawerBg }}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
        {/* Gradient Header */}
        <LinearGradient
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.avatarRing}>
            {userAvatar ? (
              <Image source={{ uri: userAvatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{student.name.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>
          <Text style={styles.username}>{student.name}</Text>
          <Text style={styles.userSub}>{student.course} • {student.year}</Text>
        </LinearGradient>

        {/* Dark Mode Toggle */}
        <View style={[styles.toggleSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.toggleRow}>
            <View style={[styles.toggleIcon, { backgroundColor: darkMode ? colors.chipBg : '#FEF3C7' }]}>
              <Ionicons name={darkMode ? 'moon' : 'sunny'} size={16} color={darkMode ? colors.primary : '#D97706'} />
            </View>
            <Text style={[styles.toggleText, { color: colors.text }]}>{darkMode ? 'Dark Mode' : 'Light Mode'}</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#D1D5DB', true: colors.primary }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#D1D5DB"
          />
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <DrawerItem
              key={item.label}
              label={item.label}
              focused={item.focused}
              activeTintColor={colors.primary}
              inactiveTintColor={colors.textSecondary}
              activeBackgroundColor={colors.drawerActiveBg}
              icon={({ color }) => (
                <Ionicons 
                  name={item.focused ? item.icon : `${item.icon}-outline`} 
                  size={22} 
                  color={color} 
                />
              )}
              onPress={item.onPress}
              labelStyle={[styles.drawerLabel, { color: item.focused ? colors.primary : colors.text }]}
              style={{ borderRadius: 12, marginVertical: 2 }}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={[styles.footerDivider, { backgroundColor: colors.border }]} />
        <Text style={[styles.footerText, { color: colors.textMuted }]}>Smart Field Survey v1.0.0</Text>
      </View>
    </View>
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
          backgroundColor: colors.drawerBg,
          width: 290,
          borderRightWidth: 0,
        },
        overlayColor: 'rgba(0,0,0,0.5)',
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
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  userSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  toggleIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    paddingHorizontal: 8,
    flex: 1,
  },
  drawerLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: -8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  footerDivider: {
    height: 1,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
})
