import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'

export default function SurveyHistory() {
  const router = useRouter()
  const { surveys, deleteSurvey, setCurrentSurvey } = useSurveys()
  const [searchText, setSearchText] = useState('')
  const [filterPriority, setFilterPriority] = useState('All')

  // filter surveys based on search and priority
  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.siteName.toLowerCase().includes(searchText.toLowerCase()) ||
      survey.clientName.toLowerCase().includes(searchText.toLowerCase())
    const matchesPriority = filterPriority === 'All' || survey.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Survey',
      'Are you sure you want to delete this survey?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteSurvey(id) }
      ]
    )
  }

  const handleView = (survey) => {
    setCurrentSurvey(survey)
    router.push('/(drawer)/preview')
  }

  const renderSurveyItem = ({ item }) => (
    <View style={styles.surveyCard}>
      <View style={styles.surveyHeader}>
        <Text style={styles.surveyTitle}>{item.siteName}</Text>
        <Text style={[styles.priorityBadge, {
          backgroundColor: item.priority === 'High' ? '#dc3545' : item.priority === 'Medium' ? '#ffc107' : '#28a745'
        }]}>
          {item.priority}
        </Text>
      </View>
      <Text style={styles.surveyInfo}>Client: {item.clientName}</Text>
      <Text style={styles.surveyInfo}>Date: {item.date}</Text>
      <Text style={styles.surveyInfo}>Status: {item.status}</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.viewBtn} onPress={() => handleView(item)}>
          <Text style={styles.viewBtnText}>View Details</Text>
        </Pressable>
        <Pressable style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteBtnText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Survey History</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search surveys..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Priority Filter */}
      <View style={styles.filterRow}>
        {['All', 'High', 'Medium', 'Low'].map(p => (
          <Pressable
            key={p}
            style={[styles.filterBtn, filterPriority === p && styles.filterActive]}
            onPress={() => setFilterPriority(p)}
          >
            <Text style={[styles.filterText, filterPriority === p && { color: 'white' }]}>{p}</Text>
          </Pressable>
        ))}
      </View>

      {/* Survey List */}
      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => item.id}
        renderItem={renderSurveyItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No surveys found</Text>
          </View>
        }
      />
    </View>
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
  searchContainer: {
    padding: 12,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 8,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  filterActive: {
    backgroundColor: '#007BFF',
  },
  filterText: {
    color: '#007BFF',
    fontSize: 13,
    fontWeight: '500',
  },
  surveyCard: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  surveyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  priorityBadge: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  surveyInfo: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  viewBtnText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13,
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  deleteBtnText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
})
