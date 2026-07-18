import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'
import { useTheme } from '../../../context/ThemeContext'

export default function CreateSurvey() {
  const router = useRouter()
  const { addSurvey } = useSurveys()
  const { colors, darkMode } = useTheme()

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

  const getPriorityStyle = (p, isActive) => {
    if (darkMode) {
      if (isActive) {
        return { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: '#ffffff' }
      }
      return { backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.1)' }
    }
    if (isActive) {
      if (p === 'High') return { backgroundColor: colors.danger, borderColor: colors.danger }
      if (p === 'Medium') return { backgroundColor: colors.warning, borderColor: colors.warning }
      return { backgroundColor: colors.success, borderColor: colors.success }
    } else {
      if (p === 'High') return { borderColor: colors.danger }
      if (p === 'Medium') return { borderColor: colors.warning }
      return { borderColor: colors.success }
    }
  }

  const getPriorityTextStyle = (p, isActive) => {
    if (darkMode) {
      if (isActive) return { color: '#ffffff' }
      return { color: '#a0a0a0' }
    }
    if (isActive) {
      return { color: colors.background }
    } else {
      if (p === 'High') return { color: colors.danger }
      if (p === 'Medium') return { color: colors.warning }
      return { color: colors.success }
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <Text style={[styles.headerText, { color: colors.headerText }]}>Create Survey</Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Site Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
          value={siteName}
          onChangeText={setSiteName}
          placeholder="e.g. Metro Station construction"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={[styles.label, { color: colors.text }]}>Client Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
          value={clientName}
          onChangeText={setClientName}
          placeholder="e.g. Infrastructure Ltd"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={[styles.label, { color: colors.text }]}>Description</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe survey details"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={[styles.label, { color: colors.text }]}>Priority</Text>
        <View style={styles.row}>
          {['High', 'Medium', 'Low'].map(p => {
            const isActive = priority === p
            return (
              <Pressable 
                key={p}
                style={[
                  styles.btn, 
                  getPriorityStyle(p, isActive),
                ]} 
                onPress={() => setPriority(p)}
              >
                <Text style={[styles.text, getPriorityTextStyle(p, isActive)]}>{p}</Text>
              </Pressable>
            )
          })}
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Date</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textMuted}
        />

        <Pressable 
          style={[
            styles.submitBtn, 
            darkMode ? { backgroundColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' } : { backgroundColor: colors.success }
          ]} 
          onPress={handleSubmit}
        >
          <Text style={[styles.submitText, { color: 'white' }]}>Submit Survey</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 35,
    paddingBottom: 25,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  text: {
    fontWeight: '500',
  },
  submitBtn: {
    padding: 14,
    borderRadius: 8,
    marginTop: 25,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})
