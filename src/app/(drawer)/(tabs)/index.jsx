import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'
import { students } from '../../../data/students'

export default function Dashboard() {
  const router = useRouter()
  const { surveys } = useSurveys()
  const student = students[0]

  // count today's surveys
  const today = new Date().toISOString().split('T')[0]
  const todayCount = surveys.filter(s => s.date === today).length

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome back, {student.name}!</Text>

        {/* Student Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student Details</Text>
          <Text style={styles.cardText}>Name: {student.name}</Text>
          <Text style={styles.cardText}>Course: {student.course}</Text>
          <Text style={styles.cardText}>Year: {student.year}</Text>
        </View>

        {/* Today's Survey Count */}
        <View style={styles.countCard}>
          <Text style={styles.cardTitle}>Today's Surveys</Text>
          <Text style={styles.countNumber}>{todayCount}</Text>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <Pressable style={styles.actionBtn} onPress={() => router.push('/(drawer)/(tabs)/survey')}>
            <Text style={styles.actionText}>New Survey</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={() => router.push('/(drawer)/camera')}>
            <Text style={styles.actionText}>Camera</Text>
          </Pressable>
        </View>
        <View style={styles.actionsRow}>
          <Pressable style={styles.actionBtn} onPress={() => router.push('/(drawer)/contact')}>
            <Text style={styles.actionText}>Contacts</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={() => router.push('/(drawer)/location')}>
            <Text style={styles.actionText}>Location</Text>
          </Pressable>
        </View>

        {/* Recent Surveys */}
        <Text style={styles.sectionTitle}>Recent Surveys</Text>
        {surveys.length === 0 ? (
          <Text style={styles.emptyText}>No surveys yet</Text>
        ) : (
          surveys.slice(0, 3).map(survey => (
            <View key={survey.id} style={styles.card}>
              <Text style={styles.cardTitle}>{survey.siteName}</Text>
              <Text style={styles.cardText}>Client: {survey.clientName}</Text>
              <Text style={styles.cardText}>Date: {survey.date}</Text>
              <Text style={[styles.cardText, { color: survey.priority === 'High' ? 'red' : survey.priority === 'Medium' ? 'orange' : 'green' }]}>
                Priority: {survey.priority}
              </Text>
            </View>
          ))
        )}

        <View style={{ height: 30 }} />
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
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  countCard: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  countNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  actionBtn: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
})
