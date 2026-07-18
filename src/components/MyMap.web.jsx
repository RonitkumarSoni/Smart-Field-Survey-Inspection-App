import React from 'react'
import { View, Text } from 'react-native'

export default function MyMap({ style }) {
  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderWidth: 1, borderColor: '#ccc' }]}>
      <Text style={{ color: 'blue' }}>[Map is only available on Mobile App]</Text>
    </View>
  )
}
