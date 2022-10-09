import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import ServiceNotFoundScreen from '../screens/e-commerce/ServiceNotFoundScreen';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import InscriptionPartenaireScreen from '../screens/welcome/InscriptionPartenaireScreen';
export default function RootNavigator() {
          const Stack = createStackNavigator()
          return (
                    <NavigationContainer
                              theme={{
                                        colors: {
                                                  background: "#fff",
                                        }
                              }}>
                              <Stack.Navigator screenOptions={{ headerShown: false }}>
                                        <Stack.Screen name='Root' component={DrawerNavigator} options={{ headerShown: false }} />
                              </Stack.Navigator>
                    </NavigationContainer>
          )
}