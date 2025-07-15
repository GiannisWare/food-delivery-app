import {View, Text, Button, Alert} from 'react-native'
import React from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [form, setForm] = React.useState({name: '', email: '', password: ''});

    const submit = async () => {

        const name = form.name.trim();
        const email = form.email.trim();
        const password = form.password;

        if (!form.name || !form.email || !form.password) return Alert.alert('error', 'Please fill all the required fields');

        setIsSubmitting(true);

        try {
            console.log("Creating user with email:", email);
            await createUser({name, email, password});


            router.replace('/');
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5 ">


            <CustomInput placeholder="Enter your full name" value={form.name}
                         onChangeText={(text) => setForm((prev) => ({
                             ...prev, name: text
                         }))} label='Full Name'/>

            <CustomInput placeholder="Enter your email" value={form.email} onChangeText={(text) => setForm((prev) => ({
                ...prev, email: text.trim()
            }))} label='Email' keyboardType='email-address'/>

            <CustomInput placeholder="Enter your password" value={form.password}
                         onChangeText={(text) => setForm((prev) => ({
                             ...prev, password: text
                         }))} label='Password' secureTextEntry={true}/>
            <CustomButton title='Sign Up' isLoading={isSubmitting} onPress={submit}/>
            <View className="flex justify-center mt-5 flex-row gap-5">
                <Text className='base-regular text-gray-100'>
                    Already have an account?
                </Text>
                <Link href='/SignIn' className='base-bold text-primary'>Sign in!</Link>
            </View>
        </View>
    )
}
export default SignUp
