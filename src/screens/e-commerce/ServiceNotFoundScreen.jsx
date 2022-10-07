import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions,  useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
export default function ServiceNotFoundScreen() {
    const { height } = useWindowDimensions()
    const navigation = useNavigation()
    const route = useRoute()
    const { service } = route.params
    return (
        <>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <View style={styles.imgBackground}>
                <View style={styles.cardHeader}>
                    <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <View style={styles.menuOpenerLine} />
                        <View style={[styles.menuOpenerLine, { width: 15 }]} />
                        <View style={[styles.menuOpenerLine, { width: 25 }]} />
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../../assets/images/chapchap.png')} style={styles.logo} />
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <AntDesign name="search1" size={24} color={COLORS.primary} />
                    </View>
                </View>
                <ScrollView style={styles.cardOrginal}>
                    <Text style={styles.titlePrincipal}>Vous n'est pas enregistre dans ce service  de {service.title}</Text>
                    <TouchableOpacity style={styles.addBtn}>
                        <Text style={[styles.addBtnText]}>S'inscrire</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>     
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
    imgBackground: {
        flex: 1,
        width: '100%',
        height: "100%"
    },
    cardOrginal: {
    },
    titlePrincipal: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10,
        marginVertical: 200
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

    DataImageCategorie: {
        minWidth: 40,
        minHeight: 40,
        borderRadius: 10,
    },
    cardPhoto1: {
        marginTop: 10,
        width: 50,
        height: 50,
        backgroundColor: "#DFE1E9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cardPhoto: {
        marginTop: 10,
        width: 50,
        height: 50,
        //backgroundColor: "#242F68",
        backgroundColor: "#DFE1E9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    title: {
        fontWeight: 'bold'
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
    },
    logo: {
        resizeMode: 'center',
        height: "50%",
        width: "50%",
        marginTop: 25
    },
    imageContainer: {
        height: "100%",
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
})