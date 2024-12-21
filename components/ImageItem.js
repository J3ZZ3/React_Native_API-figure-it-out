import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ImageItem = ({ image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: image.filePath }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default ImageItem;
