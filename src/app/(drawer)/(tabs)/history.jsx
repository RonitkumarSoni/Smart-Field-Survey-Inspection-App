import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'

export default function SurveyHistory() {
  const router = useRouter()
  const { surveys, deleteSurvey, setCurrentSurvey } = useSurveys()
  const [searchText, setSearchText] = useState('')

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
    if (searchText && !item.siteName.includes(searchText) && !item.clientName.includes(searchText)) {
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
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
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
  search: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  btnBlue: {
    backgroundColor: 'blue',
    padding: 10,
    marginRight: 10,
  },
  btnRed: {
    backgroundColor: 'red',
    padding: 10,
  },
  btnText: {
    color: 'white',
  }
})
