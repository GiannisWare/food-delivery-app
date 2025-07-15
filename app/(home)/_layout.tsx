import {View, Text} from 'react-native'
import React from 'react'
import {Redirect, Slot, Tabs} from "expo-router";
import useAuthStore from "@/store/auth.store";

export default function HomeLayout() {

    const {isAuthenticated} = useAuthStore();

    if (!isAuthenticated)
        return <Redirect href='/SignIn'/>


    return (

        <Tabs>
            <Tabs.Screen name='index' options={{
                title: "Home",

            }}/>

        </Tabs>
    )


}
