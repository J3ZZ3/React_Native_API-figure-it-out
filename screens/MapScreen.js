import React from 'react';
import { View } from 'react-native';
import MapViewComponent from '../components/MapView';
import useImages from '../hooks/useImages';

const MapScreen = () => {
  const { images } = useImages();

  return (
    <View style={{ flex: 1 }}>
      <MapViewComponent images={images} />
    </View>
  );
};

export default MapScreen; 