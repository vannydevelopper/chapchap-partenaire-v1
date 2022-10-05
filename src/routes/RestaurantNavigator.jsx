import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import MenuDetailScreen from "../screens/restaurant/MenuDetailScreen";
import NewMenuDetailScreen from "../screens/restaurant/NewMenuDetailScreen";
import NewMenuScreen from "../screens/restaurant/NewMenuScreen";
import RestaurantHomeScreen from "../screens/restaurant/RestaurantHomeScreen";

export default function RestaurantNavigator(){
        const Stack = createStackNavigator()
        return(
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="RestaurantHomeScreen" component={RestaurantHomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                        <Stack.Screen name="MenuDetailScreen" component={MenuDetailScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                        <Stack.Screen name="NewMenuScreen"  component={NewMenuScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                        <Stack.Screen name="NewMenuDetailScreen" component={NewMenuDetailScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                </Stack.Navigator>
        )
}