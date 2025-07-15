import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Dimensions,
    ImageBackground,
    Image, ScrollView
} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";
import useAuthStore from "@/store/auth.store";


export default function AuthLayout() {

    const {isAuthenticated} = useAuthStore();

    if (isAuthenticated) return <Redirect href="/"/>

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className='h-full bg-white' keyboardShouldPersistTaps='handled'>

                <View className='w-full relative' style={{
                    height: Dimensions.get('screen').height / 2.25,
                }}>

                    <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg'
                                     resizeMode='stretch'/>
                    <Image
                        source={images.logo}
                        className="size-48 self-center absolute -bottom-16"
                        resizeMode="contain"
                    />

                </View>


                <Slot/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
