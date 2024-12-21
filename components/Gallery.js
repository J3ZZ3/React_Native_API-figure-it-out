import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gallery = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const existingMedia = await AsyncStorage.getItem('media');
      if (existingMedia) {
        setMedia(JSON.parse(existingMedia));
      }
    } catch (error) {
      console.error("Error loading media:", error);
    }
  };

  const playRecording = (uri) => {
    // Implement your logic to play the video recording
    Alert.alert("Playing video from:", uri);
  };

  const renderItem = ({ item }) => {
    if (item.type === 'photo') {
      return <Image source={{ uri: item.uri }} style={styles.image} />;
    } else if (item.type === 'video') {
      return (
        <TouchableOpacity onPress={() => playRecording(item.uri)}>
          <Text style={styles.videoItem}>{item.uri}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media Gallery</Text>
      <FlatList
        data={media}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
        numColumns={2} // Display items in 2 columns
        columnWrapperStyle={styles.row} // Style for the row
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  videoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Gallery; 