import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native'
import { useRouter, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
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
  const pendingCount = surveys.filter(s => s.status === 'draft').length
  const dateString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const getPriorityColor = (priority) => {
    if (priority === 'High') return colors.danger
    if (priority === 'Medium') return colors.warning
    return colors.success
  }

  const getStatusColor = (status) => {
    return status === 'submitted' ? colors.statusSubmitted : colors.statusDraft
  }

  const quickActions = [
    { label: 'New Survey', icon: 'create', color: '#4F46E5', route: '/(drawer)/(tabs)/survey' },
    { label: 'Camera', icon: 'camera', color: '#7C3AED', route: '/(drawer)/camera' },
    { label: 'Contacts', icon: 'people', color: '#059669', route: '/(drawer)/contact' },
    { label: 'Location', icon: 'location', color: '#D97706', route: '/(drawer)/location' },
  ]

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Gradient Header */}
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Pressable 
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
            style={styles.menuIcon}
            android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: true }}
          >
            <Ionicons name="menu" size={26} color="white" />
          </Pressable>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.welcomeText}>Welcome back, {student.name.split(' ')[0]}</Text>
        <Text style={styles.dateText}>{dateString}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Total', value: surveys.length, icon: 'documents', color: colors.primary },
            { label: "Today", value: todayCount, icon: 'today', color: colors.success },
            { label: 'Pending', value: pendingCount, icon: 'hourglass', color: colors.warning },
          ].map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={[styles.statIconWrap, { backgroundColor: stat.color + '18' }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, i) => (
            <Pressable
              key={i}
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
              onPress={() => router.push(action.route)}
              android_ripple={{ color: action.color + '20' }}
            >
              <View style={[styles.actionIconWrap, { backgroundColor: action.color + '15' }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.text }]}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Recent Surveys */}
        <View style={styles.recentHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 0 }]}>Recent Surveys</Text>
          {surveys.length > 0 && (
            <Pressable onPress={() => router.push('/(drawer)/(tabs)/history')}>
              <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 13 }}>View All</Text>
            </Pressable>
          )}
        </View>

        {surveys.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Ionicons name="documents-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No surveys yet</Text>
            <Text style={[styles.emptySubText, { color: colors.textMuted }]}>Tap "New Survey" to get started</Text>
          </View>
        ) : (
          surveys.slice(0, 5).map(survey => (
            <Pressable 
              key={survey.id} 
              style={[styles.surveyCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
              onPress={() => {
                router.push('/(drawer)/preview')
              }}
              android_ripple={{ color: colors.primary + '10' }}
            >
              <View style={[styles.priorityStrip, { backgroundColor: getPriorityColor(survey.priority) }]} />
              <View style={styles.surveyContent}>
                <View style={styles.surveyTop}>
                  <Text style={[styles.surveyTitle, { color: colors.text }]} numberOfLines={1}>{survey.siteName}</Text>
                  <View style={[styles.statusChip, { backgroundColor: getStatusColor(survey.status) + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(survey.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(survey.status) }]}>
                      {survey.status === 'submitted' ? 'Submitted' : 'Draft'}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.surveyMeta, { color: colors.textMuted }]}>
                  {survey.clientName} • {survey.date}
                </Text>
                <View style={styles.surveyBottom}>
                  <View style={[styles.priorityChip, { backgroundColor: getPriorityColor(survey.priority) + '18' }]}>
                    <Text style={[styles.priorityText, { color: getPriorityColor(survey.priority) }]}>{survey.priority}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </View>
              </View>
            </Pressable>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 28,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  dateText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  content: {
    padding: 16,
    marginTop: -12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    flexGrow: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyCard: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 13,
    marginTop: 4,
  },
  surveyCard: {
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  priorityStrip: {
    width: 4,
  },
  surveyContent: {
    flex: 1,
    padding: 14,
  },
  surveyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  surveyTitle: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  surveyMeta: {
    fontSize: 13,
    marginBottom: 8,
  },
  surveyBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityChip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
  },
})
