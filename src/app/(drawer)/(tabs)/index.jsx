import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useRouter, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useSurveys } from '../../../context/SurveyContext'
import { students } from '../../../data/students'

export default function Dashboard() {
  const router = useRouter()
  const navigation = useNavigation()
  const { surveys } = useSurveys()
  const student = students[0]

  const today = new Date().toISOString().split('T')[0]
  const todayCount = surveys.filter(s => s.date === today).length

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
          style={styles.menuIcon}
        >
          <Ionicons name="menu" size={28} color="white" />
        </Pressable>
        <Text style={styles.headerText}>Dashboard</Text>
        <View style={{ width: 28 }} />
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingTop: 15, // Reduced padding
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIcon: {
    padding: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 15,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  }
})
