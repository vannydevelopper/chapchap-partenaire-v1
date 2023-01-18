import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialTabBar, MaterialTabItem, Tabs } from 'react-native-collapsible-tab-view'
import ShopCollapsableHeader, { HEADER_HEIGHT } from "../components/ecommerce/home/ShopCollapsableHeader";
import { AntDesign } from '@expo/vector-icons'; 
import ProductsTabScreen from "../screens/e-commerce/tabs/ProductsTabScreen";
const TopTab = createMaterialTopTabNavigator()

export default function EcommerceTabs({ shop }) {
          const [activeIndex, setActiveIndex] = useState(0)
          const Header = () => {
                    return <ShopCollapsableHeader shop={shop} />
          }
          const renderItem = React.useCallback(({ index }) => {
                    return (
                              <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
                    )
          }, [])
          const DATA = [0, 1, 2, 3, 4]

          const tabBar = props => (
                    <MaterialTabItem
                              {...props}
                    />
          )
          return (
                    <Tabs.Container
                              renderHeader={Header}
                              headerHeight={HEADER_HEIGHT}
                              TabBarComponent={props => {
                                        return <MaterialTabBar
                                                  {...props}
                                                  indicatorStyle={{ backgroundColor: '#949494', height: 2, elevation: 0, borderBottomWidth: 0 }}
                                                  inactiveColor='#777'
                                                  tabStyle={{ elevation: 0, height: "100%" }}
                                                  style={{ elevation: 0, paddingHorizontal: 10, height: 60 }}
                                                  labelStyle={{ color: 'red', fontWeight: 'bold', paddingHorizontal: 10 }}
                                                  scrollEnabled
                                                  contentContainerStyle={{ elevation: 0 }}
                                        />
                              }}
                              onIndexChange={index => setActiveIndex(index)}
                    >
                              <Tabs.Tab name="produits" label={<View style={{ flexDirection: 'row', alignItems: "center"}}>
                                        <Text style={[{ fontWeight: "bold" }, { color: activeIndex == 0 ? '#000' : "#777"}]}>Produits</Text>
                                        <AntDesign name="pluscircle" size={18} color={activeIndex == 0 ? '#000' : "#777"} style={{ marginLeft: 5 }} />
                              </View>}>
                                        <ProductsTabScreen shop={shop} />
                              </Tabs.Tab>
                              <Tabs.Tab name="commandes" label={"Commandes"}>
                                        <Tabs.ScrollView>
                                                  <View style={[styles.box, styles.boxA]} />
                                                  <View style={[styles.box, styles.boxB]} />
                                        </Tabs.ScrollView>
                              </Tabs.Tab>
                              <Tabs.Tab name="supp" label="Revues">
                                        <Tabs.ScrollView>
                                                  <View style={[styles.box, styles.boxA]} />
                                                  <View style={[styles.box, styles.boxB]} />
                                        </Tabs.ScrollView>
                              </Tabs.Tab>
                              <Tabs.Tab name="shop" label="Suivis">
                                        <Tabs.ScrollView>
                                                  <View style={[styles.box, styles.boxA]} />
                                                  <View style={[styles.box, styles.boxB]} />
                                        </Tabs.ScrollView>
                              </Tabs.Tab>
                    </Tabs.Container>
          )
}

const styles = StyleSheet.create({
          box: {
                    height: 250,
                    width: '100%',
                    marginTop: 10
          },
          boxA: {
                    backgroundColor: 'white',
          },
          boxB: {
                    backgroundColor: '#D8D8D8',
          },
          header: {
                    height: HEADER_HEIGHT,
                    width: '100%',
                    backgroundColor: '#2196f3',
          },
})