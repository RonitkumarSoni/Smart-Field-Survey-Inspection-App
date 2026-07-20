import React from 'react'
import { View, StyleSheet, ScrollView, Platform } from 'react-native'
import { Text, List, Switch, Button, Divider, Dialog, Portal } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useSurveys } from '../../context/SurveyContext'
import { useTheme } from '../../context/ThemeContext'

export default function Settings() {
  const { surveys } = useSurveys()
  const { colors, darkMode, toggleTheme } = useTheme()
  const [clearDialogVisible, setClearDialogVisible] = React.useState(false)

  const handleClearData = () => {
    setClearDialogVisible(true)
  }

  const confirmClear = () => {
    setClearDialogVisible(false)
    // Would clear data here
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Gradient Header */}
        <LinearGradient
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >

          <Text variant="headlineSmall" style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSub}>Customize your app experience</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Appearance Section */}
          <Text variant="titleSmall" style={[styles.sectionLabel, { color: colors.textMuted }]}>APPEARANCE</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <List.Item
              title="Dark Mode"
              description={darkMode ? "Currently using dark theme" : "Currently using light theme"}
              left={() => (
                <View style={[styles.listIcon, { backgroundColor: darkMode ? '#312E81' : '#FEF3C7' }]}>
                  <Ionicons name={darkMode ? 'moon' : 'sunny'} size={20} color={darkMode ? '#818CF8' : '#D97706'} />
                </View>
              )}
              right={() => (
                <Switch
                  value={darkMode}
                  onValueChange={toggleTheme}
                  color={colors.primary}
                />
              )}
              titleStyle={{ color: colors.text, fontWeight: '600' }}
              descriptionStyle={{ color: colors.textMuted, fontSize: 12 }}
              style={{ paddingVertical: 8 }}
            />
          </View>

          {/* App Info Section */}
          <Text variant="titleSmall" style={[styles.sectionLabel, { color: colors.textMuted }]}>APP INFO</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <List.Item
              title="Version"
              description="1.0.0"
              left={() => (
                <View style={[styles.listIcon, { backgroundColor: colors.chipBg }]}>
                  <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
                </View>
              )}
              titleStyle={{ color: colors.text, fontWeight: '600' }}
              descriptionStyle={{ color: colors.textMuted, fontSize: 12 }}
            />
            <Divider style={{ backgroundColor: colors.border, marginHorizontal: 16 }} />
            <List.Item
              title="Total Surveys"
              description={`${surveys.length} surveys created`}
              left={() => (
                <View style={[styles.listIcon, { backgroundColor: colors.chipBg }]}>
                  <Ionicons name="documents-outline" size={20} color={colors.primary} />
                </View>
              )}
              titleStyle={{ color: colors.text, fontWeight: '600' }}
              descriptionStyle={{ color: colors.textMuted, fontSize: 12 }}
            />
            <Divider style={{ backgroundColor: colors.border, marginHorizontal: 16 }} />
            <List.Item
              title="Developer"
              description="Smart Field Survey Team"
              left={() => (
                <View style={[styles.listIcon, { backgroundColor: colors.chipBg }]}>
                  <Ionicons name="code-slash-outline" size={20} color={colors.primary} />
                </View>
              )}
              titleStyle={{ color: colors.text, fontWeight: '600' }}
              descriptionStyle={{ color: colors.textMuted, fontSize: 12 }}
            />
            <Divider style={{ backgroundColor: colors.border, marginHorizontal: 16 }} />
            <List.Item
              title="Built With"
              description="React Native + Expo SDK 54"
              left={() => (
                <View style={[styles.listIcon, { backgroundColor: colors.chipBg }]}>
                  <Ionicons name="rocket-outline" size={20} color={colors.primary} />
                </View>
              )}
              titleStyle={{ color: colors.text, fontWeight: '600' }}
              descriptionStyle={{ color: colors.textMuted, fontSize: 12 }}
            />
          </View>

          {/* Danger Zone */}
          <Text variant="titleSmall" style={[styles.sectionLabel, { color: colors.danger }]}>DANGER ZONE</Text>
          <View style={[styles.card, { backgroundColor: colors.dangerLight, borderColor: colors.danger + '30' }]}>
            <View style={styles.dangerContent}>
              <View>
                <Text variant="titleSmall" style={{ color: colors.danger, fontWeight: '700' }}>Clear All Data</Text>
                <Text variant="bodySmall" style={{ color: colors.danger + 'AA', marginTop: 2 }}>
                  This will remove all surveys permanently
                </Text>
              </View>
              <Button
                mode="outlined"
                onPress={handleClearData}
                style={{ borderColor: colors.danger, borderRadius: 10 }}
                textColor={colors.danger}
                labelStyle={{ fontWeight: '700', fontSize: 12 }}
                compact
              >
                Clear
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Clear Dialog */}
      <Portal>
        <Dialog visible={clearDialogVisible} onDismiss={() => setClearDialogVisible(false)} style={{ borderRadius: 16 }}>
          <Dialog.Icon icon="delete-alert" color={colors.danger} />
          <Dialog.Title style={{ textAlign: 'center' }}>Clear All Data?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
              All surveys will be permanently deleted. This action cannot be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setClearDialogVisible(false)}>Cancel</Button>
            <Button onPress={confirmClear} textColor={colors.danger}>Clear All</Button>
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
  content: {
    padding: 16,
  },
  sectionLabel: {
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 8,
    marginLeft: 4,
    fontSize: 11,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  dangerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
})
