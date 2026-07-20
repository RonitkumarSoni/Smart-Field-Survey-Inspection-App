import React from 'react'
import { View, StyleSheet, ScrollView, Platform, Image, Pressable } from 'react-native'
import { Text, Avatar, List, Divider, Button } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { students } from '../../../data/students'
import { useSurveys } from '../../../context/SurveyContext'
import { useTheme } from '../../../context/ThemeContext'
import { useAuth } from '../../../context/AuthContext'

export default function Profile() {
  const student = students[0]
  const { surveys, userAvatar, setUserAvatar } = useSurveys()
  const { colors, darkMode } = useTheme()
  const { logout, isLoading } = useAuth()

  const submittedCount = surveys.filter(s => s.status === 'submitted').length
  const draftCount = surveys.filter(s => s.status === 'draft').length
  const completionRate = surveys.length > 0 ? Math.round((submittedCount / surveys.length) * 100) : 0

  const infoItems = [
    { title: 'Student ID', value: `STU-${student.id.padStart(4, '0')}`, icon: 'card-account-details-outline' },
    { title: 'Course', value: student.course, icon: 'school-outline' },
    { title: 'Year', value: student.year, icon: 'calendar-outline' },
    { title: 'Total Surveys', value: `${surveys.length}`, icon: 'file-document-multiple-outline' },
    { title: 'Submitted', value: `${submittedCount}`, icon: 'check-circle-outline' },
    { title: 'Drafts', value: `${draftCount}`, icon: 'pencil-outline' },
  ]

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      setUserAvatar(result.assets[0].uri)
    }
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Gradient Header with Avatar */}
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.avatarRing}>
          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarInner}>
              <Text style={styles.avatarText}>{student.name.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          {/* Camera Button */}
          <Pressable style={styles.cameraBtn} onPress={pickImage}>
            <Ionicons name="camera" size={16} color={colors.primary} />
          </Pressable>
        </View>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.subtitle}>{student.course} • {student.year}</Text>
      </LinearGradient>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {[
          { label: 'Surveys', value: surveys.length, color: colors.primary },
          { label: 'Completion', value: `${completionRate}%`, color: colors.success },
          { label: 'Pending', value: draftCount, color: colors.warning },
        ].map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Info Section */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>Information</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {infoItems.map((item, i) => (
            <React.Fragment key={i}>
              <List.Item
                title={item.title}
                description={item.value}
                left={() => (
                  <View style={[styles.listIcon, { backgroundColor: colors.chipBg }]}>
                    <List.Icon icon={item.icon} color={colors.primary} />
                  </View>
                )}
                titleStyle={{ color: colors.textMuted, fontSize: 12 }}
                descriptionStyle={{ color: colors.text, fontSize: 15, fontWeight: '600' }}
                style={{ paddingVertical: 4 }}
              />
              {i < infoItems.length - 1 && <Divider style={{ backgroundColor: colors.border, marginHorizontal: 16 }} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Status */}
      <View style={styles.section}>
        <View style={[styles.statusCard, { backgroundColor: colors.successLight, borderColor: colors.success + '30' }]}>
          <View style={styles.statusRow}>
            <Ionicons name="checkmark-circle" size={22} color={colors.success} />
            <Text style={[styles.statusText, { color: colors.success }]}>Account Active</Text>
          </View>
        </View>
      </View>

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={logout}
          loading={isLoading}
          disabled={isLoading}
          icon="logout"
          textColor={colors.danger}
          style={[styles.logoutBtn, { borderColor: colors.danger }]}
          labelStyle={{ fontWeight: '700' }}
        >
          Log Out
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 44,
    paddingBottom: 32,
    alignItems: 'center',
  },
  avatarRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarInner: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    marginTop: -16,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  infoCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  listIcon: {
    borderRadius: 10,
    marginLeft: 8,
  },
  statusCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '700',
  },
})
