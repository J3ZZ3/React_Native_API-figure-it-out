import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gallery = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const existingRecordings = await AsyncStorage.getItem('recordings');
      if (existingRecordings) {
        setRecordings(JSON.parse(existingRecordings));
      }
    } catch (error) {
      console.error("Error loading recordings:", error);
    }
  };

  const playRecording = (uri) => {
    // Implement your logic to play the video recording
    Alert.alert("Playing video from:", uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Recordings</Text>
      <FlatList
        data={recordings}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playRecording(item)}>
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        )}
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
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Gallery; 