import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AllProductsScreen from "../screens/e-commerce/AllProductsScreen";
import EcommerceHomeScreen from "../screens/e-commerce/EcommerceHomeScreen";
import NewProductDetailScreen from "../screens/e-commerce/NewProductDetailScreen";
import NewProductScreen from "../screens/e-commerce/NewProductScreen";
import ProductDetailsScreen from "../screens/e-commerce/ProductDetailsScreen";

export default function EcommerceNavigator() {
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                              <Stack.Screen name="EcommerceHomeScreen" component={EcommerceHomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}} />
                              <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                              <Stack.Screen name="NewProductDetail" component={NewProductDetailScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                              <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                    </Stack.Navigator>
          )
}