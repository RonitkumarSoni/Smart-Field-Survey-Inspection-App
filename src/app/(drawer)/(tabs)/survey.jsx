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

  const handleSubmit = () => {
    if (siteName === '' || clientName === '' || date === '') {
      Alert.alert('Error', 'Site Name, Client Name and Date are required')
      return
    }

    addSurvey({
      siteName: siteName,
      clientName: clientName,
      description: description,
      priority: priority,
      date: date,
      photo: null,
      contactName: '',
      contactPhone: '',
      latitude: '',
      longitude: '',
    })

    Alert.alert('Success', 'Survey created', [
      { text: 'OK', onPress: () => router.push('/(drawer)/preview') }
    ])

    setSiteName('')
    setClientName('')
    setDescription('')
    setPriority('Medium')
    setDate('')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Survey</Text>
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

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Survey</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'blue',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  btn: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    marginRight: 10,
  },
  btnActive: {
    backgroundColor: 'blue',
    padding: 10,
    marginRight: 10,
  },
  text: {
    color: 'blue',
  },
  textActive: {
    color: 'white',
  },
  submitBtn: {
    backgroundColor: 'green',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
  }
})
