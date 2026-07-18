import React, { useState } from 'react'
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as Clipboard from 'expo-clipboard'
import MyMap from '../../components/MyMap'
import { useTheme } from '../../context/ThemeContext'

export default function LocationScreen() {
  const [location, setLocation] = useState(null)
  const { colors, darkMode } = useTheme()

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission not granted')
        return
      }

      const result = await Location.getCurrentPositionAsync({})
      setLocation(result.coords)
    } catch (error) {
      Alert.alert('Error', 'Could not get location')
    }
  }

  const copyLocation = async () => {
    if (location) {
      const text = location.latitude + ", " + location.longitude
      await Clipboard.setStringAsync(text)
      Alert.alert('Copied!', 'Location copied')
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Location Demo</Text>

      {location ? (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.text, { color: colors.text }]}><Text style={{ fontWeight: 'bold' }}>Latitude:</Text> {location.latitude}</Text>
          <Text style={[styles.text, { color: colors.text }]}><Text style={{ fontWeight: 'bold' }}>Longitude:</Text> {location.longitude}</Text>
          <Text style={[styles.text, { color: colors.text }]}><Text style={{ fontWeight: 'bold' }}>Accuracy:</Text> {location.accuracy} meters</Text>
          
          <MyMap 
            latitude={location.latitude} 
            longitude={location.longitude} 
            style={styles.map} 
          />
        </View>
      ) : (
        <Text style={[styles.text, { color: colors.textMuted, marginVertical: 20 }]}>No location details fetched yet</Text>
      )}

      <Pressable 
        style={[
          styles.btn, 
          darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: colors.primary }
        ]} 
        onPress={getLocation}
      >
        <Text style={[styles.btnText, { color: darkMode ? colors.primary : 'white' }]}>Get Location</Text>
      </Pressable>

      {location && (
        <Pressable 
          style={[
            styles.btn2, 
            darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border } : { backgroundColor: colors.success }
          ]} 
          onPress={copyLocation}
        >
          <Text style={[styles.btnText, { color: darkMode ? colors.textMuted : 'white' }]}>Copy Location</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    marginBottom: 8
  },
  map: {
    width: '100%',
    height: 250,
    marginTop: 10,
    borderRadius: 6
  },
  btn: {
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  btn2: {
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600'
  }
})
