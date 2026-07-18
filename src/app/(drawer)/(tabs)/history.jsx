import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'

export default function SurveyHistory() {
  const router = useRouter()
  const { surveys, deleteSurvey, setCurrentSurvey } = useSurveys()
  const [searchText, setSearchText] = useState('')
  const [filterPriority, setFilterPriority] = useState('All')

  const handleDelete = (id) => {
    Alert.alert(
      'Delete',
      'Delete this survey?',
      [
        { text: 'No' },
        { text: 'Yes', onPress: () => deleteSurvey(id) }
      ]
    )
  }

  const handleView = (survey) => {
    setCurrentSurvey(survey)
    router.push('/(drawer)/preview')
  }

  const renderSurveyItem = ({ item }) => {
    if (searchText && !item.siteName.toLowerCase().includes(searchText.toLowerCase()) && !item.clientName.toLowerCase().includes(searchText.toLowerCase())) {
      return null
    }
    
    if (filterPriority !== 'All' && item.priority !== filterPriority) {
      return null
    }

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.siteName}</Text>
        <Text>Client: {item.clientName}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Priority: {item.priority}</Text>
        
        <View style={styles.row}>
          <Pressable style={styles.btnBlue} onPress={() => handleView(item)}>
            <Text style={styles.btnText}>View</Text>
          </Pressable>
          <Pressable style={styles.btnRed} onPress={() => handleDelete(item.id)}>
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Survey History</Text>
      </View>

      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Search by Site or Client..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Priority: </Text>
          {['All', 'High', 'Medium', 'Low'].map(p => (
            <Pressable 
              key={p} 
              style={filterPriority === p ? styles.filterBtnActive : styles.filterBtn} 
              onPress={() => setFilterPriority(p)}
            >
              <Text style={filterPriority === p ? styles.filterTextActive : styles.filterText}>{p}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <FlatList
        data={surveys}
        keyExtractor={(item) => item.id}
        renderItem={renderSurveyItem}
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
    paddingTop: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  search: {
    padding: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
  },
  btnBlue: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10,
  },
  btnRed: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
  },
  filterBtnActive: {
    backgroundColor: '#007BFF',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
  },
  filterText: {
    color: '#007BFF',
    fontSize: 12,
  },
  filterTextActive: {
    color: 'white',
    fontSize: 12,
  }
})
