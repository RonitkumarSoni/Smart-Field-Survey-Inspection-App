import React from 'react'
import { View, Text, ScrollView, Pressable, Alert, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../context/SurveyContext'
import MyMap from '../../components/MyMap'
import { useTheme } from '../../context/ThemeContext'

export default function SurveyPreview() {
  const router = useRouter()
  const { currentSurvey, submitSurvey } = useSurveys()
  const { colors, darkMode } = useTheme()

  if (!currentSurvey) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textMuted }}>No survey selected</Text>
      </View>
    )
  }

  const handleSubmit = () => {
    submitSurvey(currentSurvey.id)
    Alert.alert('Success', 'Survey submitted', [
      { text: 'OK', onPress: () => router.push('/(drawer)/(tabs)/history') }
    ])
  }

  const handleEdit = () => {
    router.push('/(drawer)/edit')
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Preview Survey</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Text style={[styles.label, { color: colors.text }]}>Site Name: {currentSurvey.siteName}</Text>
        <Text style={[styles.label, { color: colors.text }]}>Client: {currentSurvey.clientName}</Text>
        <Text style={[styles.label, { color: colors.text }]}>Description: {currentSurvey.description}</Text>
        <Text style={[styles.label, { color: colors.text }]}>Priority: {currentSurvey.priority}</Text>
        <Text style={[styles.label, { color: colors.text }]}>Date: {currentSurvey.date}</Text>
      </View>

      {(currentSurvey.contactName || currentSurvey.contactPhone) && (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: darkMode ? colors.text : '#007BFF' }]}>Contact Details</Text>
          {currentSurvey.contactName ? <Text style={[styles.label, { color: colors.text }]}>Name: {currentSurvey.contactName}</Text> : null}
          {currentSurvey.contactPhone ? <Text style={[styles.label, { color: colors.text }]}>Phone: {currentSurvey.contactPhone}</Text> : null}
        </View>
      )}

      {currentSurvey.notes && (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: darkMode ? colors.text : '#007BFF' }]}>Notes</Text>
          <Text style={[styles.label, { color: colors.text }]}>{currentSurvey.notes}</Text>
        </View>
      )}

      {currentSurvey.photo && (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.label, { color: colors.text }]}>Photo:</Text>
          <Image source={{ uri: currentSurvey.photo }} style={styles.photo} />
        </View>
      )}

      {currentSurvey.latitude && currentSurvey.longitude && (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.label, { color: colors.text }]}>Location Map:</Text>
          <MyMap
            latitude={parseFloat(currentSurvey.latitude)}
            longitude={parseFloat(currentSurvey.longitude)}
            style={styles.map}
          />
        </View>
      )}

      <View style={styles.buttonRow}>
        <Pressable 
          style={[
            styles.btnEdit, 
            darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border } : { backgroundColor: '#ffc107' }
          ]} 
          onPress={handleEdit}
        >
          <Text style={[styles.btnText, { color: darkMode ? colors.textMuted : 'white' }]}>Edit Survey</Text>
        </Pressable>

        <Pressable 
          style={[
            styles.btnSubmit, 
            darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: '#28a745' }
          ]} 
          onPress={handleSubmit}
        >
          <Text style={[styles.btnText, { color: darkMode ? colors.primary : 'white' }]}>Submit Survey</Text>
        </Pressable>
      </View>
      
      <Pressable 
        style={[
          styles.btnBack, 
          darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border } : { backgroundColor: '#007BFF' }
        ]} 
        onPress={() => router.back()}
      >
        <Text style={[styles.btnText, { color: darkMode ? colors.textMuted : 'white' }]}>Go Back</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF'
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 6,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnEdit: {
    backgroundColor: '#ffc107',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '48%'
  },
  btnSubmit: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '48%'
  },
  btnBack: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
})
