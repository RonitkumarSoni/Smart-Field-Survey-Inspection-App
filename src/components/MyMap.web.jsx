import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../context/ThemeContext'

export default function MyMap({ style }) {
  const { colors } = useTheme()
  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }]}>
      <Text style={{ color: colors.text }}>[Map is only available on Mobile App]</Text>
    </View>
  )
}
