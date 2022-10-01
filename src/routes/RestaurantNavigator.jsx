import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import MenuDetailScreen from "../screens/restaurant/MenuDetailScreen";
import RestaurantHomeScreen from "../screens/restaurant/RestaurantHomeScreen";

export default function RestaurantNavigator(){
        const Stack = createStackNavigator()
        return(
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="RestaurantHomeScreen" component={RestaurantHomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                        <Stack.Screen name="MenuDetailScreen" component={MenuDetailScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                </Stack.Navigator>
        )
}