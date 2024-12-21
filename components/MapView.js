import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ images }) => {
  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map}>
        {images.map(image => (
          <Marker
            key={image.id}
            coordinate={{ latitude: image.latitude, longitude: image.longitude }}
            title={`Image taken at ${image.timestamp}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapViewComponent; 