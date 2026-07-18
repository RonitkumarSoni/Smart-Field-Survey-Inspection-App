import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'

export default function CreateSurvey() {
  const router = useRouter()
  const { addSurvey } = useSurveys()

  const [siteName, setSiteName] = useState('')
  const [clientName, setClientName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    // validate required fields
    if (!siteName.trim() || !clientName.trim() || !date.trim()) {
      Alert.alert('Error', 'Site Name, Client Name and Date are required!')
      return
    }

    addSurvey({
      siteName,
      clientName,
      description,
      priority,
      date,
      notes,
      photo: null,
      contactName: '',
      contactPhone: '',
      latitude: '',
      longitude: '',
    })

    Alert.alert('Success', 'Survey created!', [
      { text: 'View Preview', onPress: () => router.push('/(drawer)/preview') },
      { text: 'OK' }
    ])

    // clear the form
    setSiteName('')
    setClientName('')
    setDescription('')
    setPriority('Medium')
    setDate('')
    setNotes('')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Survey</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Site Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter site name"
          value={siteName}
          onChangeText={setSiteName}
        />

        <Text style={styles.label}>Client Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter client name"
          value={clientName}
          onChangeText={setClientName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityRow}>
          {['High', 'Medium', 'Low'].map(p => (
            <Pressable
              key={p}
              style={[styles.priorityBtn, priority === p && styles.priorityActive]}
              onPress={() => setPriority(p)}
            >
              <Text style={[styles.priorityText, priority === p && { color: 'white' }]}>{p}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, { height: 60, textAlignVertical: 'top' }]}
          placeholder="Additional notes..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Survey</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007BFF',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 15,
    color: '#333',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  priorityActive: {
    backgroundColor: '#007BFF',
  },
  priorityText: {
    color: '#007BFF',
    fontWeight: '500',
  },
  submitBtn: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
