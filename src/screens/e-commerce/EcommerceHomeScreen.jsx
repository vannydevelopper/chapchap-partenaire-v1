import React, { useCallback, useState, useEffect, useRef } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback, TouchableWithoutFeedback } from "react-native";
import { EvilIcons, MaterialIcons, Fontisto, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons, Octicons, Feather } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import Shops from "../../components/ecommerce/home/Shops";
import Product from "../../components/ecommerce/main/Product";
import { CategoriesRearchSkeletons, CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import ImageView from "react-native-image-viewing";
import { Modalize } from "react-native-modalize";
import { OutlinedTextField } from "rn-material-ui-textfield";
import { useForm } from "../../hooks/useForm";
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import * as ImagePicker from 'expo-image-picker';
import Loading from "../../components/app/Loading";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';



export default function EcommerceHomeScreen() {
        const { width, height } = useWindowDimensions()
        const SERVICE_MARGIN = 40
        const SERVICE_WIDTH = (width / 2)

        const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
        const [products, setProducts] = useState([])
        const [imageIndex, setImageIndex] = useState(0)
        const [showImageModal, setShowImageModal] = useState(false)
        const productmodalizeRef = useRef(null)
        const [loadingProducts, setLoadingProducts] = useState(false)
        const [categories, setCategories] = useState([])
        const [categoriesProduits, setCategoriesProduits] = useState([])
        const [imagUpdate, setimagUpdate] = useState([])


        const [selectedCategorie, setSelectedCategorie] = useState(null)

        const [loadingAdd, setLoadingAdd] = useState(false)
        const [loading, setLoading] = useState(false)
        const [serviceImage, setServiceImage] = useState(null)


        const [updateShop, setUpdateShop] = useState(false)
        const [updateAdresse, setUpdateAdresse] = useState(false)
        const [updateOuvert, setUpdateOuvert] = useState(false)
        const [updateTele, setUpdateTele] = useState(false)
        const [updateDescription, setUpdateDescription] = useState(false)
        const [updatData, setUpdatData] = useState(null)

        const [loadingSubCategories, setLoadingSubCategories] = useState(false)
        const [sousCategories, SetSousCategories] = useState([])
        const [selectedsousCategories, setSelectedsousCategories] = useState(null)

        const [detailData, setDetailData] = useState([])
        const [autreTailles, setAutreTailles] = useState("")
        const [autreCouleurs, setAutreCouleurs] = useState("")
        const [images, setImages] = useState([])

        const [loadingCatagories, setLoadingCatagories] = useState(null)
        const [TailleSelect, setTailleSelect] = useState(null)
        const [selectedCouleur, setselectedCouleur] = useState(null)
        const [CategorieSelect, setCategorieSelect] = useState(null)
        const [selectedSousCategorie, setselectedSousCategorie] = useState(null)

        const [showAUtresTaille, setShowAUtresTaille] = useState(false)
        const [showAUtresCouleur, setShowAUtresCouleur] = useState(false)
        const [autreCategorie, setAutreCategorie] = useState(false)
        const [autreSousCategore, setAutreSousCategore] = useState(false)


        const [souscategories, setSouscategories] = useState([])
        const [couleurs, setCouleur] = useState([])
        const [tailles, setTaille] = useState([])
        const [newProduct, setnewProduct] = useState([])


        const navigation = useNavigation()
        const route = useRoute()
        const { partenaire } = route.params
        const uploadModaliseRef = useRef()
        const ShopmodaliseRef = useRef()
        const AdressemodaliseRef = useRef()
        const OuvertmodaliseRef = useRef()
        const TelemodaliseRef = useRef()
        const DescriptionmodalizeRef = useRef()
        const CategoriemodalizeRef = useRef()
        const FormmodalizeRef = useRef()

        const couleurModalizeRef = useRef(null)
        const tailleModalizeRef = useRef(null)
        const ajoutDetailsModalizeRef = useRef(null)
        const categoriesModalizeRef = useRef(null)
        const SousCategoriesModalizeRef = useRef(null)


        const plusCategories = () => {
                // setIsOpen(true)
                FormmodalizeRef.current?.open()
        }
        const addNew = () => {
                // setIsOpen(true)
                FormmodalizeRef.current?.open()
        }
        const onPressShop = () => {
                ShopmodaliseRef.current.open()
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
        const productPress = () => {
                // setIsOpen(true)
                productmodalizeRef.current?.open()
        }
        const onCategoryPress = (categorie) => {
                if (loadingSubCategories || loadingProducts) return false
                if (categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT) {
                        return setSelectedCategorie(null)
                }
                setSelectedCategorie(categorie)
                setSelectedsousCategories(null)
        }
        const Ajouter_detail = () => {
                var taille = TailleSelect
                var coul = selectedCouleur
                if (showAUtresTaille) {
                        taille = {
                                ID_TAILLE: 'autre',
                                TAILLE: autreTailles
                        }
                }
                if (showAUtresCouleur) {
                        coul = {
                                ID_COULEUR: 'autre',
                                COULEUR: autreCouleurs
                        }
                }
                setDetailData(t => [...t, {
                        quantite: data.quantite,
                        TailleSelect: taille,
                        selectedCouleur: coul
                }])
                ajoutDetailsModalizeRef.current.close()
        }

        const ajoutTailleInput = (autresTaille) => {
                setAutreTailles(autresTaille)
                tailleModalizeRef.current.close()
        }

        const autreCouleurInput = (autresCouleur) => {
                setAutreCouleurs(autresCouleur)
                couleurModalizeRef.current.close()
        }
        const [data, handleChange, setValue] = useForm({
                shop: partenaire.produit.NOM_ORGANISATION,
                adresse: partenaire.produit.ADDRESSE,
                ouvert: partenaire.produit.OUVERT,
                tele: partenaire.produit.TELEPHONE,
                description: partenaire.produit.PRESENTATION,
                TailleSelect: null,
                selectedCouleur: null,
                CategorieSelect: null,
                selectedSousCategorie: null,
                produit: "",
                prix: "",
                quantite: "",
                logoImage: "",
                autresTaille: "",
                autresCouleur: "",
                searchCatgorie: "",
                searchSousCatgorie: "",
                nomCategorie: "",
        })
        useEffect(() => {
                (async () => {
                        try {
                                setLoadingCatagories(true)
                                var url = "/produit/categorie"
                                if (data.searchCatgorie) {
                                        url = `/produit/categorie?q=${data.searchCatgorie}`
                                }
                                const catego = await fetchApi(url)
                                setCategories(catego.result)
                        } catch (error) {
                                console.log(error)
                        } finally {
                                setLoadingCatagories(false)

                        }
                })()
        }, [data.searchCatgorie])

        useEffect(() => {
                (async () => {
                        try {
                                setLoadingCatagories(true)
                                if (CategorieSelect != null) {
                                        var url =`/produit/sous_categorie/${CategorieSelect?.ID_CATEGORIE_PRODUIT}`
                                        if (data.searchSousCatgorie) {
                                                url = `/produit/sous_categorie/${CategorieSelect?.ID_CATEGORIE_PRODUIT}?q=${data.searchSousCatgorie}`
                                        }
                                        const sousCatego = await fetchApi(url)
                                        setSouscategories(sousCatego.result)
                                }
                        }
                        catch (error) {
                                console.log(error)
                        } finally {
                                setLoadingCatagories(false)

                        }
                })()
        }, [CategorieSelect,data.searchCatgorie])

        useEffect(() => {
                (async () => {
                        try {
                                var taille = await fetchApi(`/produit/taille?ID_CATEGORIE_PRODUIT=${CategorieSelect?.ID_CATEGORIE_PRODUIT}`)
                                if (selectedSousCategorie != null) {
                                        var taille = await fetchApi(`/produit/taille?ID_CATEGORIE_PRODUIT=${CategorieSelect?.ID_CATEGORIE_PRODUIT}&ID_PRODUIT_SOUS_CATEGORIE=${selectedSousCategorie.ID_PRODUIT_SOUS_CATEGORIE}`)
                                        setTaille(taille.result)
                                }

                        }
                        catch (error) {
                                console.log(error)
                        } finally {

                        }
                })()
        }, [CategorieSelect, selectedSousCategorie])

        useEffect(() => {
                (async () => {
                        try {
                                var couleur = await fetchApi(`/produit/couleur?ID_CATEGORIE_PRODUIT=${CategorieSelect?.ID_CATEGORIE_PRODUIT}`)
                                if (selectedSousCategorie != null) {
                                        var couleur = await fetchApi(`/produit/couleur?ID_CATEGORIE_PRODUIT=${CategorieSelect?.ID_CATEGORIE_PRODUIT}&ID_PRODUIT_SOUS_CATEGORIE=${selectedSousCategorie.ID_PRODUIT_SOUS_CATEGORIE}`)
                                        setCouleur(couleur.result)
                                }
                        }
                        catch (error) {
                                console.log(error)
                        } finally {

                        }

                })()
        }, [CategorieSelect, selectedSousCategorie])

        const onCouleurSelect = (couleur) => {
                setselectedCouleur(couleur)
                setShowAUtresCouleur(false)
                couleurModalizeRef.current.close()
        }

        const onTaillesSelect = (taille) => {
                setTailleSelect(taille)
                setShowAUtresTaille(false)
                tailleModalizeRef.current.close()
        }

        const onCategorieSelect = (categorie) => {
                setCategorieSelect(categorie)
                categoriesModalizeRef.current.close()
        }

        const onSousCategorieSelect = (souscategorie) => {
                setselectedSousCategorie(souscategorie)
                SousCategoriesModalizeRef.current.close()
        }

        const AutresTypesTaille = () => {
                setShowAUtresTaille(true)
                setTailleSelect(null)
        }

        const AutresTypesCouleurs = () => {
                setShowAUtresCouleur(true)
                setselectedCouleur(false)

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

                        const menuUpdate = await fetchApi(`/service/updateImage/${partenaire.produit.ID_PARTENAIRE_SERVICE}`, {
                                method: "PUT",
                                body: form
                        })
                        setimagUpdate(menuUpdate.result)
                }
                catch (error) {
                        console.log(error)
                }
                finally {
                        setLoading(false)
                }
        }
        const onRemoveImage = index => {
                const newImages = images.filter((_, i) => i != index)
                setImages(newImages)
        }
        var IMAGES = [
                partenaire.produit.LOGO ? partenaire.produit.LOGO : undefined,
                partenaire.produit.BACKGROUND_IMAGE ? partenaire.produit.BACKGROUND_IMAGE : undefined,
        ]

        const { checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                quantite: {
                        required: true,

                },
        }, {
                quantite: {
                        required: "Quantite est obligatoire"
                },
        })

        const fecthProduits = async () => {
                try {
                        const response = await fetchApi(`/products/categorie/${partenaire.produit.ID_PARTENAIRE_SERVICE} `, {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                        })
                        setCategoriesProduits(response.result)

                }
                catch (error) {
                        console.log(error)
                } finally {
                        setLoadingCatagories(false)
                }
        }
        useFocusEffect(useCallback(() => {
                fecthProduits()
        }, []))
        const UpdateData = async () => {
                try {
                        setLoading(true)
                        const form = new FormData()
                        form.append("NOM_ORGANISATION", data.shop)
                        form.append("ADRESSE", data.adresse)
                        form.append("OUVERT", data.ouvert)
                        form.append("TELEPHONE", data.tele)
                        form.append("PRESENTATION", data.description)
                        const updateProduct = await fetchApi(`/partenaire/Updateshop/${partenaire.produit.ID_PARTENAIRE_SERVICE}`, {
                                method: "PUT",
                                body: form
                        })

                        setUpdateShop(updateProduct.result.NOM_ORGANISATION)
                        setUpdateAdresse(updateProduct.result.ADRESSE_COMPLETE)
                        setUpdateOuvert(updateProduct.result.OUVERT)
                        setUpdateTele(updateProduct.result.TELEPHONE)
                        setUpdateDescription(updateProduct.result.PRESENTATION)
                        ShopmodaliseRef.current.close()
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
        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                var url = `/partenaire/produit/${partenaire.produit.ID_PARTENAIRE_SERVICE}`
                                const produits = await fetchApi(url)
                                setProducts(produits.result)
                        } catch (error) {
                                console.log(error)
                        } finally {
                                setFirstLoadingProducts(false)
                        }
                })()
        }, []))
        function strUcFirst(a) {
                return (a + '').charAt(0).toUpperCase() + a.substr(1);
        }
        const SendData = async () => {
                setLoadingAdd(true)
                try {
                        const form = new FormData()
                        form.append('ID_CATEGORIE_PRODUIT', CategorieSelect?.ID_CATEGORIE_PRODUIT)
                        form.append('ID_PRODUIT_SOUS_CATEGORIE', selectedSousCategorie.ID_PRODUIT_SOUS_CATEGORIE)
                        form.append('NOM', data.produit)
                        form.append('PRIX', data.prix)
                        form.append('ID_PARTENAIRE_SERVICE', partenaire.produit.ID_PARTENAIRE_SERVICE)
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
                        form.append('DETAIL', JSON.stringify(detailData))
                        const res = await fetchApi("/produit/stock/create", {
                                method: "POST",
                                body: form
                        })
                        setnewProduct(res.result)
                        FormmodalizeRef.current?.close()
                }
                catch (error) {
                        console.log(error)
                }
                finally {
                        handleChange('produit', "")
                        handleChange('prix', "")
                        handleChange('quantite', "")
                        setTailleSelect(null)
                        setImages([]),
                                setDetailData([])
                        setAutreCouleurs(false)
                        setselectedSousCategorie(null)
                        setAutreTailles(false)
                        setselectedCouleur(null)
                        setCategorieSelect(null)
                        setLoadingAdd(false)
                }
        }
        return (
                <>
                        {loadingAdd || loading && <Loading />}
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
                                        {imagUpdate.length > 0 ?
                                                <View style={{ width: '100%', marginTop: 10 }}>
                                                        <  Image source={{ uri: imagUpdate[0].LOGO }} style={{ ...styles.imagePrincipal }} />
                                                </View>
                                                :
                                                <View style={{ width: '100%', maxHeight: "100%", marginTop: 10 }}>
                                                        <  Image source={{ uri: partenaire.produit.LOGO }} style={{ ...styles.imagePrincipal }} />
                                                </View>}
                                </TouchableWithoutFeedback>

                                <TouchableOpacity onPress={() => onSelectPhoto()} style={styles.uploadImages}>
                                        <Feather name="image" size={24} color={COLORS.ecommercePrimaryColor} />
                                </TouchableOpacity>

                                <View style={{ marginHorizontal: "2%", marginTop: "2%", flexDirection: "row", justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={onPressShop}>
                                                <View style={{ flexDirection: "row" }}>
                                                        <Text style={{ fontWeight: "bold", color: COLORS.ecommerceOrange }}>
                                                                {updateShop ? strUcFirst(updateShop.toLowerCase()) : strUcFirst(partenaire.produit.NOM_ORGANISATION.toLowerCase())}
                                                        </Text>
                                                        <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" />
                                                </View>

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onPressAdresse}>
                                                <View style={{ flexDirection: "row" }}>
                                                        <SimpleLineIcons name="location-pin" size={15} color="black" />
                                                        <Text style={{ fontWeight: "bold", ontSize: 12, opacity: 0.5 }}> {updateAdresse ? updateAdresse : partenaire.produit.ADDRESSE} </Text>
                                                        <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" />
                                                </View>
                                        </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 10, justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: "row" }}>

                                                <AntDesign name="staro" size={20} color="#EFC519" />
                                                <Text style={{ fontSize: 15, marginLeft: 15, color: "#797E9A", right: 15 }}>5.0</Text>

                                        </View>
                                        <TouchableOpacity onPress={onPressOuvert}>
                                                <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
                                                        <AntDesign name="clockcircleo" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                                                        <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>{updateOuvert ? updateOuvert : partenaire.produit.OUVERT}</Text>
                                                        <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" />

                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${partenaire.produit.TELEPHONE}`); }} style={{ flexDirection: "row" }}>
                                                <SimpleLineIcons name="call-end" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                                                <TouchableOpacity onPress={onPressTele}>
                                                        <Text style={{ fontSize: 15, marginLeft: 20, color: "#797E9A", right: 15 }}>{updateTele ? updateTele : partenaire.produit.TELEPHONE}</Text>
                                                </TouchableOpacity>
                                                {/* <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" /> */}

                                        </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={onPressDescription}>
                                        <View style={{ marginHorizontal: 10, marginTop: "10%" }} >
                                                <Text style={{ color: "#797E9A", fontSize: 11, }}>
                                                        {updateDescription ? updateDescription : partenaire.produit.PRESENTATION}
                                                </Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={plusCategories} style={styles.plus}>
                                        <View>
                                                <Text style={[styles.titlePrincipal, products.length == 0 && { textAlign: "center" }]}>Mes categories</Text>
                                        </View>
                                        {categoriesProduits.length > 4 && <View style={{ marginLeft: 100 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} style={{ marginRight: -15 }} />
                                                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} />
                                                </View>
                                        </View>}
                                </TouchableOpacity>
                                <ScrollView
                                        style={styles.shops}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                >
                                        <View style={styles.categories}>
                                                {categoriesProduits.map((categorie, index) => {
                                                        return (

                                                                <TouchableOpacity onPress={() => onCategoryPress(categorie)} style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                                                        <View style={[styles.categoryPhoto, { backgroundColor: categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT ? COLORS.handleColor : "#DFE1E9" }]}>
                                                                                <Image source={{ uri: categorie.IMAGE }} style={[styles.DataImageCategorie, , { opacity: categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT ? 0.2 : 1 }]} />
                                                                        </View>
                                                                        <Text style={[{ fontSize: 8, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                                                        {categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT && <View style={[styles.categoryChecked, { backgroundColor: categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT }]}>
                                                                                <AntDesign style={{ marginTop: 20, marginLeft: 20, color: COLORS.ecommercePrimaryColor }} name="check" size={40} color='#000' />
                                                                        </View>}
                                                                </TouchableOpacity>
                                                        )
                                                })}
                                        </View>
                                </ScrollView>
                                <TouchableOpacity onPress={productPress} style={styles.plus}>
                                        <View>
                                                <Text style={[styles.titlePrincipal, products.length == 0 && { textAlign: "center" }]}>Mes articles</Text>
                                        </View>
                                        {products.length > 4 && <View style={{ marginLeft: 100 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} style={{ marginRight: -15 }} />
                                                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommerceOrange} />
                                                </View>
                                        </View>}
                                </TouchableOpacity>

                                {firstLoadingProducts ? <HomeProductsSkeletons wrap /> :
                                        products.length == 0 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                                                <Feather name="check-square" size={24} color="#777" />
                                                <Text style={{ color: '#777', paddingHorizontal: 50, textAlign: "center", marginTop: 10 }}>
                                                        Votre stock est vide. Cliquez sur le bouton en dessous pour ajouter un nouveau produit
                                                </Text>
                                        </View> : <View style={styles.products}>
                                                {products?.map((product, index) => {

                                                        return (
                                                                <Product
                                                                        product={product}
                                                                        index={index}
                                                                        totalLength={products.length}
                                                                        key={index}
                                                                        fixMargins

                                                                />
                                                        )
                                                })
                                                }

                                        </View>
                                }

                                {showImageModal &&

                                        <ImageView
                                                images={IMAGES.map(img => ({ uri: img }))}
                                                imageIndex={imageIndex}
                                                visible={showImageModal}
                                                onRequestClose={() => setShowImageModal(false)}
                                                swipeToCloseEnabled
                                                keyExtractor={(_, index) => index.toString()}
                                        />
                                }
                                {/* </ScrollView> */}

                        </ScrollView>
                        <View style={{ flexDirection: "row", marginTop: "-15%", marginLeft: "77%", marginBottom: "3%" }}>
                                <TouchableOpacity onPress={addNew} >
                                        <View style={{ backgroundColor: COLORS.ecommerceOrange, borderRadius: 50, width: 70, height: 70, alignItems: "center", justifyContent: "center" }}>
                                                <Ionicons name="add" size={40} color="white" />
                                        </View>
                                </TouchableOpacity>
                        </View>
                        <Modalize
                                ref={productmodalizeRef}
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
                                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Mes produits</Text>
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

                                                {products.map((product, index) => {
                                                        return (
                                                                <Product
                                                                        product={product}
                                                                        index={index}
                                                                        totalLength={products.length}
                                                                        key={index}
                                                                        fixMargins
                                                                />
                                                        )
                                                })}
                                        </View>
                                </ScrollView>
                                <TouchableOpacity style={styles.addBtn} onPress={addNew}>
                                        {/* <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("ProduitFormulaireScreen", { product: false, partenaire: partenaire })}> */}
                                        <Text style={styles.addBtnText}>Nouveau produit</Text>
                                </TouchableOpacity>
                                {/* } */}
                        </Modalize>


                        <Modalize ref={uploadModaliseRef} handlePosition="inside" modalHeight={100} snapPoint={250}>
                                <View style={styles.modalContent}>

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
                        <Modalize ref={ShopmodaliseRef} adjustToContentHeight
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
                                                label={"Modifier la Boutique"}
                                                value={data.shop}
                                                onChangeText={(newValue) => handleChange('shop', newValue)}
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
                                                label={"Modifier l'adresse"}
                                                // adresse:partenaire.produit.ADDRESSE,
                                                value={partenaire.produit.ADDRESSE}
                                                onChangeText={(newValue) => handleChange('adresse', newValue)}
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
                                                label={"Modifier le heure d travail"}
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
                        <Modalize ref={TelemodaliseRef}
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
                        >
                                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                                <View style={styles.inputCard}>
                                        {/* <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} /> */}
                                        <OutlinedTextField
                                                style={styles.input}
                                                label={"Modifier le telephone"}
                                                // tele:partenaire.produit.TELEPHONE
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
                        <Modalize ref={DescriptionmodalizeRef}
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
                        >
                                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>

                                <View style={styles.inputCard}>
                                        <OutlinedTextField
                                                label={"Modifier la description"}
                                                fontSize={14}
                                                value={data.description}
                                                onChangeText={(newValue) => handleChange('description', newValue)}
                                                lineWidth={0.5}
                                                activeLineWidth={0.5}
                                                baseColor={COLORS.smallBrown}
                                                tintColor={COLORS.primary}
                                                multiline={true}
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
                        // onClosed={() => {
                        //     setIsOpen(false)
                        //     setLoadingForm(true)
                        // }}
                        >
                                <ScrollView>
                                        <Text style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>catégories</Text>
                                        <View style={styles.cate}>
                                                {categories.map((categorie, index) => {
                                                        return (
                                                                <View style={{ ...styles.categoryModel, margin: 15 }} >
                                                                        <View style={styles.actionIcon}>
                                                                                <ImageBackground source={{ uri: categorie.IMAGE }} borderRadius={15} style={styles.categoryImage} />
                                                                        </View>
                                                                        <Text style={[{ fontSize: 10, fontWeight: "bold" }, { color: "#797E9A" }]}>{categorie.NOM}</Text>
                                                                </View>
                                                        )
                                                })}
                                        </View>
                                </ScrollView>
                        </Modalize>
                        <Modalize
                                ref={FormmodalizeRef}
                                // adjustToContentHeight
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
                        >
                                <Text style={styles.title}>Nouveau produit</Text>

                                <ScrollView>

                                        <View>

                                                <View>
                                                        <View style={styles.inputCard}>
                                                                <OutlinedTextField
                                                                        label={"Nom du produit"}
                                                                        fontSize={14}
                                                                        value={data.produit}
                                                                        onChangeText={(newValue) => handleChange('produit', newValue)}
                                                                        onBlur={() => checkFieldData('produit')}
                                                                        error={hasError('produit') ? getError('produit') : ''}
                                                                        lineWidth={0.5}
                                                                        activeLineWidth={0.5}
                                                                        baseColor={COLORS.smallBrown}
                                                                        tintColor={COLORS.primary}
                                                                />
                                                        </View>
                                                        <View>
                                                                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: 20 }}
                                                                        onPress={() => categoriesModalizeRef.current.open()}
                                                                // disabled={service.id_service == 2}
                                                                >
                                                                        <View >
                                                                                <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                        Categorie
                                                                                </Text>
                                                                                {CategorieSelect && <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                        {CategorieSelect?.NOM}
                                                                                </Text>}
                                                                        </View>
                                                                        <AntDesign name="caretdown" size={20} color="#777" />
                                                                </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: 20, marginTop: 10 }}
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
                                                                        error={hasError('prix') ? getError('prix') : ''}
                                                                        lineWidth={0.5}
                                                                        activeLineWidth={0.5}
                                                                        baseColor={COLORS.smallBrown}
                                                                        tintColor={COLORS.primary}
                                                                />
                                                        </View>
                                                </View>
                                                {/* <View style={{ flexDirection: "row", marginTop: "-1%",marginBottom:"-10%", marginLeft: "75%", marginBottom: "1%" }}>
                                                        <TouchableOpacity onPress={addNew} >
                                                                <View style={{flexDirection:"row", backgroundColor: COLORS.ecommerceOrange, borderRadius: 50, width: 60, height: 60, alignItems: "center", justifyContent: "center" }}>
                                                                        <Ionicons name="add" size={20} color="white" />
                                                                        <Text style={{color:"white",fontSize:10}}>Detail</Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                </View> */}
                                                <TouchableOpacity
                                                        onPress={() => ajoutDetailsModalizeRef.current.open()}
                                                >
                                                        <View style={styles.button1}>
                                                                <Text style={styles.buttonText} >Ajout de details </Text>
                                                        </View>
                                                </TouchableOpacity>
                                                {detailData.map((detail, index) => {
                                                        return (
                                                                <View key={index} style={{ marginHorizontal: 20, marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                                                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                                <Text style={{ fontSize: 13, fontWeight: "bold" }}>Quantite {detail.quantite}</Text>
                                                                                <Text style={{ fontSize: 13, fontWeight: "bold" }}>Taille {detail.TailleSelect.TAILLE}</Text>
                                                                                <Text style={{ fontSize: 13, fontWeight: "bold" }}>Couleur {detail.selectedCouleur.COULEUR}</Text>
                                                                        </View>
                                                                </View>
                                                        )
                                                })}
                                                <View style={styles.selectControl}>
                                                        <Text style={styles.inputCard}>Images </Text>
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



                                                <TouchableOpacity onPress={SendData}>
                                                        <View style={styles.button}>
                                                                <Text style={styles.buttonText} > Enregistrer</Text>
                                                        </View>
                                                </TouchableOpacity>
                                        </View>
                                </ScrollView>
                        </Modalize>

                        {/* LES CATEGORIES */}
                        <Modalize ref={categoriesModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Categories</Text>
                                        </View>
                                        <View>
                                                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
                                                        <View style={styles.searchSection}>
                                                                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                <TextInput
                                                                        style={styles.input}
                                                                        value={data.searchCatgorie}
                                                                        onChangeText={(newValue) => handleChange('searchCatgorie', newValue)}
                                                                        placeholder="Rechercher "
                                                                />
                                                        </View>
                                                </View>
                                               {!loadingCatagories && <TouchableOpacity 
                                               onPress={setAutreCategorie(true)}style={styles.modalAutres} >
                                                        {autreCategorie ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                        <Text style={{ fontSize: 15, }}>Autres</Text>
                                                </TouchableOpacity>}
                                                
                                                {loadingCatagories ?
                                               <CategoriesRearchSkeletons/>
                                                        :
                                                        categories.map((categorie, index) => {
                                                                return (
                                                                        <TouchableOpacity key={index} onPress={() => onCategorieSelect(categorie)}>
                                                                                <View style={styles.modalItemModel2} >
                                                                                        {CategorieSelect?.ID_CATEGORIE_PRODUIT == categorie.ID_CATEGORIE_PRODUIT ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                                        <Text>{categorie.NOM}</Text>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                )
                                                        })}
                                        </View>
                                </>
                        </Modalize>

                        {/* LES SOUS CATEGORIES */}
                        <Modalize ref={SousCategoriesModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Sous Categories</Text>
                                        </View>
                                        <View>
                                        <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
                                                        <View style={styles.searchSection}>
                                                                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                <TextInput
                                                                        style={styles.input}
                                                                        value={data.searchSousCatgorie}
                                                                        onChangeText={(newValue) => handleChange('searchSousCatgorie', newValue)}
                                                                        placeholder="Rechercher "
                                                                />
                                                        </View>
                                                </View>
                                                <TouchableOpacity style={styles.modalAutres} >
                                                        {showAUtresTaille ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                        <Text style={{ fontSize: 15, }}>Autres</Text>
                                                </TouchableOpacity>
                                                {
                                                        loadingCatagories ?
                                                                <CategoriesRearchSkeletons/>:
                                                souscategories.map((souscategorie, index) => {
                                                        return (
                                                                <TouchableOpacity key={index} onPress={() => onSousCategorieSelect(souscategorie)}>
                                                                        <View style={styles.modalItemModel2} >
                                                                                {selectedSousCategorie?.ID_PRODUIT_SOUS_CATEGORIE == souscategorie.ID_PRODUIT_SOUS_CATEGORIE ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                        <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                                <Text>{souscategorie.NOM}</Text>
                                                                        </View>
                                                                </TouchableOpacity>
                                                        )
                                                })
                                                
                                                }



                                        </View>
                                </>
                        </Modalize>

                        {/* DETAIL DES PRODUITS */}
                        <Modalize ref={ajoutDetailsModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Details</Text>
                                        </View>
                                        <View>
                                                <TouchableOpacity >
                                                        <View style={styles.modalItem} >
                                                                <View style={styles.inputCard}>
                                                                        <OutlinedTextField
                                                                                label={"Quantite Total"}
                                                                                fontSize={14}
                                                                                value={data.quantite}
                                                                                onChangeText={(newValue) => handleChange('quantite', newValue)}
                                                                                onBlur={() => checkFieldData('quantite')}
                                                                                error={hasError('quantite') ? getError('quantite') : ''}
                                                                                keyboardType='number-pad'
                                                                                lineWidth={0.5}
                                                                                activeLineWidth={0.5}
                                                                                baseColor={COLORS.smallBrown}
                                                                                tintColor={COLORS.primary}
                                                                        />

                                                                        <View>
                                                                                <TouchableOpacity style={styles.modalCard}
                                                                                        onPress={() => tailleModalizeRef.current.open()}
                                                                                >
                                                                                        <View >
                                                                                                <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                                        Taille
                                                                                                </Text>
                                                                                                {TailleSelect ? <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                                        {TailleSelect.TAILLE}
                                                                                                </Text> :
                                                                                                        <Text style={[styles.inputText, { color: '#000' }]}>{autreTailles}</Text>}
                                                                                        </View>
                                                                                        <AntDesign name="caretdown" size={20} color="#777" />
                                                                                </TouchableOpacity>
                                                                        </View>

                                                                        <View style={{ marginTop: 10 }}>
                                                                                <TouchableOpacity style={styles.modalCard}
                                                                                        onPress={() => couleurModalizeRef.current.open()}
                                                                                >
                                                                                        <View >
                                                                                                <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                                        Couleur
                                                                                                </Text>
                                                                                                {selectedCouleur ? <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                                        {selectedCouleur.COULEUR}
                                                                                                </Text> :
                                                                                                        <Text style={[styles.inputText, { color: '#000' }]}>{autreCouleurs}</Text>}
                                                                                        </View>
                                                                                        <AntDesign name="caretdown" size={20} color="#777" />
                                                                                </TouchableOpacity>
                                                                        </View>

                                                                        <TouchableOpacity onPress={Ajouter_detail}>
                                                                                <View style={styles.buttonModal}>
                                                                                        <Text style={styles.buttonText} >Ajouter</Text>
                                                                                </View>
                                                                        </TouchableOpacity>


                                                                </View>
                                                        </View>
                                                </TouchableOpacity>

                                        </View>
                                </>
                        </Modalize>

                        {/* TAILLE */}
                        <Modalize ref={tailleModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Tailles</Text>
                                        </View>
                                        <View>
                                                <TouchableOpacity style={styles.modalAutres} onPress={AutresTypesTaille}>
                                                        {showAUtresTaille ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Autres</Text>
                                                </TouchableOpacity>

                                                {tailles.map((taille, index) => {
                                                        return (
                                                                <TouchableOpacity key={index} onPress={() => onTaillesSelect(taille)}>
                                                                        <View style={styles.modalItemModel2} >
                                                                                {TailleSelect?.ID_TAILLE == taille.ID_TAILLE ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                        <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                                <Text>{taille.TAILLE}</Text>
                                                                        </View>

                                                                </TouchableOpacity>
                                                        )
                                                })}


                                                {showAUtresTaille && <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                                                        <OutlinedTextField
                                                                label={"Autres Tailles"}
                                                                fontSize={14}
                                                                value={data.autresTaille}
                                                                onChangeText={(newValue) => handleChange('autresTaille', newValue)}
                                                                onBlur={() => checkFieldData('autresTaille')}
                                                                error={hasError('autresTaille') ? getError('autresTaille') : ''}
                                                                lineWidth={0.5}
                                                                activeLineWidth={0.5}
                                                                baseColor={COLORS.smallBrown}
                                                                tintColor={COLORS.primary}
                                                        />
                                                </View>}

                                                {showAUtresTaille && <TouchableOpacity onPress={() => ajoutTailleInput(data.autresTaille)}>
                                                        <View style={styles.buttonModalSecond}>
                                                                <Text style={styles.buttonText} >Ajouter</Text>
                                                        </View>
                                                </TouchableOpacity>}




                                        </View>
                                </>
                        </Modalize>

                        {/* COULEUR */}
                        <Modalize ref={couleurModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Couleurs</Text>
                                        </View>
                                        <View>
                                                <TouchableOpacity style={styles.modalAutres} onPress={AutresTypesCouleurs}>
                                                        {showAUtresCouleur ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Autres</Text>
                                                </TouchableOpacity>

                                                {couleurs.map((couleur, index) => {
                                                        return (
                                                                <TouchableOpacity key={index} onPress={() => onCouleurSelect(couleur)}>
                                                                        <View style={styles.modalItemModel2} >
                                                                                {selectedCouleur?.ID_COULEUR == couleur.ID_COULEUR ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                        <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                                <Text>{couleur.COULEUR}</Text>
                                                                        </View>
                                                                </TouchableOpacity>
                                                        )
                                                })}

                                                {showAUtresCouleur && <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                                                        <OutlinedTextField
                                                                label={"Autres Couleurs"}
                                                                fontSize={14}
                                                                value={data.autresCouleur}
                                                                onChangeText={(newValue) => handleChange('autresCouleur', newValue)}
                                                                onBlur={() => checkFieldData('autresCouleur')}
                                                                error={hasError('autresCouleur') ? getError('autresCouleur') : ''}
                                                                lineWidth={0.5}
                                                                activeLineWidth={0.5}
                                                                baseColor={COLORS.smallBrown}
                                                                tintColor={COLORS.primary}
                                                        />
                                                </View>}

                                                {showAUtresCouleur && <TouchableOpacity onPress={() => autreCouleurInput(data.autresCouleur)}>
                                                        <View style={styles.buttonModalSecond}>
                                                                <Text style={styles.buttonText} >Ajouter</Text>
                                                        </View>
                                                </TouchableOpacity>}

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
        imagePrincipal:
        {
                width: '120%',
                height: 280,
                alignSelf: 'center',
                borderBottomLeftRadius: 60,
                borderBottomRightRadius: 60,
        },
        inputCard: {
                marginHorizontal: 10,
                marginTop: '-5%',
        },
        back: {
                padding: 10,
                height: 50,
                width: 50,
                backgroundColor: '#D7D9E4',
                // backgroundColor: COLORS.ecommercePrimaryColor,
                borderRadius: 50,

        },
        cate: {
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
        selectControl: {
                paddingHorizontal: 20,
                marginTop: 10
        },
        selectLabel: {
                fontWeight: "bold",
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
        actionIcon: {
                borderRadius: 15,
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                backgroundColor: '#fff',
        },
        categoryImage: {
                width: '100%',
                height: '100%',
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

        modalActionText: {
                fontWeight: "bold"
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
                marginTop: "-6%"
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
        cartBtn: {
                marginTop: 10,
                width: 45,
                height: 45,
                backgroundColor: "#FBD5DA",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
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
                fontSize: 15,
                // fontWeight: "bold",
                marginTop: "1%",
                marginBottom: "1%",
                color: COLORS.ecommercePrimaryColor,
                opacity: 0.7
        },
        plus: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginBottom: "-1%"
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
                paddingHorizontal: 20
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
        category: {
                alignItems: 'center',
                borderRadius: 10,
                marginLeft: 0,
                elevation: 3,
                marginRight: 5,
                backgroundColor: 'white',
                borderRadius: 10
        },
        DataImageCategorie: {
                width: '100%',
                height: '100%',
                borderRadius: 10,
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
                fontWeight: 'bold',
                textAlign: "center"
        },
        products: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: "3%"
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
                width: "98%",
                height: 50,
                marginHorizontal: 10,
                paddingHorizontal: 10
        },
        btnRonde: {
                backgroundColor: COLORS.ecommerceOrange,
                padding: 40,
                width: 40,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#ddd",


        },
        positionCard: {
                position: "absolute",
                bottom: 20,
                marginHorizontal: 20,
                right: 0
        },
        addBtnText: {
                color: '#FFF',
                fontWeight: "bold",
                textAlign: "center",
        },



        // container: {
        //         flex: 1,
        // },
        cardHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                height: 88
        },
        menuOpener: {
                marginTop: 25
        },
        menuOpenerLine: {
                height: 3,
                width: 30,
                backgroundColor: COLORS.primary,
                marginTop: 5
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
                marginTop: 10,

        },
        button: {
                marginTop: 10,
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 10,
                backgroundColor: COLORS.primaryPicker,
                marginHorizontal: 20
        },
        button1: {
                marginTop: 10,
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 10,
                backgroundColor: COLORS.ecommerceOrange,
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
})