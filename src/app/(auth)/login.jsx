import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, Pressable, Image } from 'react-native'
import { Text, TextInput, Button, HelperText } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter, Link } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ionicons } from '@expo/vector-icons'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Login() {
  const router = useRouter()
  const { colors, darkMode } = useTheme()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    await login(data.email, data.password)
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        
        {/* Top Gradient Header */}
        <LinearGradient
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
            <Ionicons name="map-outline" size={54} color="#FFFFFF" />
          </View>
          <Text variant="headlineMedium" style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue to Smart Survey</Text>
        </LinearGradient>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  label="Email Address"
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.email}
                  style={styles.input}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                  outlineStyle={{ borderRadius: 12 }}
                />
                <HelperText type="error" visible={!!errors.email}>
                  {errors.email?.message}
                </HelperText>
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.password}
                  right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
                  style={styles.input}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                  outlineStyle={{ borderRadius: 12 }}
                />
                <HelperText type="error" visible={!!errors.password}>
                  {errors.password?.message}
                </HelperText>
              </View>
            )}
          />

          <Pressable style={styles.forgotPassword}>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Forgot Password?</Text>
          </Pressable>

          {/* Login Button */}
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <Button 
              mode="contained" 
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={{ fontSize: 16, fontWeight: '700', letterSpacing: 0.5 }}
              style={{ backgroundColor: 'transparent' }}
            >
              Sign In
            </Button>
          </LinearGradient>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={{ color: colors.textSecondary, paddingHorizontal: 10 }}>Or continue with</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          {/* Social Auth */}
          <View style={styles.socialRow}>
            <Pressable style={[styles.socialBtn, { borderColor: colors.border, backgroundColor: colors.card }]} onPress={() => login('social@google.com', 'social')}>
              <Image 
                source={require('../../../assets/images/google.png')} 
                style={{ width: 22, height: 22 }} 
              />
              <Text style={{ marginLeft: 8, fontWeight: '600', color: colors.text }}>Google</Text>
            </Pressable>
            
            <Pressable style={[styles.socialBtn, { borderColor: colors.border, backgroundColor: colors.card }]} onPress={() => login('social@apple.com', 'social')}>
              <Ionicons name="logo-apple" size={24} color={darkMode ? "#FFFFFF" : "#000000"} />
              <Text style={{ marginLeft: 8, fontWeight: '600', color: colors.text }}>Apple</Text>
            </Pressable>
          </View>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={{ color: colors.textSecondary }}>Don't have an account? </Text>
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Text style={{ color: colors.primary, fontWeight: '700' }}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
  },
  formContainer: {
    padding: 24,
    paddingTop: 40,
  },
  input: {
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -4,
  },
  gradientBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 24,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
