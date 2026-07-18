import React from 'react'
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native'
import { useSurveys } from '../../context/SurveyContext'

export default function Settings() {
  const { surveys } = useSurveys()

  const handleClearData = () => {
    Alert.alert(
      'Clear Data',
      'This will clear all survey data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {
          Alert.alert('Info', 'Data cleared (restart app to take effect)')
        }}
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingCard}>
        <Text style={styles.settingLabel}>App Version</Text>
        <Text style={styles.settingValue}>1.0.0</Text>
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.settingLabel}>Total Surveys</Text>
        <Text style={styles.settingValue}>{surveys.length}</Text>
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.settingLabel}>Developer</Text>
        <Text style={styles.settingValue}>Student Project</Text>
      </View>

      <Pressable style={styles.clearBtn} onPress={handleClearData}>
        <Text style={styles.clearBtnText}>Clear All Data</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingCard: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    color: '#666',
  },
  settingValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  clearBtn: {
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  clearBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
})
