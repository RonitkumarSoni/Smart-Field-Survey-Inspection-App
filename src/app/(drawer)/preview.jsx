import React from 'react'
import { View, ScrollView, Image, StyleSheet, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../context/SurveyContext'
import { Text, Button, Chip, Divider, Snackbar } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import MyMap from '../../components/MyMap'
import { useTheme } from '../../context/ThemeContext'

export default function SurveyPreview() {
  const router = useRouter()
  const { currentSurvey, submitSurvey } = useSurveys()
  const { colors, darkMode } = useTheme()
  const [snackbarVisible, setSnackbarVisible] = React.useState(false)

  if (!currentSurvey) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.emptyIcon, { backgroundColor: colors.chipBg }]}>
          <Ionicons name="document-outline" size={40} color={colors.primary} />
        </View>
        <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700', marginTop: 16 }}>
          No Survey Selected
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textMuted, marginTop: 6 }}>
          Go back and select a survey to preview
        </Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={{ marginTop: 20, borderRadius: 12 }}
          buttonColor={colors.primary}
          icon="arrow-left"
        >
          Go Back
        </Button>
      </View>
    )
  }

  const handleSubmit = () => {
    submitSurvey(currentSurvey.id)
    setSnackbarVisible(true)
    setTimeout(() => {
      router.push('/(drawer)/(tabs)/history')
    }, 1500)
  }

  const getPriorityColor = (p) => {
    if (p === 'High') return colors.danger
    if (p === 'Medium') return colors.warning
    return colors.success
  }

  const getStatusColor = (s) => {
    return s === 'submitted' ? colors.statusSubmitted : colors.statusDraft
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

          <Text variant="headlineSmall" style={styles.headerTitle}>Survey Preview</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Status + Priority Row */}
          <View style={styles.chipRow}>
            <Chip 
              icon={() => <View style={[styles.chipDot, { backgroundColor: getStatusColor(currentSurvey.status) }]} />}
              style={[styles.chip, { backgroundColor: getStatusColor(currentSurvey.status) + '20' }]}
              textStyle={{ color: getStatusColor(currentSurvey.status), fontWeight: '700', fontSize: 12 }}
            >
              {currentSurvey.status === 'submitted' ? 'Submitted' : 'Draft'}
            </Chip>
            <Chip 
              style={[styles.chip, { backgroundColor: getPriorityColor(currentSurvey.priority) + '18' }]}
              textStyle={{ color: getPriorityColor(currentSurvey.priority), fontWeight: '700', fontSize: 12 }}
            >
              {currentSurvey.priority} Priority
            </Chip>
          </View>

          {/* Survey Details Card */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="document-text" size={20} color={colors.primary} />
              <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700' }}>Survey Details</Text>
            </View>
            <Divider style={{ backgroundColor: colors.border, marginBottom: 12 }} />
            {[
              { label: 'Site Name', value: currentSurvey.siteName },
              { label: 'Client', value: currentSurvey.clientName },
              { label: 'Description', value: currentSurvey.description || 'No description' },
              { label: 'Date', value: currentSurvey.date },
            ].map((item, i) => (
              <View key={i} style={styles.detailRow}>
                <Text variant="labelMedium" style={{ color: colors.textMuted, width: 90 }}>{item.label}</Text>
                <Text variant="bodyMedium" style={{ color: colors.text, fontWeight: '500', flex: 1 }}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Contact Card */}
          {(currentSurvey.contactName || currentSurvey.contactPhone) && (
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="person" size={20} color={colors.primary} />
                <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700' }}>Contact</Text>
              </View>
              <Divider style={{ backgroundColor: colors.border, marginBottom: 12 }} />
              {currentSurvey.contactName && (
                <View style={styles.detailRow}>
                  <Text variant="labelMedium" style={{ color: colors.textMuted, width: 90 }}>Name</Text>
                  <Text variant="bodyMedium" style={{ color: colors.text, fontWeight: '500' }}>{currentSurvey.contactName}</Text>
                </View>
              )}
              {currentSurvey.contactPhone && (
                <View style={styles.detailRow}>
                  <Text variant="labelMedium" style={{ color: colors.textMuted, width: 90 }}>Phone</Text>
                  <Text variant="bodyMedium" style={{ color: colors.text, fontWeight: '500' }}>{currentSurvey.contactPhone}</Text>
                </View>
              )}
            </View>
          )}

          {/* Notes */}
          {currentSurvey.notes && (
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="chatbox-ellipses" size={20} color={colors.primary} />
                <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700' }}>Notes</Text>
              </View>
              <Divider style={{ backgroundColor: colors.border, marginBottom: 12 }} />
              <Text variant="bodyMedium" style={{ color: colors.text, lineHeight: 22 }}>{currentSurvey.notes}</Text>
            </View>
          )}

          {/* Photo */}
          {currentSurvey.photo && (
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="image" size={20} color={colors.primary} />
                <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700' }}>Photo</Text>
              </View>
              <Image source={{ uri: currentSurvey.photo }} style={styles.photo} />
            </View>
          )}

          {/* Map */}
          {currentSurvey.latitude && currentSurvey.longitude && (
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder, overflow: 'hidden' }]}>
              <View style={[styles.cardHeader, { paddingBottom: 12 }]}>
                <Ionicons name="map" size={20} color={colors.primary} />
                <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700' }}>Location</Text>
              </View>
              <MyMap
                latitude={parseFloat(currentSurvey.latitude)}
                longitude={parseFloat(currentSurvey.longitude)}
                style={styles.map}
              />
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <Button
              mode="outlined"
              onPress={() => router.push('/(drawer)/edit')}
              icon="pencil"
              style={[styles.actionBtn, { borderColor: colors.warning }]}
              textColor={colors.warning}
              contentStyle={{ paddingVertical: 4 }}
              labelStyle={{ fontWeight: '700' }}
            >
              Edit
            </Button>
            <LinearGradient
              colors={colors.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.actionBtn, { borderRadius: 14, overflow: 'hidden' }]}
            >
              <Button
                mode="contained"
                onPress={handleSubmit}
                icon="check-circle"
                style={{ backgroundColor: 'transparent' }}
                contentStyle={{ paddingVertical: 4 }}
                labelStyle={{ fontWeight: '700' }}
              >
                Submit
              </Button>
            </LinearGradient>
          </View>

          <Button
            mode="text"
            onPress={() => router.back()}
            icon="arrow-left"
            textColor={colors.textMuted}
            style={{ marginTop: 4 }}
          >
            Go Back
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={{ backgroundColor: colors.success, borderRadius: 12, marginBottom: 80 }}
      >
        Survey submitted successfully
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  content: {
    padding: 16,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    borderRadius: 10,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  map: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 14,
  },
})
