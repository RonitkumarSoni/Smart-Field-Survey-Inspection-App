import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { students } from '../../../data/students'
import { useSurveys } from '../../../context/SurveyContext'

export default function Profile() {
  const student = students[0]
  const { surveys } = useSurveys()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.course}>{student.course} - {student.year}</Text>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Student ID</Text>
          <Text style={styles.infoValue}>STU-{student.id.padStart(4, '0')}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Course</Text>
          <Text style={styles.infoValue}>{student.course}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Year</Text>
          <Text style={styles.infoValue}>{student.year}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Total Surveys</Text>
          <Text style={styles.infoValue}>{surveys.length}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={[styles.infoValue, { color: 'green' }]}>Active</Text>
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
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  course: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
})
