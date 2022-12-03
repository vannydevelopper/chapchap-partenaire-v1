import React, { useCallback, useState, useRef, useEffect } from "react";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableWithoutFeedback, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";

import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons, Feather, Octicons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
// import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar, Modal, ActivityIndicator } from "react-native"
import Menu from "../../components/restaurant/main/Menu";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import { Modalize } from "react-native-modalize";

export default function RestaurantHomeScreen() {
    const { width, height } = useWindowDimensions()
    const SERVICE_MARGIN = 40
    const SERVICE_WIDTH = (width / 2)
    const navigation = useNavigation()
    const route = useRoute()
    const menumodalizeRef = useRef(null)
    
    const uploadModaliseRef = useRef()
    const RestomodaliseRef = useRef()
    const AdressemodaliseRef = useRef()
    const OuvertmodaliseRef = useRef()
    const TelemodaliseRef = useRef()
    const DescriptionmodalizeRef = useRef()

    const partenaire = route.params
    const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
    const [menus, setMenus] = useState([])
    const menuPress = () => {
        // setIsOpen(true)
        menumodalizeRef.current?.open()
    }
    const onPressResto = () => {
        RestomodaliseRef.current.open()
    }
    const onPressAdresse = () => {
        AdressemodaliseRef.current.open()
    }
    const onPressOuvert = () => {
        OuvertmodaliseRef.current.open()
    }
    const onPressTele = () => {
        TelemodaliseRef.current.open()
    }
    const onPressDescription = () => {
        DescriptionmodalizeRef.current.open()
    }
    const onSelectPhoto = () => {
        uploadModaliseRef.current.open()
    }
    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                var url = `/resto/menu/${partenaire.partenaire.produit.ID_PARTENAIRE_SERVICE}`
                const menus = await fetchApi(url)
                setMenus(menus.result)
            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingMenus(false)
            }
        })()
    }, []))

    return (
        <>
            <ScrollView style={styles.container}>
                <TouchableWithoutFeedback key={1} onPress={() => {
                    setImageIndex(1)
                    setShowImageModal(true)
                }}>
                    <View style={{ width: '100%', maxHeight: "100%", marginTop: 10 }}>
                        <  Image source={{ uri: partenaire.partenaire.produit.LOGO }} style={{ ...styles.imagePrincipal }} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.cardBack}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} >
                        <Ionicons name="ios-arrow-back-outline" size={30} color={COLORS.ecommercePrimaryColor} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => onSelectPhoto()} style={styles.uploadImages}>
                    <Feather name="image" size={24} color={COLORS.ecommercePrimaryColor} />
                </TouchableOpacity>

                <View style={{ marginHorizontal: "2%", marginTop: "2%", flexDirection: "row", justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={onPressResto}>
                        <Text style={{ fontWeight: "bold" }}>{partenaire.partenaire.produit.NOM_ORGANISATION}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressAdresse}>
                        <View style={{ flexDirection: "row" }}>
                            <SimpleLineIcons name="location-pin" size={15} color="black" />
                            <Text style={{ fontSize: 12 }}> KIRIRI </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 10, justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        {/* {wishlistNumber ?
                        <AntDesign name="star" size={20} color="#EFC519" /> :
                        <AntDesign name="star" size={20} color="#EFC519" />} */}
                        {/* {shop.note.nbre==0 ? */}
                        <AntDesign name="staro" size={20} color="#EFC519" />
                        {/* : */}
                        {/* <AntDesign name="star" size={20} color="#EFC519" />} */}
                        {/* <Text style={{ fontSize: 15, marginLeft: 15, color: "#797E9A", right: 15 }}>{shop.note.nbre}.0</Text> */}
                        <Text style={{ fontSize: 15, marginLeft: 15, color: "#797E9A", right: 15 }}>5.0</Text>

                    </View>
                    <TouchableOpacity onPress={onPressOuvert}>
                        <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
                            <AntDesign name="clockcircleo" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                            {/* <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>{shop.OUVERT}</Text> */}
                            <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>08h-18h</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL(`tel:${partenaire.partenaire.produit.TELEPHONE}`); }} style={{ flexDirection: "row" }}>

                        <SimpleLineIcons name="call-end" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                        <TouchableOpacity onPress={onPressTele}>
                            <Text style={{ fontSize: 15, marginLeft: 20, color: "#797E9A", right: 15 }}>{partenaire.partenaire.produit.TELEPHONE}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }} >
                    <TouchableOpacity onPress={onPressDescription}>
                        <Text style={{ color: "#797E9A" }}>
                            the {partenaire.partenaire.produit.NOM_ORGANISATION} for me, I stayed there for two weeks
                            I really enjoyed its great location. I loved the character
                            of the hotel. The restaurant was fantastic and the staff was
                            friendly. Well maintained rooms, comfortable bed, and great Cafe.
                            the WEMA W
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={menuPress} style={styles.plus}>
                    <View>
                        <Text style={[styles.titlePrincipal, menus.length == 0 && { textAlign: "center" }]}>Mes menus</Text>
                    </View>
                    <View style={{ marginLeft: "50%" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} style={{ marginRight: -15 }} />
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} />
                        </View>
                    </View>
                </TouchableOpacity>

                {firstLoadingMenus ? <HomeProductsSkeletons wrap /> :
                    menus.length == 0 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                        <Feather name="check-square" size={24} color="#777" />
                        <Text style={{ color: '#777', paddingHorizontal: 50, textAlign: "center", marginTop: 10 }}>
                            Aucun menu trouvé. Cliquez sur le bouton en dessous pour ajouter un nouveau
                        </Text>
                    </View> :
                        <View style={styles.products}>
                            {menus.map((menu, index) => {
                                return (
                                    <Menu
                                        menu={menu}
                                        index={index}
                                        totalLength={menus.length}
                                        key={index}
                                        fixMargins
                                    />
                                )
                            })}
                            <View style={[styles.serviceContainer, { width: SERVICE_WIDTH, height: 230 }]}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} onPress={() => navigation.navigate("HomeAllServiceScreen")}>
                                    <View style={[styles.service]}>
                                        <ImageBackground source={require("../../../assets/images/nouveau.png")} style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                            <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 10 }} />
                                            <View style={styles.serviceIcon}>
                                                <AntDesign name="plus" size={40} color="#F29558" />
                                            </View>
                                            <Text style={styles.serviceName}>Nouveau</Text>
                                        </ImageBackground>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>}

            </ScrollView>

            <Modalize
                ref={menumodalizeRef}
                adjustToContentHeight
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}
                onClosed={() => {
                    //     setIsOpen(false)
                    //     handleChange('menu', "")
                    //     setLoadingForm(true)
                }}
            >
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Mes menus</Text>
                <View style={styles.searchSection1}>
                    <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                    <TextInput
                        style={styles.input}
                        // value={data.menu}
                        // onChangeText={(newValue) => handleChange('menu', newValue)}
                        placeholder="Rechercher "
                    />
                </View>
                {/* {(firstLoadingMenus || loadingMenus) ?
                    <>
                        <HomeMenuSkeletons />
                        <HomeMenuSkeletons />
                        <HomeMenuSkeletons />
                        <HomeMenuSkeletons />
                    </> : */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    <View style={styles.products}>
                        {menus.map((menu, index) => {
                            return (
                                <Menu
                                    menu={menu}
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
                {/* } */}
            </Modalize>
            <Modalize ref={uploadModaliseRef} handlePosition="inside" modalHeight={100} snapPoint={250}>
                <View style={styles.modalContent}>
                    <TouchableNativeFeedback >
                        {/* <TouchableNativeFeedback onPress={() => onImporterPhoto()}> */}
                        <View style={styles.modalAction}>
                            <View style={styles.actionIcon}>
                                <AntDesign name="folderopen" size={24} color="black" />
                            </View>
                            <View style={styles.actionLabels}>
                                <Text style={styles.modalActionText}>
                                    Importer une photo
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </Modalize>
            <Modalize ref={RestomodaliseRef} handlePosition="inside" modalHeight={180} snapPoint={250}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.searchSection1}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <TextInput
                        style={styles.input}
                        value={partenaire.partenaire.produit.NOM_ORGANISATION}
                    // onChangeText={(newValue) => handleChange('menu', newValue)}
                    // placeholder="Rechercher "
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={AdressemodaliseRef} handlePosition="inside" modalHeight={180} snapPoint={250}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.searchSection1}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <TextInput
                        style={styles.input}
                        value={partenaire.partenaire.produit.NOM_ORGANISATION}
                    // onChangeText={(newValue) => handleChange('menu', newValue)}
                    // placeholder="Rechercher "
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={OuvertmodaliseRef} handlePosition="inside" modalHeight={180} snapPoint={250}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.searchSection1}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <TextInput
                        style={styles.input}
                        value={partenaire.partenaire.produit.NOM_ORGANISATION}
                    // onChangeText={(newValue) => handleChange('menu', newValue)}
                    // placeholder="Rechercher "
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={TelemodaliseRef} handlePosition="inside" modalHeight={180} snapPoint={250}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.searchSection1}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <TextInput
                        style={styles.input}
                        value={partenaire.partenaire.produit.TELEPHONE}
                    // onChangeText={(newValue) => handleChange('menu', newValue)}
                    // placeholder="Rechercher "
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={DescriptionmodalizeRef} handlePosition="inside" modalHeight={180} snapPoint={250}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.searchSection1}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <TextInput
                        style={styles.input}
                        value={partenaire.partenaire.produit.NOM_ORGANISATION}
                    // onChangeText={(newValue) => handleChange('menu', newValue)}
                    // placeholder="Rechercher "
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>

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
    searchSection1: {
        flexDirection: "row",
        marginTop: -20,
        marginBottom: "2%",
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: 'center',
        backgroundColor: "white",
        width: "95%",
        height: 50,
        marginHorizontal: 10,
        paddingHorizontal: 10

    },
    services: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    serviceContainer: {
        maxWidth: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "-1%"
    },
    service: {
        borderRadius: 10,
        width: "90%",
        height: "85%",
        overflow: 'hidden'
    },
    serviceBackgound: {
        width: "100%",
        height: "100%",
        justifyContent: 'space-between'
    },
    serviceIcon: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 100,
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    serviceName: {
        textAlign: 'center',
        color: '#F29558',
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 16
    },
    serviceIconImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
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
        opacity: 0.6,
        color: COLORS.ecommercePrimaryColor,
        // marginHorizontal: 10
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
    back: {
        padding: 10,
        height: 50,
        width: 50,
        backgroundColor: '#D7D9E4',
        // backgroundColor: COLORS.ecommercePrimaryColor,
        borderRadius: 50,

    },
    uploadImages: {
        width: 50,
        height: 50,
        backgroundColor: "#D7D9E4",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#fff",
        position: 'absolute',
        left: "85%",
        marginTop: 230,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        marginTop: 20
    },
    modalAction: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingVertical: 15
    },
    actionIcon: {
        width: 30,
        height: 30,
        justifyContent: "center"
    },
    modalActionText: {
        fontWeight: "bold"
    },
    cardBack: {
        width: "100%",
        position: 'absolute',
        // marginRight: 10,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        top: "3%",
        left: "2%"

    },
    plus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: "-6%",
        marginTop: "-2%",
    },
    cartBtn: {
        marginTop: 10,
        width: 45,
        height: 45,
        backgroundColor: "#FBD5DA",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePrincipal:
    {
        width: '120%',
        height: 280,
        alignSelf: 'center',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
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