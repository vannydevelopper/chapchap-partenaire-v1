import React, { useCallback, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, Animated, BackHandler, TouchableOpacity, useWindowDimensions, View, TextInput, Image, ScrollView, TouchableNativeFeedback } from "react-native";
import { DrawerActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import Menu from "../../components/restaurant/main/Menu";


export default function RestaurantHomeScreen() {
        const { height } = useWindowDimensions()
        const navigation = useNavigation()

        const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
        const [menus, setMenus] = useState([])

        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                var url = "/resto/menu"
                                const menus = await fetchApi(url)
                                setMenus(menus.result)
                                // console.log(menus.result)
                        } catch (error) {
                                console.log(error)
                        } finally {
                                setFirstLoadingMenus(false)
                        }
                })()
        }, []))

        return (
                <View style={styles.container}>
                        <View style={styles.cardHeader}>
                                <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                        <View style={styles.menuOpenerLine} />
                                        <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                        <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.cardOrginal}>
                                <Text style={styles.titlePrincipal}>Vos menus</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
                                        <View style={styles.searchSection}>
                                                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                                <TextInput
                                                        style={styles.input}
                                                        placeholder="Recherche..."
                                                />
                                        </View>
                                        <View style={styles.cardRecherche}>
                                                <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                                        </View>
                                </View>
                                <View style={styles.products}>
                                        {menus.map((product, index) => {
                                                return (
                                                        <Menu
                                                                product={product}
                                                                index={index}
                                                                totalLength={menus.length}
                                                                key={index}
                                                                fixMargins
                                                        />
                                                )
                                        })}
                                </View>
                        </ScrollView>
                        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                                <Text style={styles.addBtnText}>Nouveau menu</Text>
                        </TouchableOpacity>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        cardHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                height: 88
        },
        menuOpener: {
                marginTop: 25
        },
        menuOpenerLine: {
                height: 3,
                width: 30,
                backgroundColor: COLORS.ecommercePrimaryColor,
                marginTop: 5
        },
        titlePrincipal: {
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 12,
                color: COLORS.ecommercePrimaryColor,
                marginHorizontal: 10
        },
        searchSection: {
                flexDirection: "row",
                marginTop: 10,
                padding: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd",
                alignItems: 'center',
                backgroundColor: '#fff',
                backgroundColor: "#D7D9E4",
                width: "84%",
                height: 50,
                paddingHorizontal: 10
        },
        input: {
                flex: 1,
                marginLeft: 10
        },
        cardRecherche: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#EF4255",
                marginTop: 8,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
        },
        products: {
                flexDirection: 'row',
                flexWrap: 'wrap'
        },
        addBtn: {
                paddingVertical: 10,
                minWidth: "90%",
                alignSelf: "center",
                backgroundColor: COLORS.ecommerceOrange,
                borderRadius: 10,
                paddingVertical: 15,
                marginBottom: 10,
        },
        addBtnText: {
                color: '#FFF',
                fontWeight: "bold",
                textAlign: "center",
        }
})