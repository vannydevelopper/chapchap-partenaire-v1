import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AccueilSearchProduitScreen from "../screens/e-commerce/AccueilSearchProduitScreen";
import ProduitFormulaireScreen from "../screens/e-commerce/ProduitFormulaireScreen";
import ServiceNotFoundScreen from "../screens/e-commerce/ServiceNotFoundScreen";
import HomeScreen from "../screens/home/HomeScreen";
import InscriptionPartenaireScreen from "../screens/welcome/InscriptionPartenaireScreen";
import { Host } from "react-native-portalize";

export default function HomeNavigator() {
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                              <Stack.Screen name='HomeScreen' component={HomeScreen} />
                              <Stack.Screen name="ServiceNotFoundScreen" component={ServiceNotFoundScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                              <Stack.Screen name="InscriptionPartenaireScreen" component={InscriptionPartenaireScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                              <Stack.Screen name="AccueilSearchProduitScreen" component={AccueilSearchProduitScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                              <Stack.Screen name="ProduitFormulaireScreen" component={ProduitFormulaireScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                    </Stack.Navigator>
          )
}