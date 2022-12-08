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
import { useForm } from "../../hooks/useForm";
import { OutlinedTextField } from "rn-material-ui-textfield";


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
    const CategoriemodalizeRef = useRef(null)


    const partenaire = route.params
    const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
    const [menus, setMenus] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)



    const [data, handleChange, setValue] = useForm({
        resto: partenaire.partenaire.produit.NOM_ORGANISATION,
        adresse: partenaire.partenaire.produit.ADDRESSE,
        ouvert: partenaire.partenaire.produit.OUVERT,
        tele: partenaire.partenaire.produit.TELEPHONE,
        description: partenaire.partenaire.produit.PRESENTATION,
    })

    const menuPress = () => {
        // (true)
        menumodalizeRef.current?.open()
    }
    const onCategoryPress = (categorie) => {

        // if (loadingSubCategories || loadingMenus) return false
        if (categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU) {
            return setSelectedCategorie(null)
        }
        setSelectedCategorie(categorie)
        CategoriemodalizeRef.current?.close()
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
    const plusCategories = () => {

        CategoriemodalizeRef.current?.open()
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
    const fecthCategories = async () => {
        try {
            const response = await fetchApi(`/resto/menu/categories/${partenaire.partenaire.produit.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setCategories(response.result)
            // console.log(response)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoadingCatagories(false)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthCategories()
    }, []))
    function strUcFirst(a) {
        return (a + '').charAt(0).toUpperCase() + a.substr(1);
    }
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
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", color: COLORS.ecommerceOrange }}>
                                {strUcFirst(partenaire.partenaire.produit.NOM_ORGANISATION.toLowerCase())}
                            </Text>
                            <EvilIcons style={{ marginLeft: "-5%", opacity: 0.5 }} name="pencil" size={22} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressAdresse}>
                        <View style={{ marginLeft: "5%", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                                <SimpleLineIcons name="location-pin" size={15} color="black" />
                                <Text style={{ fontSize: 12, opacity: 0.5, fontWeight: "bold" }}> {partenaire.partenaire.produit.ADDRESSE} </Text>
                                <EvilIcons style={{ marginLeft: "-5%", opacity: 0.5 }} name="pencil" size={22} color="black" />

                            </View>
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
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
                                <AntDesign name="clockcircleo" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                                {/* <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>{shop.OUVERT}</Text> */}
                                <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>{partenaire.partenaire.produit.OUVERT}</Text>
                                <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL(`tel:${partenaire.partenaire.produit.TELEPHONE}`); }} style={{ flexDirection: "row" }}>
                        <View style={{ marginLeft: "5%", flexDirection: "row" }}>

                            <SimpleLineIcons name="call-end" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                            <TouchableOpacity onPress={onPressTele}>
                                <Text style={{ fontSize: 15, marginLeft: 20, color: "#797E9A", right: 15 }}>{partenaire.partenaire.produit.TELEPHONE}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: "10%", marginHorizontal: 10 }} >
                    <TouchableOpacity onPress={onPressDescription}>
                        <Text style={{ color: "#797E9A", fontSize: 11, }}>
                            {partenaire.partenaire.produit.PRESENTATION}
                        </Text>

                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={plusCategories} style={styles.plus1}>
                    <View>
                        <Text style={[styles.titlePrincipal, menus.length == 0 && { textAlign: "center" }]}>Mes categories</Text>
                    </View>
                    <View style={{ marginLeft: "45%" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} style={{ marginRight: -15 }} />
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} />
                        </View>
                    </View>
                </TouchableOpacity>
                {/* {(firstLoadingMenus || loadingCategories || loadingMenus || loadingSubCategories) ? <CategoriesMenuSkeletons /> : */}
                <ScrollView
                    style={styles.shops}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.categories}>
                        {categories.map((categorie, index) => {
                            return (

                                <TouchableOpacity onPress={() => onCategoryPress(categorie)} style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                    <View style={[styles.categoryPhoto, { backgroundColor: categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU ? COLORS.handleColor : "#DFE1E9" }]}>
                                        <Image source={{ uri: categorie.IMAGE }} style={[styles.DataImageCategorie, , { opacity: categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU ? 0.2 : 1 }]} />
                                    </View>
                                    <Text style={[{ fontSize: 8, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                    {categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU && <View style={[styles.categoryChecked, { backgroundColor: categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU }]}>
                                        <AntDesign style={{ marginTop: 20, marginLeft: 20, color: COLORS.ecommercePrimaryColor }} name="check" size={40} color='#000' />
                                    </View>}
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                {/* } */}
                <TouchableOpacity onPress={menuPress} style={styles.plus}>
                    <View>
                        <Text style={[styles.titlePrincipal, menus.length == 0 && { textAlign: "center" }]}>Mes menus</Text>
                    </View>
                    <View style={{ marginLeft: "50%" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} style={{ marginRight: -15 }} />
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} />
                        </View>
                    </View>
                </TouchableOpacity>

                {firstLoadingMenus ? <HomeProductsSkeletons wrap /> :
                    menus.length == 0 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                        <Feather name="check-square" size={24} color="#777" />
                        <Text style={{ color: '#777', paddingHorizontal: 50, textAlign: "center", marginTop: 10 }}>
                            Aucun menu trouvé. Cliquez sur le bouton en dessous pour ajouter un nouveau
                        </Text>
                        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                            <Text style={styles.addBtnText}>Nouveau menu</Text>
                        </TouchableOpacity>
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
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} onPress={() => navigation.navigate("NewMenuScreens")}>
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
                    //     (false)
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
            <Modalize ref={RestomodaliseRef} adjustToContentHeight
                handlePosition='inside'
                modalStyle={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    paddingVertical: 20
                }}
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                <View style={styles.inputCard}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <OutlinedTextField
                        style={styles.input}
                        label={"Modifier un restaurant"}
                        value={data.resto}
                        onChangeText={(newValue) => handleChange('resto', newValue)}
                        lineWidth={0.5}
                        activeLineWidth={0.5}
                        baseColor={COLORS.smallBrown}
                        tintColor={COLORS.primary}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={AdressemodaliseRef} adjustToContentHeight
                handlePosition='inside'
                modalStyle={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    paddingVertical: 20
                }}
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.inputCard}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <OutlinedTextField
                        style={styles.input}
                        label={"Modifier un adresse"}
                        value={data.adresse}
                        onChangeText={(newValue) => handleChange('adresse', newValue)}
                        lineWidth={0.5}
                        activeLineWidth={0.5}
                        baseColor={COLORS.smallBrown}
                        tintColor={COLORS.primary}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={OuvertmodaliseRef} adjustToContentHeight
                handlePosition='inside'
                modalStyle={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    paddingVertical: 20
                }}
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.inputCard}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <OutlinedTextField
                        style={styles.input}
                        label={"Modifier heure de travail"}
                        value={data.ouvert}
                        onChangeText={(newValue) => handleChange('ouvert', newValue)}
                        lineWidth={0.5}
                        activeLineWidth={0.5}
                        baseColor={COLORS.smallBrown}
                        tintColor={COLORS.primary}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={TelemodaliseRef} adjustToContentHeight
                handlePosition='inside'
                modalStyle={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    paddingVertical: 20
                }}
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.inputCard}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <OutlinedTextField
                        style={styles.input}
                        label={"Modifier telephone"}
                        value={data.tele}
                        onChangeText={(newValue) => handleChange('tele', newValue)}
                        lineWidth={0.5}
                        activeLineWidth={0.5}
                        baseColor={COLORS.smallBrown}
                        tintColor={COLORS.primary}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={DescriptionmodalizeRef} adjustToContentHeight
                handlePosition='inside'
                modalStyle={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    paddingVertical: 20
                }}
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.inputCard}>
                    {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                    <OutlinedTextField
                        style={styles.input}
                        label={"Modifier un description"}
                        value={data.description}
                        onChangeText={(newValue) => handleChange('description', newValue)}
                        lineWidth={0.5}
                        activeLineWidth={0.5}
                        multiline={true}
                        baseColor={COLORS.smallBrown}
                        tintColor={COLORS.primary}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewMenuScreen')}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize
                ref={CategoriemodalizeRef}
                adjustToContentHeight
                handlePosition='inside'
                modalStyle={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    paddingVertical: 20
                }}
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}
            //     onClosed={() => {

            //         setLoadingForm(true)
            //     }}
            >
                <ScrollView>
                    <Text style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Nos catégories</Text>
                    <View style={styles.resto}>
                        {categories.map((categorie, index) => {
                            return (
                                <View style={{ ...styles.categoryModel, margin: 15 }} >
                                    <View style={styles.actionIcon}>
                                        <ImageBackground source={{ uri: categorie.IMAGE }} borderRadius={15} style={styles.categoryImage}>

                                            {/* <View style={styles.disbaledContainer}>
                                                    <View style={styles.checkIndicator}>
                                                        <AntDesign name="check" size={24} color='#000' />
                                                    </View>
                                                </View> */}
                                        </ImageBackground>
                                    </View>
                                    <Text style={[{ fontSize: 10, fontWeight: "bold" }, { color: "#797E9A" }]}>{categorie.NOM}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
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
    DataImageCategorie: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
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
    inputCard: {
        marginHorizontal: 20,
        marginTop: '-5%',
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
    resto: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryModel: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    titlePrincipal: {
        fontSize: 15,
        // fontWeight: "bold",
        marginTop: "1%",
        marginBottom: "1%",
        color: COLORS.ecommercePrimaryColor,
        opacity: 0.7
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

    categoryImage: {
        width: '100%',
        height: '100%',
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
    plus1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: "-1%"
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
    },
    categories: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingBottom: 5
    },
    categoryPhoto: {
        width: 80,
        height: 70,
        borderRadius: 8,
        backgroundColor: COLORS.skeleton
    },
    categoryChecked: {
        width: 80,
        height: 85,
        borderRadius: 8,
        marginTop: -80

    },
    categoryPhotoResto: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: COLORS.skeleton
    },
    category: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        marginRight: -12.6,
        backgroundColor: 'white',
        borderRadius: 10
    },
})