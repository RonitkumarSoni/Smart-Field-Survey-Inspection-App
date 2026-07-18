import React from 'react'
import { View, Text, ScrollView, Pressable, Alert, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../context/SurveyContext'

export default function SurveyPreview() {
  const router = useRouter()
  const { currentSurvey, submitSurvey } = useSurveys()

  if (!currentSurvey) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>Survey Preview</Text>
        <Text style={styles.noData}>No survey selected</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    )
  }

  const handleSubmit = () => {
    submitSurvey(currentSurvey.id)
    Alert.alert('Success', 'Survey submitted successfully!', [
      { text: 'OK', onPress: () => router.push('/(drawer)/(tabs)/history') }
    ])
  }

  const handleEdit = () => {
    router.push('/(drawer)/(tabs)/survey')
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Survey Preview</Text>

        {/* Site Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Site Details</Text>
          <Text style={styles.label}>Site Name</Text>
          <Text style={styles.value}>{currentSurvey.siteName}</Text>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{currentSurvey.clientName}</Text>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{currentSurvey.description || 'N/A'}</Text>
          <Text style={styles.label}>Priority</Text>
          <Text style={[styles.value, {
            color: currentSurvey.priority === 'High' ? 'red' : currentSurvey.priority === 'Medium' ? 'orange' : 'green'
          }]}>{currentSurvey.priority}</Text>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{currentSurvey.date}</Text>
        </View>

        {/* Photo */}
        {currentSurvey.photo ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photo</Text>
            <Image source={{ uri: currentSurvey.photo }} style={styles.photo} />
          </View>
        ) : null}

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{currentSurvey.contactName || 'N/A'}</Text>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{currentSurvey.contactPhone || 'N/A'}</Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.label}>Latitude</Text>
          <Text style={styles.value}>{currentSurvey.latitude || 'N/A'}</Text>
          <Text style={styles.label}>Longitude</Text>
          <Text style={styles.value}>{currentSurvey.longitude || 'N/A'}</Text>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.value}>{currentSurvey.notes || 'No notes'}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, { backgroundColor: '#ffc107' }]} onPress={handleEdit}>
            <Text style={[styles.buttonText, { color: '#333' }]}>Edit Survey</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#28a745' }]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Survey</Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 40,
  },
  noData: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  value: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
})
