import React, { useState } from 'react'
import { View, Text, Pressable, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as Clipboard from 'expo-clipboard'

export default function LocationScreen() {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)

  const getLocation = async () => {
    setLoading(true)
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission was not granted')
        setLoading(false)
        return
      }

      const result = await Location.getCurrentPositionAsync({})
      setLocation(result.coords)
    } catch (error) {
      Alert.alert('Error', 'Could not get location')
      console.log(error)
    }
    setLoading(false)
  }

  const copyLocation = async () => {
    if (!location) {
      Alert.alert('No Location', 'Get your location first')
      return
    }
    const text = `Lat: ${location.latitude}, Lng: ${location.longitude}`
    await Clipboard.setStringAsync(text)
    Alert.alert('Copied!', 'Location copied to clipboard')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Demo</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : null}

      {location ? (
        <View style={styles.locationCard}>
          <Text style={styles.label}>Latitude</Text>
          <Text style={styles.value}>{location.latitude.toFixed(6)}</Text>

          <Text style={styles.label}>Longitude</Text>
          <Text style={styles.value}>{location.longitude.toFixed(6)}</Text>

          <Text style={styles.label}>Accuracy</Text>
          <Text style={styles.value}>{location.accuracy ? location.accuracy.toFixed(2) + ' meters' : 'N/A'}</Text>
        </View>
      ) : (
        <Text style={styles.noData}>Press the button to get your location</Text>
      )}

      <Pressable style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>{location ? 'Refresh Location' : 'Get Location'}</Text>
      </Pressable>

      {location ? (
        <Pressable style={[styles.button, { backgroundColor: '#28a745' }]} onPress={copyLocation}>
          <Text style={styles.buttonText}>Copy Location to Clipboard</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  locationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  noData: {
    fontSize: 15,
    color: '#999',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
})
