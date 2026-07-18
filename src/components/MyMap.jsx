import React from 'react'
import MapView, { Marker } from 'react-native-maps'

export default function MyMap({ latitude, longitude, style }) {
  return (
    <MapView
      style={style}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title="Location"
      />
    </MapView>
  )
}
