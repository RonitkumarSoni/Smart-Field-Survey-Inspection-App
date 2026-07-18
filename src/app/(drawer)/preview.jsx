import React from 'react'
import { View, Text, ScrollView, Pressable, Alert, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../context/SurveyContext'
import MapView, { Marker } from 'react-native-maps'

export default function SurveyPreview() {
  const router = useRouter()
  const { currentSurvey, submitSurvey } = useSurveys()

  if (!currentSurvey) {
    return (
      <View style={styles.container}>
        <Text>No survey selected</Text>
      </View>
    )
  }

  const handleSubmit = () => {
    submitSurvey(currentSurvey.id)
    Alert.alert('Success', 'Survey submitted', [
      { text: 'OK', onPress: () => router.push('/(drawer)/(tabs)/history') }
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Preview Survey</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Site Name: {currentSurvey.siteName}</Text>
        <Text style={styles.label}>Client: {currentSurvey.clientName}</Text>
        <Text style={styles.label}>Description: {currentSurvey.description}</Text>
        <Text style={styles.label}>Priority: {currentSurvey.priority}</Text>
        <Text style={styles.label}>Date: {currentSurvey.date}</Text>
      </View>

      {currentSurvey.photo && (
        <View style={styles.card}>
          <Text style={styles.label}>Photo:</Text>
          <Image source={{ uri: currentSurvey.photo }} style={styles.photo} />
        </View>
      )}

      {currentSurvey.latitude && currentSurvey.longitude && (
        <View style={styles.card}>
          <Text style={styles.label}>Location Map:</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(currentSurvey.latitude),
              longitude: parseFloat(currentSurvey.longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(currentSurvey.latitude),
                longitude: parseFloat(currentSurvey.longitude),
              }}
            />
          </MapView>
        </View>
      )}

      <Pressable style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit Survey</Text>
      </Pressable>
      
      <Pressable style={styles.btnBack} onPress={() => router.back()}>
        <Text style={styles.btnText}>Go Back</Text>
      </Pressable>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  photo: {
    width: '100%',
    height: 200,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  btn: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnBack: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
  }
})
