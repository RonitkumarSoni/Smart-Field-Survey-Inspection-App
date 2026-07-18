import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../context/SurveyContext'

export default function EditSurvey() {
  const router = useRouter()
  const { currentSurvey, updateSurvey, setCurrentSurvey } = useSurveys()

  const [siteName, setSiteName] = useState('')
  const [clientName, setClientName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [date, setDate] = useState('')

  useEffect(() => {
    if (currentSurvey) {
        setSiteName(currentSurvey.siteName || '')
        setClientName(currentSurvey.clientName || '')
        setDescription(currentSurvey.description || '')
        setPriority(currentSurvey.priority || 'Medium')
        setDate(currentSurvey.date || '')
    } else {
        Alert.alert("Error", "No survey selected for editing.", [
            { text: "Go Back", onPress: () => router.back() }
        ])
    }
  }, [currentSurvey])

  const handleUpdate = () => {
    if (siteName === '' || clientName === '' || date === '') {
      Alert.alert('Error', 'Site Name, Client Name and Date are required')
      return
    }

    const updatedData = {
      ...currentSurvey,
      siteName,
      clientName,
      description,
      priority,
      date,
    }

    if (updateSurvey) {
      updateSurvey(currentSurvey.id, updatedData)
    }
    
    if (setCurrentSurvey) {
      setCurrentSurvey(updatedData)
    }

    Alert.alert('Success', 'Survey updated successfully', [
      { text: 'OK', onPress: () => router.back() }
    ])
  }

  if (!currentSurvey) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Survey</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Site Name</Text>
        <TextInput
          style={styles.input}
          value={siteName}
          onChangeText={setSiteName}
        />

        <Text style={styles.label}>Client Name</Text>
        <TextInput
          style={styles.input}
          value={clientName}
          onChangeText={setClientName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.row}>
          <Pressable style={priority === 'High' ? styles.btnActive : styles.btn} onPress={() => setPriority('High')}>
            <Text style={priority === 'High' ? styles.textActive : styles.text}>High</Text>
          </Pressable>
          <Pressable style={priority === 'Medium' ? styles.btnActive : styles.btn} onPress={() => setPriority('Medium')}>
            <Text style={priority === 'Medium' ? styles.textActive : styles.text}>Medium</Text>
          </Pressable>
          <Pressable style={priority === 'Low' ? styles.btnActive : styles.btn} onPress={() => setPriority('Low')}>
            <Text style={priority === 'Low' ? styles.textActive : styles.text}>Low</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />

        <View style={styles.actionRow}>
            <Pressable style={styles.cancelBtn} onPress={() => router.back()}>
                <Text style={styles.submitText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.submitBtn} onPress={handleUpdate}>
                <Text style={styles.submitText}>Update Survey</Text>
            </Pressable>
        </View>
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
    backgroundColor: '#ffc107',
    padding: 20,
    paddingTop: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#333',
    fontSize: 22,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  btnActive: {
    backgroundColor: '#007BFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  text: {
    color: '#007BFF',
    fontWeight: '500',
  },
  textActive: {
    color: 'white',
    fontWeight: '500',
  },
  cancelBtn: {
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%'
  },
  submitBtn: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%'
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
