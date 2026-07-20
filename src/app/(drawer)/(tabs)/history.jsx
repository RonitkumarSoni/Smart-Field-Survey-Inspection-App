import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Platform, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'
import { useTheme } from '../../../context/ThemeContext'
import { Searchbar, Chip, Text, IconButton, Dialog, Portal, Button } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

export default function SurveyHistory() {
  const router = useRouter()
  const { surveys, deleteSurvey, setCurrentSurvey } = useSurveys()
  const [searchText, setSearchText] = useState('')
  const [filterPriority, setFilterPriority] = useState('All')
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const { colors, darkMode } = useTheme()

  const confirmDelete = (id) => {
    setDeleteId(id)
    setDeleteDialogVisible(true)
  }

  const handleDelete = () => {
    if (deleteId) deleteSurvey(deleteId)
    setDeleteDialogVisible(false)
    setDeleteId(null)
  }

  const handleView = (survey) => {
    setCurrentSurvey(survey)
    router.push('/(drawer)/preview')
  }

  const getPriorityColor = (priority) => {
    if (priority === 'High') return colors.danger
    if (priority === 'Medium') return colors.warning
    return colors.success
  }

  const getStatusColor = (status) => {
    return status === 'submitted' ? colors.statusSubmitted : colors.statusDraft
  }

  const filteredSurveys = surveys.filter(item => {
    const matchesSearch = !searchText || 
      item.siteName.toLowerCase().includes(searchText.toLowerCase()) || 
      item.clientName.toLowerCase().includes(searchText.toLowerCase())
    const matchesPriority = filterPriority === 'All' || item.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  const renderSurveyItem = ({ item }) => (
    <Pressable 
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => handleView(item)}
      android_ripple={{ color: colors.primary + '10' }}
    >
      <View style={[styles.priorityStrip, { backgroundColor: getPriorityColor(item.priority) }]} />
      <View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700' }} numberOfLines={1}>
              {item.siteName}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.textMuted, marginTop: 2 }}>
              {item.clientName} • {item.date}
            </Text>
          </View>
          <View style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status === 'submitted' ? 'Submitted' : 'Draft'}
            </Text>
          </View>
        </View>

        <View style={styles.cardBottom}>
          <View style={[styles.priorityChip, { backgroundColor: getPriorityColor(item.priority) + '18' }]}>
            <Text style={{ color: getPriorityColor(item.priority), fontSize: 11, fontWeight: '700' }}>
              {item.priority}
            </Text>
          </View>
          <View style={styles.cardActions}>
            <IconButton
              icon="eye-outline"
              size={20}
              iconColor={colors.primary}
              onPress={() => handleView(item)}
              style={styles.iconBtn}
            />
            <IconButton
              icon="delete-outline"
              size={20}
              iconColor={colors.danger}
              onPress={() => confirmDelete(item.id)}
              style={styles.iconBtn}
            />
          </View>
        </View>
      </View>
    </Pressable>
  )

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Gradient Header */}
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >

        <Text variant="headlineSmall" style={styles.headerTitle}>Survey History</Text>
        <Text style={styles.headerSub}>{surveys.length} total surveys</Text>
      </LinearGradient>

      {/* Search & Filter */}
      <View style={styles.searchSection}>
        <Searchbar
          placeholder="Search by site or client..."
          value={searchText}
          onChangeText={setSearchText}
          style={[styles.searchbar, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          inputStyle={{ fontSize: 14 }}
          elevation={0}
        />
        <View style={styles.chipRow}>
          {['All', 'High', 'Medium', 'Low'].map(p => (
            <Chip
              key={p}
              selected={filterPriority === p}
              onPress={() => setFilterPriority(p)}
              style={[
                styles.chip,
                filterPriority === p 
                  ? { backgroundColor: colors.primary } 
                  : { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }
              ]}
              textStyle={{ 
                color: filterPriority === p ? '#FFFFFF' : colors.textSecondary, 
                fontSize: 12, 
                fontWeight: '600' 
              }}
              showSelectedCheck={false}
            >
              {p}
            </Chip>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => item.id}
        renderItem={renderSurveyItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No surveys found</Text>
          </View>
        }
      />

      {/* Delete Dialog */}
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)} style={{ borderRadius: 16 }}>
          <Dialog.Icon icon="alert-circle" color={colors.danger} />
          <Dialog.Title style={{ textAlign: 'center' }}>Delete Survey</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>This action cannot be undone. Are you sure?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleDelete} textColor={colors.danger}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
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
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  headerSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  searchSection: {
    padding: 16,
    paddingBottom: 0,
  },
  searchbar: {
    borderRadius: 14,
    borderWidth: 1,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  chip: {
    borderRadius: 10,
  },
  card: {
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
  cardContent: {
    flex: 1,
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
    marginLeft: 8,
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
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityChip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  cardActions: {
    flexDirection: 'row',
  },
  iconBtn: {
    margin: 0,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
})
