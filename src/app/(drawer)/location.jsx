import React, { useState } from 'react'
import { View, Text, Pressable, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as Clipboard from 'expo-clipboard'
import MyMap from '../../components/MyMap'

export default function LocationScreen() {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)

  const getLocation = async () => {
    setLoading(true)
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission not granted')
        setLoading(false)
        return
      }

      const result = await Location.getCurrentPositionAsync({})
      setLocation(result.coords)
    } catch (error) {
      Alert.alert('Error', 'Could not get location')
    }
    setLoading(false)
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

      {loading && <ActivityIndicator size="large" color="blue" />}

      {location ? (
        <View style={styles.card}>
          <Text style={styles.text}>Lat: {location.latitude}</Text>
          <Text style={styles.text}>Lng: {location.longitude}</Text>
          <Text style={styles.text}>Accuracy: {location.accuracy}</Text>
          
          <MyMap 
            latitude={location.latitude} 
            longitude={location.longitude} 
            style={styles.map} 
          />
        </View>
      ) : (
        <Text style={styles.text}>No location yet</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  map: {
    width: '100%',
    height: 250,
    marginTop: 10
  },
  btn: {
    backgroundColor: 'blue',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  btn2: {
    backgroundColor: 'green',
    padding: 15,
    width: '100%',
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 16
  }
})
