import React from 'react';
import { View, FlatList, Button } from 'react-native';
import ImageItem from '../components/ImageItem';
import useImages from '../hooks/useImages';

const GalleryScreen = ({ navigation }) => {
  const { images, captureImage } = useImages();

  return (
    <View>
      <Button title="Capture Image" onPress={captureImage} />
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <ImageItem image={item} onPress={() => navigation.navigate('ImageDetail', { imageId: item.id })} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default GalleryScreen;
