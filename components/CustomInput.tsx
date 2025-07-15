import {View, Text, TextInput} from 'react-native'
import React from 'react'
import {CustomInputProps} from "@/type";
import cn from "clsx";


const CustomInput = ({
                         placeholder = "Enter text",
                         value,
                         onChangeText,
                         label,
                         secureTextEntry = false,
                         keyboardType = 'default'
                     }: CustomInputProps) => {

    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View className='w-full'>
            <Text className='label'>{label}</Text>
            <TextInput
                autoCapitalize='none'
                placeholder={placeholder}
                value={value}
                autoCorrect={false}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor='#888'
                className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}
            />
        </View>
    )
}
export default CustomInput
