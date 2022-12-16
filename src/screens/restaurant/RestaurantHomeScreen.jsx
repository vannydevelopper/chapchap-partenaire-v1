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
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import * as ImagePicker from 'expo-image-picker';
import Loading from "../../components/app/Loading";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';




export default function RestaurantHomeScreen() {
    const { width, height } = useWindowDimensions()
    const SERVICE_MARGIN = 40
    const SERVICE_WIDTH = (width / 2)
    const navigation = useNavigation()
    const route = useRoute()
    const menumodalizeRef = useRef(null)
    const FormmodalizeRef = useRef(null)
    const uploadModaliseRef = useRef()
    const RestomodaliseRef = useRef()
    const AdressemodaliseRef = useRef()
    const OuvertmodaliseRef = useRef()
    const TelemodaliseRef = useRef()
    const DescriptionmodalizeRef = useRef()
    const CategoriemodalizeRef = useRef(null)

    const [updateResto, setUpdateResto] = useState(null)
    const [updateAdresse, setUpdateAdresse] = useState(null)
    const [updateOuvert, setUpdateOuvert] = useState(null)
    const [updateTele, setUpdateTele] = useState(null)
    const [updateDescription, setUpdateDescription] = useState(null)
    const [updatData, setUpdatData] = useState(null)
    const [update, setUpdate] = useState(false)
    const [imagUpdate, setimagUpdate] = useState([])

    const partenaire = route.params
    const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
    const [menus, setMenus] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)
    const categoriesModalizeRef = useRef(null)
    const repasModalizeRef = useRef(null)
    const SousCategoriesModalizeRef = useRef(null)

    const [logoImage, setLogoImage] = useState(null)
    const [logoImage1, setLogoImage1] = useState(null)
    const [logoImage2, setLogoImage2] = useState(null)
    const [autre, setAutre] = useState(false)


    const [CategorieSelect, setCategorieSelect] = useState(null)
    const [RepasSelect, setRepasSelect] = useState(null)
    const [selectedSousCategorie, setselectedSousCategorie] = useState(null)
    const [categoriesResto, setCategoriesResto] = useState([])
    const [repass, setRepass] = useState([])

    const [souscategories, setSouscategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([])
    const [serviceImage, setServiceImage] = useState(null)



    const [data, handleChange, setValue] = useForm({
        resto: partenaire.partenaire.produit.NOM_ORGANISATION,
        adresse: partenaire.partenaire.produit.ADDRESSE,
        ouvert: partenaire.partenaire.produit.OUVERT,
        tele: partenaire.partenaire.produit.TELEPHONE,
        descriptionResto: partenaire.partenaire.produit.PRESENTATION,
        CategorieSelect: null,
        selectedSousCategorie: null,
        nom: "",
        q: "",
        repas: "",
        prix: "",
        temps: "",
        descriptionRepas: "",
        descriptionMenu: "",

    })
    const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {

        repas: {
            required: true,
        },

        prix: {
            required: true,
            length: [255]
        },

        temps: {
            required: true,
        },

        descriptionMenu: {
            required: true,
        }

    },
    // {
    //     email: {
    //         required: "L'email est obligatoire",
    //         email: "Email invalide"
    //     },
    //     password: {
    //         required: "Le mot de passe est obligatoire",
    //         length: "Mot de passe trop court"
    //     }
    // }
     )
     const [additioanalErrors, setAdditionalErrors] = useState({})
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
    }, [update]))
    const fecthCategories = async () => {
        try {
            const response = await fetchApi(`/resto/menu/categories/${partenaire.partenaire.produit.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setCategoriesResto(response.result)
        }
        catch (error) {
            console.log(error)
        } finally {

        }
    }
    useFocusEffect(useCallback(() => {
        fecthCategories()
    }, []))
    function strUcFirst(a) {
        return (a + '').charAt(0).toUpperCase() + a.substr(1);
    }
    // const { checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
    //     quantite: {
    //         required: true,

    //     },
    // }, {
    //     quantite: {
    //         required: "Quantite est obligatoire"
    //     },
    // })

    const onImporterPhoto = async () => {
        uploadModaliseRef.current.close()
        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        })
        if (photo.cancelled) {
            return false
        }
        setServiceImage(photo)
        try {
            setLoading(true)

            const form = new FormData()
            if (serviceImage) {
                const manipResult = await manipulateAsync(
                    serviceImage.uri,
                    [
                        { resize: { width: 500 } }
                    ],
                    { compress: 0.8, format: SaveFormat.JPEG }
                );
                let localUri = manipResult.uri;
                let filename = localUri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                form.append('IMAGE', {
                    uri: localUri, name: filename, type
                })
            }

            const menuUpdate = await fetchApi(`/service/updateImage/${partenaire.partenaire.produit.ID_PARTENAIRE_SERVICE}`, {
                method: "PUT",
                body: form
            })
        setimagUpdate(menuUpdate.result)
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    const fecthAllCategories = async () => {
        try {
            var url = "/resto/repas/"
            if (data.q) {
                url = `/resto/repas/?q=${data.q}`
            }

            const repas = await fetchApi(url)
            setRepass(repas.result)
        }
        catch (error) {
            console.log(error)
        }

        finally {

        }
    }
    useFocusEffect(useCallback(() => {
        fecthAllCategories()
    }, [data.q]))


    useEffect(() => {
        (async () => {
            try {
                const catego = await fetchApi("/resto/menu/categories")
                setCategories(catego.result)
            } catch (error) {
                console.log(error)
            } finally {

            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                if (CategorieSelect != null) {
                    var sousCatego = await fetchApi(`/resto/menu/sous_categories/${CategorieSelect.ID_CATEGORIE_MENU}`)
                    setSouscategories(sousCatego.result)
                }
            }
            catch (error) {
                console.log(error)
            } finally {

            }
        })()
    }, [CategorieSelect])
    const onCategorieSelect = (categorie) => {
        setCategorieSelect(categorie)
        categoriesModalizeRef.current.close()
    }
    const onRepasSelect = (repas) => {
        setRepasSelect(repas)
        setAutre(false)
        repasModalizeRef.current.close()
    }
    const onAutreSelect = () => {
        setAutre(true)
        setRepasSelect(false)
        // setshowMapis(false)
    }
    const Terminer = () => {
        repasModalizeRef.current.close()

    }
    const onSousCategorieSelect = (souscategorie) => {
        setselectedSousCategorie(souscategorie)
        SousCategoriesModalizeRef.current.close()
    }
    const onImagesSelect = async () => {
        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        })
        if (photo.cancelled) {
            return false
        }
        setLogoImage(photo)
    }
    const onImagesSelect1 = async () => {
        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        })
        if (photo.cancelled) {
            return false
        }
        setLogoImage1(photo)
    }
    const onImagesSelect2 = async () => {
        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        })
        if (photo.cancelled) {
            return false
        }
        setLogoImage2(photo)
    }
    const onImageSelect = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.6
        });
        if (!image.cancelled) {
            setImages(t => [...t, image])
        }
    }

    const onRemoveImage = index => {
        const newImages = images.filter((_, i) => i != index)
        setImages(newImages)
    }

    const SendData = async () => {
        try {
            setLoading(true)
            const form = new FormData()
            form.append("ID_CATEGORIE_MENU", CategorieSelect.ID_CATEGORIE_MENU)
            form.append("ID_SOUS_CATEGORIE_MENU", selectedSousCategorie?.ID_SOUS_CATEGORIE_MENU)
            if (RepasSelect.ID_REPAS) {
                form.append('ID_REPAS', RepasSelect.ID_REPAS)
            }
            form.append('ID_PARTENAIRE_SERVICE', partenaire.partenaire.produit.ID_PARTENAIRE_SERVICE)
            form.append("NOM_REPAS", data.repas)
            form.append("PRIX", data.prix)
            form.append("TEMPS_PREPARATION", data.temps)
            form.append("DESCRIPT", data.description)
            form.append("DESCRIPTIONrepas", data.descriptionRepas)
            form.append("DESCRIPTIONmenu", data.descriptionMenu)
            if (images.length > 0) {
                await Promise.all(images.map(async (image, index) => {
                    const key = `IMAGE_${index + 1}`
                    const manipResult = image
                    let localUri = manipResult.uri;
                    let filename = localUri.split('/').pop();
                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;
                    form.append(key, {
                        uri: localUri, name: filename, type
                    })
                }))
            }
            form.append("DESCRIPTION", data.description)
            const newMenu = await fetchApi('/resto/menu/create', {
                method: "POST",
                body: form
            })
            setUpdate(true)
            FormmodalizeRef.current.close()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const UpdateData = async () => {

        try {
            setLoading(true)
            const form = new FormData()
            form.append("NOM_ORGANISATION", data.resto)
            form.append("ADRESSE", data.adresse)
            form.append("OUVERT", data.ouvert)
            form.append("TELEPHONE", data.tele)
            form.append("PRESENTATION", data.descriptionResto)
            const updateProduct = await fetchApi(`/partenaire/Updateshop/${partenaire.partenaire.produit.ID_PARTENAIRE_SERVICE}`, {
                method: "PUT",
                body: form
            })
            setUpdateResto(updateProduct.result.NOM_ORGANISATION)
            setUpdateAdresse(updateProduct.result.ADRESSE_COMPLETE)
            setUpdateOuvert(updateProduct.result.OUVERT)
            setUpdateTele(updateProduct.result.TELEPHONE)
            setUpdateDescription(updateProduct.result.PRESENTATION)

            RestomodaliseRef.current.close()
            AdressemodaliseRef.current.close()
            OuvertmodaliseRef.current.close()
            TelemodaliseRef.current.close()
            DescriptionmodalizeRef.current.close()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
            {loading && <Loading />}

            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <View style={styles.cardBack}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} >
                    <Ionicons name="ios-arrow-back-outline" size={30} color={COLORS.ecommercePrimaryColor} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <TouchableWithoutFeedback key={1} onPress={() => {
                    setImageIndex(1)
                    setShowImageModal(true)
                }}>
                      {imagUpdate.length>0 ? 
                                        <View style={{ width: '100%', marginTop: 10 }}>
                                            <  Image source={{ uri: imagUpdate[0].LOGO }} style={{ ...styles.imagePrincipal }} />
                                        </View> 
                                        :
                    <View style={{ width: '100%', maxHeight: "100%", marginTop: 10 }}>
                        <  Image source={{ uri: partenaire.partenaire.produit.LOGO }} style={{ ...styles.imagePrincipal }} />
                    </View>}
                </TouchableWithoutFeedback>

                <TouchableOpacity onPress={() => onSelectPhoto()} style={styles.uploadImages}>
                    <Feather name="image" size={24} color={COLORS.ecommercePrimaryColor} />
                </TouchableOpacity>

                <View style={{ marginHorizontal: "2%", marginTop: "2%", flexDirection: "row", justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={onPressResto}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", color: COLORS.ecommerceOrange }}>
                                {updateResto ? strUcFirst(updateResto.toLowerCase()) : strUcFirst(partenaire.partenaire.produit.NOM_ORGANISATION.toLowerCase())}
                            </Text>
                            <EvilIcons style={{ marginLeft: "-5%", opacity: 0.5 }} name="pencil" size={22} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressAdresse}>
                        <View style={{ marginLeft: "5%", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                                <SimpleLineIcons name="location-pin" size={15} color="black" />
                                <Text style={{ fontWeight: "bold", ontSize: 12, opacity: 0.5 }}> {updateAdresse ? updateAdresse : partenaire.partenaire.produit.ADDRESSE} </Text>
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
                                <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>{updateOuvert ? updateOuvert : partenaire.partenaire.produit.OUVERT}</Text>
                                <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL(`tel:${partenaire.partenaire.produit.TELEPHONE}`); }} style={{ flexDirection: "row" }}>
                        <View style={{ marginLeft: "5%", flexDirection: "row" }}>

                            <SimpleLineIcons name="call-end" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                            <TouchableOpacity onPress={onPressTele}>
                                <Text style={{ fontSize: 15, marginLeft: 20, color: "#797E9A", right: 15 }}>{updateTele ? updateTele : partenaire.partenaire.produit.TELEPHONE}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: "10%", marginHorizontal: 10 }} >
                    <TouchableOpacity onPress={onPressDescription}>
                        <Text style={{ color: "#797E9A", fontSize: 11, }}>
                            {updateDescription ? updateDescription : partenaire.partenaire.produit.PRESENTATION}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.plus1}>
                    <View>
                        <Text style={[styles.titlePrincipal, menus.length == 0 && { textAlign: "center" }]}>Mes categories</Text>
                    </View>
                    {categoriesResto.length > 4 &&
                        <TouchableOpacity onPress={plusCategories} >
                            <View style={{ marginLeft: "45%" }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} style={{ marginRight: -15 }} />
                                    <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} />
                                </View>
                            </View>
                        </TouchableOpacity>}
                </TouchableOpacity>
                {/* {(firstLoadingMenus || loadingCategories || loadingMenus || loadingSubCategories) ? <CategoriesMenuSkeletons /> : */}
                <ScrollView
                    style={styles.shops}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.categories}>
                        {categoriesResto.map((categorie, index) => {
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
                        <Text style={[styles.titlePrincipal1, menus.length == 0 && { textAlign: "center" }]}>Mes menus</Text>
                    </View>
                    {menus.length > 10 && <View style={{ marginLeft: "50%" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} style={{ marginRight: -15 }} />
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} />
                        </View>
                    </View>}
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
                                        partenaire={partenaire}
                                    />
                                )
                            })}

                        </View>}

            </ScrollView>

            <View style={{ flexDirection: "row", marginTop: "-15%", marginLeft: "75%", marginBottom: "1%" }}>
                <TouchableOpacity onPress={() => FormmodalizeRef.current.open()}>

                    <View style={{ backgroundColor: COLORS.ecommerceOrange, borderRadius: 50, width: 70, height: 70, alignItems: "center", justifyContent: "center" }}>
                        <Ionicons name="add" size={40} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
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
            </Modalize>
            <Modalize
                ref={FormmodalizeRef}
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
                <Text style={styles.title}>Nouveau Menu</Text>
                <ScrollView keyboardShouldPersistTaps="handled" style={{ marginBottom: 20 }}>
                    <View>
                        <View>
                            <View>
                                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: 20 }}
                                    onPress={() => repasModalizeRef.current.open()}
                                // disabled={service.id_service == 2}
                                >
                                    <View >
                                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                                            Repas
                                        </Text>
                                        {RepasSelect && <Text style={[styles.inputText, { color: '#000' }]}>
                                            {RepasSelect.NOM}
                                        </Text>}
                                        {autre && <Text>Autre tailles</Text>
                                        }
                                    </View>
                                    <AntDesign name="caretdown" size={20} color="#777" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: 20, marginTop: 10 }}
                                    onPress={() => categoriesModalizeRef.current.open()}
                                >
                                    <View >
                                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                                            Categorie
                                        </Text>
                                        {CategorieSelect && <Text style={[styles.inputText, { color: '#000' }]}>
                                            {CategorieSelect.NOM}
                                        </Text>}
                                    </View>
                                    <AntDesign name="caretdown" size={20} color="#777" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: 20, marginTop: 10,marginBottom:10 }}
                                    onPress={() => SousCategoriesModalizeRef.current.open()}
                                // disabled={service.id_service == 2}
                                >
                                    <View >
                                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                                            Sous Categorie
                                        </Text>
                                        {selectedSousCategorie && <Text style={[styles.inputText, { color: '#000' }]}>
                                            {selectedSousCategorie.NOM}
                                        </Text>}
                                    </View>
                                    <AntDesign name="caretdown" size={20} color="#777" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputCard}>
                                <OutlinedTextField
                                    label={"Entrez votre prix"}
                                    fontSize={14}
                                    value={data.prix}
                                    onChangeText={(newValue) => handleChange('prix', newValue)}
                                    onBlur={() => checkFieldData('prix')}
                                    // error={hasError('prix') ? getError('prix') : ''}
                                    lineWidth={0.5}
                                    activeLineWidth={0.5}
                                    baseColor={COLORS.smallBrown}
                                    tintColor={COLORS.primary}
                                />
                            </View>
                            <View style={styles.inputCard}>
                                <OutlinedTextField
                                    label={"Entrez temps de preparation"}
                                    fontSize={14}
                                    value={data.temps}
                                    onChangeText={(newValue) => handleChange('temps', newValue)}
                                    onBlur={() => checkFieldData('temps')}
                                    // error={hasError('temps') ? getError('temps') : ''}
                                    lineWidth={0.5}
                                    activeLineWidth={0.5}
                                    baseColor={COLORS.smallBrown}
                                    tintColor={COLORS.primary}
                                />
                            </View>
                            <View style={styles.inputCard}>
                                <OutlinedTextField
                                    label={"Entrez description du menu"}
                                    fontSize={14}
                                    value={data.descriptionMenu}
                                    onChangeText={(newValue) => handleChange('descriptionMenu', newValue)}
                                    onBlur={() => checkFieldData('descriptionRepas')}
                                    // error={hasError('descriptionMenu') ? getError('descriptionMenu') : ''}
                                    lineWidth={0.5}
                                    activeLineWidth={0.5}
                                    baseColor={COLORS.smallBrown}
                                    tintColor={COLORS.primary}
                                />
                            </View>

                            <View style={styles.selectControl}>
                                <Text style={styles.selectLabel}>Images </Text>
                                <View style={styles.images}>
                                    {images.map((image, index) => {
                                        return (
                                            <TouchableWithoutFeedback onPress={() => onRemoveImage(index)} key={index}>
                                                <Image style={[styles.addImager, index > 0 && { marginLeft: 10 }]} source={{ uri: image.uri }} />
                                            </TouchableWithoutFeedback>
                                        )
                                    })}
                                    {images.length < 3 ? <TouchableWithoutFeedback onPress={onImageSelect}>
                                        <View style={[styles.addImager, images.length > 0 && { marginLeft: 10 }]}>
                                            <Feather name="image" size={30} color="#777" />
                                        </View>
                                    </TouchableWithoutFeedback> : null}
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity 
                        // disabled={!isValidate()}
                        onPress={SendData}>
                                <View style={[styles.button]}>
                                <Text style={styles.buttonText} >Enregistrer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </Modalize>

            <Modalize ref={uploadModaliseRef} handlePosition="inside" modalHeight={100} snapPoint={250}>
                <View style={styles.modalContent}>
                    {/* <TouchableNativeFeedback > */}
                        <TouchableNativeFeedback onPress={() => onImporterPhoto()}>
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
                <TouchableOpacity style={styles.addBtn} onPress={UpdateData}>
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
                <TouchableOpacity style={styles.addBtn} onPress={UpdateData}>
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
                <TouchableOpacity style={styles.addBtn} onPress={UpdateData}>
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
                <TouchableOpacity style={styles.addBtn} onPress={UpdateData}>
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
                        label={"Modifier  description d'un restaurant "}
                        value={data.descriptionResto}
                        onChangeText={(newValue) => handleChange('descriptionResto', newValue)}
                        lineWidth={0.5}
                        activeLineWidth={0.5}
                        multiline={true}
                        baseColor={COLORS.smallBrown}
                        tintColor={COLORS.primary}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={UpdateData}>
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

                                        </ImageBackground>
                                    </View>
                                    <Text style={[{ fontSize: 10, fontWeight: "bold" }, { color: "#797E9A" }]}>{categorie.NOM}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </Modalize>
            <Modalize ref={repasModalizeRef} adjustToContentHeight handlePosition='inside'>
                <>
                    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Repas</Text>
                    </View>
                    {!autre && <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
                        <View style={styles.searchSection}>
                            <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                            <TextInput
                                style={styles.input}
                                value={data.q}
                                onChangeText={(newValue) => handleChange('q', newValue)}
                                placeholder="Rechercher un repas"
                            />
                        </View>
                    </View>
                    }
                    <View>
                        <TouchableWithoutFeedback onPress={() => onAutreSelect(true)}>

                            <View style={styles.modalItemModel2} >
                                {autre ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                    <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                <Text>Autre repas</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {autre ?
                            <>
                                <View style={styles.inputCard}>
                                    <OutlinedTextField
                                        label={"Nom du repas"}
                                        fontSize={14}
                                        value={data.repas}
                                        onChangeText={(newValue) => handleChange('repas', newValue)}
                                        onBlur={() => checkFieldData('repas')}
                                        error={hasError('repas') ? getError('repas') : ''}
                                        lineWidth={0.5}
                                        multiline={true}
                                        activeLineWidth={0.5}
                                        baseColor={COLORS.smallBrown}
                                        tintColor={COLORS.primary}
                                    />
                                </View>
                                <View style={styles.inputCard}>
                                    <OutlinedTextField
                                        label={"Description"}
                                        fontSize={14}
                                        value={data.descriptionRepas}
                                        onChangeText={(newValue) => handleChange('descriptionRepas', newValue)}
                                        onBlur={() => checkFieldData('descriptionRepas')}
                                        error={hasError('descriptionRepas') ? getError('descriptionRepas') : ''}
                                        lineWidth={0.5}
                                        multiline={true}
                                        activeLineWidth={0.5}
                                        baseColor={COLORS.smallBrown}
                                        tintColor={COLORS.primary}
                                    />
                                </View>
                                <TouchableOpacity onPress={Terminer}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText} >Terminer</Text>
                                    </View>
                                </TouchableOpacity>
                            </> :
                            repass.map((rep, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => onRepasSelect(rep)}>
                                        <View style={styles.modalItemModel2} >
                                            {RepasSelect?.ID_REPAS == rep.ID_REPAS ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                            <Text>{rep.NOM}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }


                    </View>
                </>
            </Modalize>
            <Modalize ref={categoriesModalizeRef} adjustToContentHeight handlePosition='inside'>
                <>
                    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Categories</Text>
                    </View>
                    <View>
                        {categories.map((categorie, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => onCategorieSelect(categorie)}>
                                    <View style={styles.modalItemModel2} >
                                        {CategorieSelect?.ID_CATEGORIE_MENU == categorie.ID_CATEGORIE_MENU ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                            <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                        <Text>{categorie.NOM}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

                    </View>
                </>
            </Modalize>
            <Modalize ref={SousCategoriesModalizeRef} adjustToContentHeight handlePosition='inside'>
                <>
                    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Sous Categories</Text>
                    </View>
                    <View>
                        {souscategories?.map((souscategorie, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => onSousCategorieSelect(souscategorie)}>
                                    <View style={styles.modalItemModel2} >
                                        {selectedSousCategorie?.ID_SOUS_CATEGORIE_MENU == souscategorie.ID_SOUS_CATEGORIE_MENU ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                            <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                        <Text>{souscategorie.NOM}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </>
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
    titlePrincipal1: {
        fontSize: 15,
        // fontWeight: "bold",
        marginTop: "10%",
        marginBottom: "10%",
        color: COLORS.ecommercePrimaryColor,
        opacity: 0.7
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
        height: 15,
        zIndex: 1,
        // position: 'absolute',
        // marginRight: 10,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        // marginTop:20
        top: "20%",
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
        alignSelf: "center",
        backgroundColor: COLORS.ecommerceOrange,
        borderRadius: 15,
        paddingVertical: 15,
        marginTop: "0%",
        marginBottom: "0%",
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.ecommerceOrange,
        width: "90%",
        height: 50,
        // marginHorizontal: 10,
        paddingHorizontal: 20
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
        marginLeft: 0,
        elevation: 3,
        marginRight: 5,
        backgroundColor: 'white',
        borderRadius: 10
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
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 12,
        color: COLORS.ecommercePrimaryColor,
        margin: 20
    },
    modalCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // marginHorizontal: 20,
        backgroundColor: "#fff",
        padding: 13,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#ddd"
    },
    inputText: {
        color: '#777'
    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 0,
    },
    selectControl: {
        paddingHorizontal: 20,
        marginTop: 10
    },
    selectLabel: {
        color: '#777',
        marginLeft: 5
    },
    images: {
        flexDirection: "row"
    },
    addImager: {
        width: 100,
        height: 100,
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },
    button: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primaryPicker,
        marginHorizontal: 20
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        // textTransform:"uppercase",
        fontSize: 16,
        textAlign: "center"
    },
    buttonModal: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primaryPicker,
        marginBottom: 10
    },
    addImageContainer: {
        paddingHorizontal: 20
    },
    addImageItem: {
        borderWidth: 0.5,
        borderColor: COLORS.smallBrown,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    modalItemModel2: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    modalAutres: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    buttonModalSecond: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primaryPicker,
        marginBottom: 10,
        marginHorizontal: 20
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
        // backgroundColor: "#D7D9E4",
        width: "100%",
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
        // backgroundColor: "#EF4255",
        marginTop: 8,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
})