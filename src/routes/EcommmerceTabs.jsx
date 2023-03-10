import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialTabBar, MaterialTabItem, Tabs } from 'react-native-collapsible-tab-view'
import ShopCollapsableHeader, { HEADER_HEIGHT } from "../components/ecommerce/home/ShopCollapsableHeader";
import { AntDesign } from '@expo/vector-icons';
import ProductsTabScreen from "../screens/e-commerce/tabs/ProductsTabScreen";
import MenuTabScreen from "../screens/restaurant/tabs/MenuTabScreen"
import { useEffect } from "react";
import fetchApi from "../helpers/fetchApi";
import CommandesProductsScreen from "../screens/e-commerce/tabs/CommandesProductsScreen";
import CommandesMenusScreen from "../screens/restaurant/tabs/CommandesMenusScreen"
import ServicesIDS from "../constants/ServicesIDS";
const TopTab = createMaterialTopTabNavigator()

export default function EcommerceTabs({ shop, service }) {
        const [activeIndex, setActiveIndex] = useState(0)
        const [commandes, setCommandes] = useState([])
        const [countProduits, setCountProduits] = useState([])
        const [countMenu, setCountMenu] = useState([])
        const[countRestoCommandes,setCountRestoCommandes] = useState([])

        var serviceResto = ServicesIDS.resto
        var serviceEco = ServicesIDS.ecommerce


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

        useEffect(() => {
                (async () => {
                        try {
                                if(service == serviceEco){
                                        const res = await fetchApi(`/commandes/count/${shop.ID_PARTENAIRE_SERVICE}`)
                                        setCommandes(res.result)
                                }else if(service == serviceResto){
                                        const res = await fetchApi(`/commandes/count/restaurant/${shop.ID_PARTENAIRE_SERVICE}`)
                                        setCountRestoCommandes(res.result)
                                }
                        }
                        catch (error) {
                                console.log(error)
                        }
                })()
        }, [shop])

        useEffect(() => {
                (async () => {
                        try {
                                if (service == serviceEco) {
                                        const res = await fetchApi(`/products/products/count/${shop.ID_PARTENAIRE_SERVICE}`)
                                        setCountProduits(res.result)
                                } else if(service == serviceResto){
                                        const res = await fetchApi(`/resto/menu/restaurant/count/${shop.ID_PARTENAIRE_SERVICE}`)
                                        setCountMenu(res.result)
                                }
                        } catch (error) {
                                console.log(error)
                        }

                })()
        }, [service, serviceEco, serviceResto])


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
                        <Tabs.Tab name="produits" label={<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                {(service != ServicesIDS.ecommerce) ?
                                        <Text style={[{ fontWeight: "bold" }, { color: activeIndex == 0 ? '#000' : "#777" }]} >Menus</Text> :
                                        <Text style={[{ fontWeight: "bold" }, { color: activeIndex == 0 ? '#000' : "#777" }]}>Produits</Text>}

                                {(service != ServicesIDS.serviceResto && countProduits.length > 0) ?
                                        <View style={styles.actionBadge}>
                                                <Text style={styles.actionBadgeText}>{countProduits[0].NBRE_PRODUITS}</Text>
                                        </View> :
                                        <View style={styles.actionBadge}>
                                                <Text style={styles.actionBadgeText}>{countMenu[0]?.NBRE_MENUS}</Text>
                                        </View>
                                }
                                {/* {countProduits.length > 0 ? <View style={styles.actionBadge}>
                                                <Text style={styles.actionBadgeText}>{countProduits[0].NBRE_PRODUITS}</Text>
                                        </View>: null}  */}
                        </View>}>
                                {(service == ServicesIDS.resto && service != ServicesIDS.ecommerce) ?
                                        <MenuTabScreen shop={shop} serviceResto={serviceResto} serviceEco={serviceEco} /> :
                                        <ProductsTabScreen shop={shop} serviceResto={serviceResto} serviceEco={serviceEco} />}
                        </Tabs.Tab>
                        <Tabs.Tab name="commandes" label={<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={[{ fontWeight: "bold" }, { color: activeIndex == 0 ? '#777' : "#000" }]}>Commandes </Text>
                                {commandes.length > 0 ? <View style={styles.actionBadge}>
                                        <Text style={styles.actionBadgeText}>{commandes[0].NBRE}</Text>
                                </View> : null}
                                { countRestoCommandes.length > 0 ? <View style={styles.actionBadge}>
                                        <Text style={styles.actionBadgeText}>{countRestoCommandes[0].NBRE}</Text>
                                </View> : null}
                        </View>}>
                               { (service == ServicesIDS.resto && service != ServicesIDS.ecommerce) ? <CommandesMenusScreen shop={shop}/>:
                                <CommandesProductsScreen shop={shop} />}
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
        actionBadge: {
                minWidth: 20,
                minHeight: 18,
                backgroundColor: "#000",
                borderRadius: 100,
                position: 'absolute',
                right: -25,
                // top: -9,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 3
        },
        actionBadgeText: {
                color: '#FFF',
                fontSize: 12,
                marginTop: -2,
                fontWeight: "bold"
        }
})