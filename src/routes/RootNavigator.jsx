import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import EcommerceHomeScreen from '../screens/e-commerce/EcommerceHomeScreen'
import HomeScreen from '../screens/home/HomeScreen'
import LoginScreen from '../screens/welcome/LoginScreen'

export default function RootNavigator() {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer
            theme={{
                colors: {
                    background: "#fff",
                },
            }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='EcommerceHomeScreen' component={EcommerceHomeScreen} />
                <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}