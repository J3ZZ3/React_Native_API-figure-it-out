import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, Pressable, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function VideoComponent() {
  const navigation = useNavigation();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const camera = useRef(null);
  let timerInterval = useRef(null);

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

  // Function to toggle recording
  const toggleRecording = async () => {
    try {
      if (camera.current) {
        if (isRecording) {
          // Stop recording
          console.log("Stopping recording...");
          camera.current.stopRecording();
          setIsRecording(false);
          clearInterval(timerInterval.current);
          setRecordingDuration(0);
        } else {
          // Start recording
          console.log("Starting recording...");
          setIsRecording(true);
          const video = await camera.current.recordAsync();
          console.log({ video });
          await saveRecording(video.uri);
          
          // Start the timer
          setRecordingDuration(0);
          timerInterval.current = setInterval(() => {
            setRecordingDuration(prev => prev + 1);
          }, 1000);
          
          // Optional: Stop recording after a certain duration (e.g., 10 seconds)
          setTimeout(() => {
            if (isRecording) {
              camera.current.stopRecording();
              setIsRecording(false);
              clearInterval(timerInterval.current);
            }
          }, 10000); // Adjust the duration as needed
        }
      } else {
        console.error("Camera is not initialized.");
        Alert.alert("Camera is not ready. Please try again.");
      }
    } catch (error) {
      console.error("Error while toggling recording:", error);
      Alert.alert("An error occurred while trying to record video. Please try again.");
    }
  };

  // Function to save recording to AsyncStorage
  const saveRecording = async (uri) => {
    try {
      const existingRecordings = await AsyncStorage.getItem('recordings');
      const recordings = existingRecordings ? JSON.parse(existingRecordings) : [];
      recordings.push(uri);
      await AsyncStorage.setItem('recordings', JSON.stringify(recordings));
      Alert.alert("Recording saved!");
    } catch (error) {
      console.error("Error saving recording:", error);
    }
  };

  // Function to navigate to the gallery
  const goToGallery = () => {
    navigation.navigate('Gallery');
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}>
            <Text style={styles.text}><Ionicons name="camera-reverse" size={60} color="white" /></Text>
          </Pressable>
          <Pressable style={styles.button} onPress={toggleRecording}>
            <Ionicons
              name={isRecording ? "stop-circle" : "radio-button-on"}
              size={60}
              color={isRecording ? "red" : "white"}
            />
          </Pressable>
          <Pressable style={styles.button} onPress={goToGallery}>
            <Text style={styles.text}><Ionicons name="images" size={60} color="white" /></Text>
          </Pressable>
        </View>
      </CameraView>
      {isRecording && (
        <Text style={styles.timer}>{recordingDuration}s</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    margin: 0,
    right: 0,
    bottom: 10,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  timer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    fontSize: 24,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
});
