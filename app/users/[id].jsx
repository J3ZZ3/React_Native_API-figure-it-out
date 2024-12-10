import React, {useState} from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView, NativeSyntheticEvent, TextInputChangeEventData, ImageBackground } from 'react-native'
import CustomInput from '../../components/CustomInput'
import useFetch from '../../hooks/useFetch'
import { useLocalSearchParams } from 'expo-router'

const Add = () => {

    const [name, setName] = useState('');
    const [ImageLink, setImageLink] = useState('');
    const [_, getFetch] = useFetch();
    const params = useLocalSearchParams();
    const url = process.env.EXPO_PUBLIC_MOCKAPI_URL

    console.log({url: url});
    console.log({params: params});
    
    const submitDetails = () => {
      const fullUrl = url + "/" + params.id;
      console.log('Submitting to:', fullUrl); // Log the full URL
      
        getFetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                avatar: ImageLink
            })
        }, params.id)
    }

  return (
    <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          onLoadStart={() => console.log("Loading")}
          onLoadEnd={() => console.log("Loaded")}
          source={{
            uri: "https://i.pinimg.com/736x/59/54/61/59546197baae43e5cd4612bbe1d4424d.jpg",
          }}>
    <ScrollView>
        <CustomInput name="Name" onChange={(text) => setName(text)} error={''} />
        <CustomInput name="Image Link" onChange={(text) => setImageLink(text)} error={''}  />
        <Pressable style={styles.button} onPress={submitDetails}>
              <Text style={styles.buttonText} >
                Add
              </Text>
            </Pressable>
    </ScrollView>
    </ImageBackground> 
)
}

export default Add

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#306A68",
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: 16,
      }
})