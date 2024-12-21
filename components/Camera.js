import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, Pressable, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Camera() {
  const navigation = useNavigation();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const camera = useRef(null);

  // Check if permission is still loading
  if (permission === null || audioPermission === null) {
    return <View />; // or a loading indicator
  }

  // Check if permission is granted
  if (!permission.granted || !audioPermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
        <Text style={styles.message}>We need your permission to record audio</Text>
        <Button onPress={requestAudioPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      await saveMedia(photo.uri, 'photo');
    }
  };

  const recordVideo = async () => {
    if (camera.current) {
      const video = await camera.current.recordAsync();
      await saveMedia(video.uri, 'video');
    }
  };

  const saveMedia = async (uri, type) => {
    try {
      const existingMedia = await AsyncStorage.getItem('media');
      const media = existingMedia ? JSON.parse(existingMedia) : [];
      media.push({ uri, type });
      await AsyncStorage.setItem('media', JSON.stringify(media));
      Alert.alert(`${type.charAt(0).toUpperCase() + type.slice(1)} saved!`);
    } catch (error) {
      console.error("Error saving media:", error);
    }
  };

  const openGallery = () => {
    navigation.navigate('gallery');
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}>
            <Text style={styles.text}><Ionicons name="camera-reverse" size={60} color="white" /></Text>
          </Pressable>
          <Pressable 
            style={styles.captureButton} 
            onPress={takePicture} 
            onLongPress={recordVideo} 
            delayLongPress={500} // Optional: Adjust the delay for long press
          >
            <View style={styles.capture} />
          </Pressable>
          <Pressable style={styles.galleryButton} onPress={openGallery}>
            <Ionicons name="images" size={60} color="white" />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    alignItems: 'center',
  },
  captureButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20, // Add some space between buttons
  },
  capture: {
    borderColor: 'white',
    backgroundColor: 'red',
    borderWidth: 3,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
}); 