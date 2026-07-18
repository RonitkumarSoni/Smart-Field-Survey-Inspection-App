import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useRouter, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useSurveys } from '../../../context/SurveyContext'
import { students } from '../../../data/students'
import { useTheme } from '../../../context/ThemeContext'

export default function Dashboard() {
  const router = useRouter()
  const navigation = useNavigation()
  const { surveys } = useSurveys()
  const student = students[0]
  const { colors, darkMode } = useTheme()

  const today = new Date().toISOString().split('T')[0]
  const todayCount = surveys.filter(s => s.date === today).length

  const getPriorityColor = (priority) => {
    if (priority === 'High') return colors.danger
    if (priority === 'Medium') return colors.warning
    return colors.success
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <Pressable 
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
          style={styles.menuIcon}
        >
          <Ionicons name="menu" size={28} color="white" />
        </Pressable>
        <Text style={[styles.headerText, { color: colors.headerText }]}>Dashboard</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.welcome, { color: colors.text }]}>Welcome, {student.name}</Text>

        <View style={[
          styles.card, 
          { 
            backgroundColor: colors.card, 
            borderColor: colors.border,
            shadowColor: colors.shadow,
          }
        ]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Student Details</Text>
          <Text style={[styles.cardText, { color: colors.textMuted }]}>Name: {student.name}</Text>
          <Text style={[styles.cardText, { color: colors.textMuted }]}>Course: {student.course}</Text>
        </View>

        <View style={[
          styles.card, 
          { 
            backgroundColor: colors.card, 
            borderColor: colors.border,
            shadowColor: colors.shadow,
          }
        ]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Today's Surveys: {todayCount}</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.row}>
          <Pressable 
            style={[
              styles.btn, 
              darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: colors.primary }
            ]} 
            onPress={() => router.push('/(drawer)/(tabs)/survey')}
          >
            <Text style={[styles.btnText, { color: darkMode ? colors.primary : 'white' }]}>New Survey</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.btn, 
              darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: colors.primary }
            ]} 
            onPress={() => router.push('/(drawer)/camera')}
          >
            <Text style={[styles.btnText, { color: darkMode ? colors.primary : 'white' }]}>Camera</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable 
            style={[
              styles.btn, 
              darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: colors.primary }
            ]} 
            onPress={() => router.push('/(drawer)/contact')}
          >
            <Text style={[styles.btnText, { color: darkMode ? colors.primary : 'white' }]}>Contacts</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.btn, 
              darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: colors.primary }
            ]} 
            onPress={() => router.push('/(drawer)/location')}
          >
            <Text style={[styles.btnText, { color: darkMode ? colors.primary : 'white' }]}>Location</Text>
          </Pressable>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Surveys</Text>
        {surveys.length === 0 ? (
          <Text style={{ color: colors.textMuted }}>No surveys found</Text>
        ) : (
          surveys.map(survey => (
            <View 
              key={survey.id} 
              style={[
                styles.card, 
                { 
                  backgroundColor: colors.card, 
                  borderColor: colors.border,
                  shadowColor: colors.shadow,
                }
              ]}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 0 }]}>{survey.siteName}</Text>
                {darkMode ? (
                  <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
                    <Text style={{ color: colors.textMuted, fontSize: 10, fontWeight: 'bold' }}>{survey.priority}</Text>
                  </View>
                ) : (
                  <View style={{ backgroundColor: getPriorityColor(survey.priority) + '22', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
                    <Text style={{ color: getPriorityColor(survey.priority), fontSize: 10, fontWeight: 'bold' }}>{survey.priority}</Text>
                  </View>
                )}
              </View>
              <Text style={{ color: colors.textMuted, marginTop: 4 }}>Client: {survey.clientName}</Text>
              <Text style={{ color: colors.textMuted }}>Date: {survey.date}</Text>
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
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 35,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIcon: {
    padding: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btn: {
    padding: 12,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
  }
})
