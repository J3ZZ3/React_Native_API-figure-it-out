import React, { useEffect, useState } from 'react'
import { FlatList, View, Text } from 'react-native'
import FAB from '@/components/FAB'
import useFetch from '../../hooks/useFetch'
import UserCard from '@/components/UserCard'

type Props = {}

const Users = (props: Props) => {

    const [users, getFetch] = useFetch()
    const url = process.env.EXPO_PUBLIC_MOCKAPI_URL ?? ''
    console.log({url: process.env.EXPO_PUBLIC_MOCKAPI_URL});

    useEffect(() => {
        getFetch(url, {})
    }, [])

    const deleteUser = (userId: string) => {
        getFetch(url + '/' + userId,{
        method: 'DELETE'
    },userId)
    }
    
  return (
    <>
    <FlatList
    contentContainerStyle={{gap: 10}}
    columnWrapperStyle={{gap: 20}}
    style={{padding: 10}}
    data={users}
    numColumns={2}
    renderItem={({item}) => {
         
            return <UserCard item={item} deleteUser={deleteUser}/>
        
    }}
    />
    <FAB/>
    </>
  )
}

export default Users