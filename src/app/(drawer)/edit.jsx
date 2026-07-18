import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../context/SurveyContext'
import { useTheme } from '../../context/ThemeContext'

export default function EditSurvey() {
  const router = useRouter()
  const { currentSurvey, updateSurvey, setCurrentSurvey } = useSurveys()
  const { colors, darkMode } = useTheme()

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

  if (!currentSurvey) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: darkMode ? colors.headerBg : colors.warning }]}>
        <Text style={[styles.headerText, { color: darkMode ? colors.headerText : colors.background }]}>Edit Survey</Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Site Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
          value={siteName}
          onChangeText={setSiteName}
        />

        <Text style={[styles.label, { color: colors.text }]}>Client Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
          value={clientName}
          onChangeText={setClientName}
        />

        <Text style={[styles.label, { color: colors.text }]}>Description</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
          value={description}
          onChangeText={setDescription}
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
        />

        <View style={styles.actionRow}>
            <Pressable 
              style={[
                styles.cancelBtn, 
                darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border } : { backgroundColor: colors.danger }
              ]} 
              onPress={() => router.back()}
            >
                <Text style={[styles.submitText, { color: darkMode ? colors.textMuted : 'white' }]}>Cancel</Text>
            </Pressable>
            <Pressable 
              style={[
                styles.submitBtn, 
                darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: colors.success }
              ]} 
              onPress={handleUpdate}
            >
                <Text style={[styles.submitText, { color: darkMode ? colors.primary : 'white' }]}>Update</Text>
            </Pressable>
        </View>
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
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
  cancelBtn: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%'
  },
  submitBtn: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%'
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})
