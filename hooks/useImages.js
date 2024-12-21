import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { init, insertImage } from '../database/db';

const useImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      // Fetch images from SQLite and set state
    };
    fetchImages();
  }, []);

  const addImage = async (filePath, timestamp, latitude, longitude) => {
    await insertImage(filePath, timestamp, latitude, longitude);
    // Update state after adding image
  };

  const captureImage = async () => {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Camera access is required!');
      return;
    }

    // Capture image
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Get location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const timestamp = new Date().toISOString();
      await addImage(result.uri, timestamp, latitude, longitude);
    }
  };

  return { images, addImage, captureImage };
};

export default useImages;