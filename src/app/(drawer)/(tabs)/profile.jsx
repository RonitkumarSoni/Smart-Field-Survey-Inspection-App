import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { students } from '../../../data/students'
import { useSurveys } from '../../../context/SurveyContext'
import { useTheme } from '../../../context/ThemeContext'

export default function Profile() {
  const student = students[0]
  const { surveys } = useSurveys()
  const { colors, darkMode } = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <Text style={[styles.headerText, { color: colors.headerText }]}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: darkMode ? colors.background : 'white' }]}>{student.name.charAt(0)}</Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{student.name}</Text>
          <Text style={[styles.course, { color: colors.textMuted }]}>{student.course} - {student.year}</Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Student ID</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>STU-{student.id.padStart(4, '0')}</Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Course</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{student.course}</Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Year</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{student.year}</Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Total Surveys</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{surveys.length}</Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Status</Text>
          <Text style={[styles.infoValue, { color: colors.success }]}>Active</Text>
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
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  course: {
    fontSize: 14,
    marginTop: 4,
  },
  infoCard: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
})
