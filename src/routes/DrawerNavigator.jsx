import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import DrawerContent from "../components/app/DrawerContent";
import CommandeEmiseScreen from "../screens/e-commerce/CommandeEmiseScreen";
import HomeScreen from "../screens/home/HomeScreen";
import RestaurantHomeScreen from "../screens/restaurant/RestaurantHomeScreen";
import EcommerceNavigator from "./EcommerceNavigator";
import HomeNavigator from "./HomeNavigator";
import RestaurantNavigator from "./RestaurantNavigator";

export default function DrawerNavigator() {
          const Drawer = createDrawerNavigator()
          return (
                    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerContent {...props} />}>
                              <Drawer.Screen name='HomeNavigator' component={HomeNavigator} />
                              <Drawer.Screen name='EcommerceNavigator' component={EcommerceNavigator} />
                              <Drawer.Screen name='RestaurantNavigator' component={RestaurantNavigator} />
                              <Drawer.Screen name='CommandeEmiseScreen' component={CommandeEmiseScreen} />
                    </Drawer.Navigator>
          )
}