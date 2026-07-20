import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Platform, Pressable, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveys } from '../../context/SurveyContext'
import { useTheme } from '../../context/ThemeContext'
import { TextInput, Button, Text, SegmentedButtons, HelperText, Snackbar } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'

const editSchema = z.object({
  siteName: z.string().min(1, 'Site Name is required').min(2, 'Must be at least 2 characters'),
  clientName: z.string().min(1, 'Client Name is required').min(2, 'Must be at least 2 characters'),
  description: z.string().optional(),
  priority: z.enum(['High', 'Medium', 'Low']),
  date: z.string().min(1, 'Date is required'),
})

export default function EditSurvey() {
  const router = useRouter()
  const { currentSurvey, updateSurvey, setCurrentSurvey } = useSurveys()
  const { colors, darkMode } = useTheme()
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      siteName: '',
      clientName: '',
      description: '',
      priority: 'Medium',
      date: '',
    },
  })

  useEffect(() => {
    if (currentSurvey) {
      reset({
        siteName: currentSurvey.siteName || '',
        clientName: currentSurvey.clientName || '',
        description: currentSurvey.description || '',
        priority: currentSurvey.priority || 'Medium',
        date: currentSurvey.date || '',
      })
      setSelectedImage(currentSurvey.photo || null)
    }
  }, [currentSurvey, reset])

  if (!currentSurvey) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.emptyIcon, { backgroundColor: colors.chipBg }]}>
          <Ionicons name="create-outline" size={40} color={colors.primary} />
        </View>
        <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700', marginTop: 16 }}>
          No Survey Selected
        </Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={{ marginTop: 20, borderRadius: 12 }}
          buttonColor={colors.primary}
        >
          Go Back
        </Button>
      </View>
    )
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  const formatDate = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const onSubmit = (data) => {
    const updatedData = { ...currentSurvey, ...data, photo: selectedImage }
    if (updateSurvey) updateSurvey(currentSurvey.id, updatedData)
    if (setCurrentSurvey) setCurrentSurvey(updatedData)
    
    setSnackbarVisible(true)
    setTimeout(() => {
      router.back()
    }, 1500)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <LinearGradient
          colors={['#D97706', '#F59E0B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text variant="headlineSmall" style={styles.headerTitle}>Edit Survey</Text>
          <Text style={styles.headerSub}>Modify the survey details below</Text>
        </LinearGradient>

        <View style={styles.form}>
          <Controller
            control={control}
            name="siteName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  label="Site Name"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.siteName}
                  style={styles.input}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                  outlineStyle={{ borderRadius: 12 }}
                />
                <HelperText type="error" visible={!!errors.siteName}>
                  {errors.siteName?.message}
                </HelperText>
              </View>
            )}
          />

          <Controller
            control={control}
            name="clientName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  label="Client Name"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.clientName}
                  style={styles.input}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                  outlineStyle={{ borderRadius: 12 }}
                />
                <HelperText type="error" visible={!!errors.clientName}>
                  {errors.clientName?.message}
                </HelperText>
              </View>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  label="Description"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={3}
                  style={styles.input}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                  outlineStyle={{ borderRadius: 12 }}
                />
                <HelperText type="error" visible={!!errors.description}>
                  {errors.description?.message}
                </HelperText>
              </View>
            )}
          />

          <Text variant="titleSmall" style={[styles.label, { color: colors.text }]}>Priority Level</Text>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                value={value}
                onValueChange={onChange}
                buttons={[
                  { value: 'High', label: 'High' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'Low', label: 'Low' },
                ]}
                style={styles.segmented}
              />
            )}
          />

          {/* Date Picker */}
          <Controller
            control={control}
            name="date"
            render={({ field: { value } }) => (
              <View style={{ marginTop: 8 }}>
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <View pointerEvents="none">
                    <TextInput
                      label="Date"
                      mode="outlined"
                      value={value}
                      editable={false}
                      right={<TextInput.Icon icon="chevron-down" />}
                      error={!!errors.date}
                      style={styles.input}
                      outlineColor={colors.border}
                      activeOutlineColor={colors.primary}
                      outlineStyle={{ borderRadius: 12 }}
                    />
                  </View>
                </Pressable>
                <HelperText type="error" visible={!!errors.date}>
                  {errors.date?.message}
                </HelperText>

                {showDatePicker && (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(Platform.OS === 'ios')
                      if (selectedDate) {
                        setValue('date', formatDate(selectedDate))
                      }
                    }}
                    themeVariant={darkMode ? 'dark' : 'light'}
                  />
                )}
                {Platform.OS === 'ios' && showDatePicker && (
                  <Button
                    mode="text"
                    onPress={() => setShowDatePicker(false)}
                    style={{ alignSelf: 'flex-end' }}
                    textColor={colors.primary}
                  >
                    Done
                  </Button>
                )}
              </View>
            )}
          />

          {/* Image Upload */}
          <Text variant="titleSmall" style={[styles.label, { color: colors.text, marginTop: 4 }]}>Site Photo</Text>
          {selectedImage ? (
            <View style={[styles.imageCard, { borderColor: colors.cardBorder }]}>
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              <View style={styles.imageActions}>
                <Button
                  mode="outlined"
                  onPress={pickImage}
                  style={{ flex: 1, borderRadius: 10, borderColor: colors.primary }}
                  textColor={colors.primary}
                  compact
                >
                  Change
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => setSelectedImage(null)}
                  style={{ flex: 1, borderRadius: 10, borderColor: colors.danger }}
                  textColor={colors.danger}
                  compact
                >
                  Remove
                </Button>
              </View>
            </View>
          ) : (
            <Pressable
              style={[styles.uploadArea, { borderColor: colors.border, backgroundColor: colors.card }]}
              onPress={pickImage}
            >
              <Ionicons name="image-outline" size={32} color={colors.textMuted} />
              <Text variant="bodyMedium" style={{ color: colors.textMuted, marginTop: 8, fontWeight: '600' }}>
                Tap to select a photo
              </Text>
            </Pressable>
          )}

          <View style={styles.actionRow}>
            <Button
              mode="outlined"
              onPress={() => router.back()}
              style={[styles.actionBtn, { borderColor: colors.danger }]}
              textColor={colors.danger}
              contentStyle={{ paddingVertical: 4 }}
              labelStyle={{ fontWeight: '700' }}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={[styles.actionBtn]}
              buttonColor={colors.success}
              contentStyle={{ paddingVertical: 4 }}
              labelStyle={{ fontWeight: '700' }}
            >
              Update
            </Button>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={{ backgroundColor: colors.success, borderRadius: 12, marginBottom: 80 }}
      >
        Survey updated successfully
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
    gap: 6,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  headerSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  form: {
    padding: 20,
    marginTop: -8,
  },
  input: {
    marginBottom: 0,
  },
  label: {
    marginBottom: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  segmented: {
    marginBottom: 4,
  },
  uploadArea: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  imageCard: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 4,
  },
  imagePreview: {
    width: '100%',
    height: 200,
  },
  imageActions: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 14,
  },
})
