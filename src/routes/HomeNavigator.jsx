import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AccueilSearchProduitScreen from "../screens/e-commerce/AccueilSearchProduitScreen";
import ProduitFormulaireScreen from "../screens/e-commerce/ProduitFormulaireScreen";
import ServiceNotFoundScreen from "../screens/e-commerce/ServiceNotFoundScreen";
import HomeScreen from "../screens/home/HomeScreen";
import InscriptionPartenaireScreen from "../screens/welcome/InscriptionPartenaireScreen";
import { Host } from "react-native-portalize";
import EcommerceHomeScreen from "../screens/e-commerce/EcommerceHomeScreen";
import HomeAllServiceScreen from "../screens/home/HomeAllServiceScreen";
import ProductDetailsScreen from "../screens/e-commerce/ProductDetailsScreen";
import ApprovisionnementScreen from "../screens/e-commerce/ApprovisionnementScreen";
import PaymentScreen from "../screens/home/PaymentScreen";
import Header from "../components/app/Header";

export default function HomeNavigator() {
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator screenOptions={{ header: () => <Header  /> }}>
                              <Stack.Screen name='HomeScreen' component={HomeScreen} />
                              <Stack.Screen name="EcommerceHomeScreen" component={EcommerceHomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                              <Stack.Screen name="HomeAllServiceScreen" component={HomeAllServiceScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                              <Stack.Screen name="ServiceNotFoundScreen" component={ServiceNotFoundScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
                              <Stack.Screen name="InscriptionPartenaireScreen" component={InscriptionPartenaireScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }} />
                              <Stack.Screen name="AccueilSearchProduitScreen" component={AccueilSearchProduitScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                              <Stack.Screen name="ProduitFormulaireScreen" component={ProduitFormulaireScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                              <Stack.Screen name="ProductDetailScreen" component={ProductDetailsScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                              <Stack.Screen name="ApprovisionnementScreen" component={ApprovisionnementScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}/>
                              <Stack.Screen name='PaymentScreen' component={PaymentScreen}/>
                   
                    </Stack.Navigator>
          )
}