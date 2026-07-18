import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../../context/SurveyContext'
import { useTheme } from '../../../context/ThemeContext'

export default function SurveyHistory() {
  const router = useRouter()
  const { surveys, deleteSurvey, setCurrentSurvey } = useSurveys()
  const [searchText, setSearchText] = useState('')
  const [filterPriority, setFilterPriority] = useState('All')
  const { colors, darkMode } = useTheme()

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

  const getPriorityColor = (priority) => {
    if (priority === 'High') return colors.danger
    if (priority === 'Medium') return colors.warning
    return colors.success
  }

  const renderSurveyItem = ({ item }) => {
    if (searchText && !item.siteName.toLowerCase().includes(searchText.toLowerCase()) && !item.clientName.toLowerCase().includes(searchText.toLowerCase())) {
      return null
    }
    
    if (filterPriority !== 'All' && item.priority !== filterPriority) {
      return null
    }

    return (
      <View style={[
        styles.card, 
        { 
          backgroundColor: colors.card, 
          borderColor: colors.border,
        }
      ]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.title, { color: colors.text, marginBottom: 0 }]}>{item.siteName}</Text>
          {darkMode ? (
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
              <Text style={{ color: colors.textMuted, fontSize: 10, fontWeight: 'bold' }}>{item.priority}</Text>
            </View>
          ) : (
            <View style={{ backgroundColor: getPriorityColor(item.priority) + '22', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
              <Text style={{ color: getPriorityColor(item.priority), fontSize: 10, fontWeight: 'bold' }}>{item.priority}</Text>
            </View>
          )}
        </View>
        <Text style={{ color: colors.textMuted, marginTop: 4 }}>Client: {item.clientName}</Text>
        <Text style={{ color: colors.textMuted }}>Date: {item.date}</Text>
        {!darkMode && <Text style={{ color: colors.textMuted }}>Priority: {item.priority}</Text>}
        
        <View style={styles.row}>
          <Pressable 
            style={[
              styles.btnBlue, 
              darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: colors.primary }
            ]} 
            onPress={() => handleView(item)}
          >
            <Text style={[styles.btnText, { color: darkMode ? colors.primary : 'white' }]}>View</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.btnRed, 
              darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border } : { backgroundColor: colors.danger }
            ]} 
            onPress={() => handleDelete(item.id)}
          >
            <Text style={[styles.btnText, { color: darkMode ? colors.textMuted : 'white' }]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <Text style={[styles.headerText, { color: colors.headerText }]}>Survey History</Text>
      </View>

      <View style={styles.search}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
          placeholder="Search by Site or Client..."
          placeholderTextColor={colors.textMuted}
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.filterRow}>
          <Text style={[styles.filterLabel, { color: colors.text }]}>Priority: </Text>
          {['All', 'High', 'Medium', 'Low'].map(p => {
            const isActive = filterPriority === p
            return (
              <Pressable 
                key={p} 
                style={[
                  isActive ? styles.filterBtnActive : styles.filterBtn, 
                  isActive ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.border }
                ]} 
                onPress={() => setFilterPriority(p)}
              >
                <Text 
                  style={[
                    isActive ? styles.filterTextActive : styles.filterText, 
                    { color: isActive ? 'white' : colors.textMuted }
                  ]}
                >
                  {p}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      <FlatList
        data={surveys}
        keyExtractor={(item) => item.id}
        renderItem={renderSurveyItem}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: colors.textMuted }}>No surveys found</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 35,
    paddingBottom: 25,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  search: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
  },
  btnBlue: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10,
  },
  btnRed: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnText: {
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
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
  },
  filterBtnActive: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
  },
  filterText: {
    fontSize: 12,
  },
  filterTextActive: {
    fontSize: 12,
  }
})
