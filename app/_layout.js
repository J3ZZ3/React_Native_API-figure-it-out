import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Image, ImageBackground, View, Text } from "react-native";
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export default function Layout() {

  const [location, setLocation] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }
  useEffect(() => {
    console.log({location: location});
    
  }, [location]);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <Text>Hello</Text>
      </View>
    </GestureHandlerRootView>
  );
}
