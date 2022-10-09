import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ServiceNotFoundScreen from "../screens/e-commerce/ServiceNotFoundScreen";
import HomeScreen from "../screens/home/HomeScreen";
import InscriptionPartenaireScreen from "../screens/welcome/InscriptionPartenaireScreen";

export default function HomeNavigator() {
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                              <Stack.Screen name='HomeScreen' component={HomeScreen} />
                              <Stack.Screen name="ServiceNotFoundScreen" component={ServiceNotFoundScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                              <Stack.Screen name="InscriptionPartenaireScreen" component={InscriptionPartenaireScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                    </Stack.Navigator>
          )
}