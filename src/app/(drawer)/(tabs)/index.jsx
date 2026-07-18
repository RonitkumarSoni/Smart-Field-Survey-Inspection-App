import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'
import { students } from '../../../data/students'

export default function Dashboard() {
  const router = useRouter()
  const { surveys } = useSurveys()
  const student = students[0]

  const today = new Date().toISOString().split('T')[0]
  const todayCount = surveys.filter(s => s.date === today).length

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome, {student.name}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student Details</Text>
          <Text style={styles.cardText}>Name: {student.name}</Text>
          <Text style={styles.cardText}>Course: {student.course}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Surveys: {todayCount}</Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => router.push('/(drawer)/(tabs)/survey')}>
            <Text style={styles.btnText}>New Survey</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => router.push('/(drawer)/camera')}>
            <Text style={styles.btnText}>Camera</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => router.push('/(drawer)/contact')}>
            <Text style={styles.btnText}>Contacts</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => router.push('/(drawer)/location')}>
            <Text style={styles.btnText}>Location</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Recent Surveys</Text>
        {surveys.length === 0 ? (
          <Text>No surveys found</Text>
        ) : (
          surveys.map(survey => (
            <View key={survey.id} style={styles.card}>
              <Text style={styles.cardTitle}>{survey.siteName}</Text>
              <Text>Client: {survey.clientName}</Text>
              <Text>Date: {survey.date}</Text>
            </View>
          ))
        )}
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
  content: {
    padding: 15,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: 'blue',
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  }
})
