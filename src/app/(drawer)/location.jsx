import React, { useState } from 'react'
import { View, Text, Pressable, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as Clipboard from 'expo-clipboard'
import MyMap from '../../components/MyMap'

export default function LocationScreen() {
  const [location, setLocation] = useState(null)

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
    <View style={styles.container}>
      <Text style={styles.title}>Location Demo</Text>

      {location ? (
        <View style={styles.card}>
          <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Latitude:</Text> {location.latitude}</Text>
          <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Longitude:</Text> {location.longitude}</Text>
          <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Accuracy:</Text> {location.accuracy} meters</Text>
          
          <MyMap 
            latitude={location.latitude} 
            longitude={location.longitude} 
            style={styles.map} 
          />
        </View>
      ) : (
        <Text style={[styles.text, { color: '#666', marginVertical: 20 }]}>No location details fetched yet</Text>
      )}

      <Pressable style={styles.btn} onPress={getLocation}>
        <Text style={styles.btnText}>Get Location</Text>
      </Pressable>

      {location && (
        <Pressable style={styles.btn2} onPress={copyLocation}>
          <Text style={styles.btnText}>Copy Location</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },
  card: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8
  },
  map: {
    width: '100%',
    height: 250,
    marginTop: 10,
    borderRadius: 6
  },
  btn: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  btn2: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})
