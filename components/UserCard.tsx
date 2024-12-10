import React from 'react'
import { View, Pressable, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

type UserType = {
    createdAt: string,
    avatar: string,
    name: string,
    id: string
}

type UserProps = {
    deleteUser: (value: string) => void,
    item: UserType
}


const UserCard: React.FC<UserProps> = ({deleteUser, item}) => {
  return (
        <View style={styles.container}>
        <Image style={styles.Image} source={{uri: item.avatar}}/>
        <View style={styles.textContainer}>
            <Text>{item.name}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Link asChild href={{ pathname: "/users/[id]", params: { id: item.id }}}>
            <Pressable style={{...styles.button, ...styles.viewButton}}>
                <Text> View </Text>
            </Pressable>
            </Link>
            <Pressable onPress={() => deleteUser(item.id)} style={{...styles.button, ...styles.deleteButton}} >
                <Text>Delete</Text>
            </Pressable>
        </View>
        </View>
  )
}

export default UserCard

const styles = StyleSheet.create({
    container: {
        width: (Dimensions.get('window').width - 60) / 2,
        height: 200,
        borderRadius: 20,
        backgroundColor: '#000000',
        overflow: 'hidden',
        justifyContent: 'space-between'
    },
    Image: {
        height: '100%'
    },
    textContainer:{
        paddingHorizontal: 20
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 20,
        position: 'absolute',
        bottom: 0
    },
    button:{
        borderRadius: 20,
        padding: 10,
    },
    viewButton: {
        backgroundColor: '#BDBDBD'
    },
    deleteButton: {
        backgroundColor: '#FF3131'
    }
})