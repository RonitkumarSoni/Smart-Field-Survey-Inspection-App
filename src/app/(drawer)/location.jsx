import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Platform } from 'react-native'
import { Text, Button, Snackbar } from 'react-native-paper'
import * as Location from 'expo-location'
import * as Clipboard from 'expo-clipboard'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import MyMap from '../../components/MyMap'
import { useTheme } from '../../context/ThemeContext'

export default function LocationScreen() {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' })
  const { colors, darkMode } = useTheme()

  const getLocation = async () => {
    try {
      setLoading(true)
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setSnackbar({ visible: true, message: 'Location permission denied' })
        setLoading(false)
        return
      }
      const result = await Location.getCurrentPositionAsync({})
      setLocation(result.coords)
      setLoading(false)
    } catch (_error) {
      setSnackbar({ visible: true, message: 'Could not get location' })
      setLoading(false)
    }
  }

  const copyLocation = async () => {
    if (location) {
      const text = `${location.latitude}, ${location.longitude}`
      await Clipboard.setStringAsync(text)
      setSnackbar({ visible: true, message: 'Location copied to clipboard' })
    }
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

          <Text variant="headlineSmall" style={styles.headerTitle}>Location</Text>
          <Text style={styles.headerSub}>Get your current GPS coordinates</Text>
        </LinearGradient>

        <View style={styles.content}>
          {location ? (
            <>
              {/* Coordinates Card */}
              <View style={[styles.coordCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                {[
                  { label: 'Latitude', value: location.latitude.toFixed(6), icon: 'navigate-outline', color: colors.primary },
                  { label: 'Longitude', value: location.longitude.toFixed(6), icon: 'compass-outline', color: colors.accent },
                  { label: 'Accuracy', value: `${location.accuracy?.toFixed(1)} meters`, icon: 'radio-button-on-outline', color: colors.success },
                ].map((item, i) => (
                  <View key={i} style={[styles.coordRow, i < 2 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                    <View style={[styles.coordIcon, { backgroundColor: item.color + '15' }]}>
                      <Ionicons name={item.icon} size={20} color={item.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="labelSmall" style={{ color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {item.label}
                      </Text>
                      <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700' }}>
                        {item.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Map */}
              <View style={[styles.mapCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <MyMap 
                  latitude={location.latitude} 
                  longitude={location.longitude} 
                  style={styles.map} 
                />
              </View>
            </>
          ) : (
            <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={[styles.emptyIcon, { backgroundColor: colors.chipBg }]}>
                <Ionicons name="location-outline" size={40} color={colors.primary} />
              </View>
              <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700', marginTop: 16 }}>
                No Location Data
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.textMuted, marginTop: 6, textAlign: 'center' }}>
                Tap the button below to fetch your current GPS coordinates
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <Button
            mode="contained"
            onPress={getLocation}
            loading={loading}
            icon="crosshairs-gps"
            style={[styles.actionBtn]}
            buttonColor={colors.primary}
            contentStyle={{ paddingVertical: 6 }}
            labelStyle={{ fontWeight: '700', fontSize: 15 }}
          >
            {location ? 'Refresh Location' : 'Get Location'}
          </Button>

          {location && (
            <Button
              mode="outlined"
              onPress={copyLocation}
              icon="content-copy"
              style={[styles.actionBtn, { borderColor: colors.primary }]}
              textColor={colors.primary}
              contentStyle={{ paddingVertical: 6 }}
              labelStyle={{ fontWeight: '700', fontSize: 15 }}
            >
              Copy Coordinates
            </Button>
          )}
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '' })}
        duration={2000}
        style={{ borderRadius: 12, marginBottom: 80 }}
      >
        {snackbar.message}
      </Snackbar>
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
  coordCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  coordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  coordIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    width: '100%',
    height: 280,
  },
  emptyCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 40,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    borderRadius: 14,
    marginBottom: 10,
  },
})
