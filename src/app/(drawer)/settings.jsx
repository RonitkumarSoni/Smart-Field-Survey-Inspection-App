import React from 'react'
import { View, Text, Pressable, Alert, StyleSheet, Switch } from 'react-native'
import { useSurveys } from '../../context/SurveyContext'
import { useTheme } from '../../context/ThemeContext'

export default function Settings() {
  const { surveys } = useSurveys()
  const { colors, darkMode, toggleTheme } = useTheme()

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.settingLabel, { color: colors.textMuted }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.settingLabel, { color: colors.textMuted }]}>App Version</Text>
        <Text style={[styles.settingValue, { color: colors.text }]}>1.0.0</Text>
      </View>

      <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.settingLabel, { color: colors.textMuted }]}>Total Surveys</Text>
        <Text style={[styles.settingValue, { color: colors.text }]}>{surveys.length}</Text>
      </View>

      <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.settingLabel, { color: colors.textMuted }]}>Developer</Text>
        <Text style={[styles.settingValue, { color: colors.text }]}>Student Project</Text>
      </View>

      <Pressable 
        style={[
          styles.clearBtn, 
          darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.danger } : { backgroundColor: colors.danger }
        ]} 
        onPress={handleClearData}
      >
        <Text style={[styles.clearBtnText, { color: darkMode ? colors.danger : 'white' }]}>Clear All Data</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingCard: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
  },
  settingValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  clearBtn: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  clearBtnText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
})
