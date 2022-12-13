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
import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import ImageView from "react-native-image-viewing";
import { Modalize } from "react-native-modalize";
import { OutlinedTextField } from "rn-material-ui-textfield";
import { useForm } from "../../hooks/useForm";

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
        const [selectedCategorie, setSelectedCategorie] = useState(null)

        const [updateShop, setUpdateShop] = useState(false)
        const [updateAdresse, setUpdateAdresse] = useState(false)
        const [updateOuvert, setUpdateOuvert] = useState(false)
        const [updateTele, setUpdateTele] = useState(false)
        const [updateDescription, setUpdateDescription] = useState(false)
        const [updatData, setUpdatData] = useState(null)


        const [loadingSubCategories, setLoadingSubCategories] = useState(false)
        const [sousCategories, SetSousCategories] = useState([])
        const [selectedsousCategories, setSelectedsousCategories] = useState(null)

        const navigation = useNavigation()
        const route = useRoute()
        const { partenaire } = route.params
        const [partenaireUpdate, setPartenaireUpdate] = useState(partenaire)

        // console.log()

        const uploadModaliseRef = useRef()
        const ShopmodaliseRef = useRef()
        const AdressemodaliseRef = useRef()
        const OuvertmodaliseRef = useRef()
        const TelemodaliseRef = useRef()
        const DescriptionmodalizeRef = useRef()
        const CategoriemodalizeRef = useRef()

        const plusCategories = () => {
                // setIsOpen(true)
                CategoriemodalizeRef.current?.open()
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
        var IMAGES = [
                partenaire.produit.LOGO ? partenaire.produit.LOGO : undefined,
                partenaire.produit.BACKGROUND_IMAGE ? partenaire.produit.BACKGROUND_IMAGE : undefined,
        ]
        const [data, handleChange, setValue] = useForm({
                shop: partenaire.produit.NOM_ORGANISATION,
                adresse: partenaire.produit.ADDRESSE,
                ouvert: partenaire.produit.OUVERT,
                tele: partenaire.produit.TELEPHONE,
                description: partenaire.produit.PRESENTATION,
        })

        const fecthProduits = async () => {
                try {
                        const response = await fetchApi(`/products/categorie/${partenaire.produit.ID_PARTENAIRE_SERVICE} `, {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                        })
                        setCategories(response.result)
                        console.log(categories)

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
                        // setLoading(true)
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
                        setPartenaireUpdate(updateProduct.result)
                        // console.log(partenaireUpdate)
                        ShopmodaliseRef.current.close()
                        AdressemodaliseRef.current.close()
                        OuvertmodaliseRef.current.close()
                        TelemodaliseRef.current.close()
                        DescriptionmodalizeRef.current.close()
                        // navigation.navigate("EcommerceHomeScreen", { partenaire: partenaire })

                        // navigation.navigate("EcommerceHomeScreen",{partenaire:partenaire})
                } catch (error) {
                        console.lsog(error)
                } finally {
                        // setLoading(false)
                }
        }
        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                var url = `/partenaire/produit/${partenaire.produit.ID_PARTENAIRE_SERVICE}`
                                const produits = await fetchApi(url)
                                setProducts(produits.result)
                                // console.log(produits.result)
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
        return (
                <>
                        <ScrollView style={styles.container}>
                                <TouchableWithoutFeedback key={1} onPress={() => {
                                        setImageIndex(1)
                                        setShowImageModal(true)
                                }}>
                                        <View style={{ width: '100%', maxHeight: "100%", marginTop: 10 }}>
                                                <  Image source={{ uri: partenaire.produit.LOGO }} style={{ ...styles.imagePrincipal }} />
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
                                        <TouchableOpacity onPress={onPressShop}>
                                                <View style={{ flexDirection: "row" }}>
                                                        <Text style={{ fontWeight: "bold", color: COLORS.ecommerceOrange }}>
                                                                {strUcFirst(partenaire.produit.NOM_ORGANISATION.toLowerCase())}
                                                        </Text>
                                                        <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" />
                                                </View>

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onPressAdresse}>
                                                <View style={{ flexDirection: "row" }}>
                                                        <SimpleLineIcons name="location-pin" size={15} color="black" />
                                                        <Text style={{ fontWeight: "bold", ontSize: 12, opacity: 0.5 }}> {partenaire.produit.ADDRESSE} </Text>
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
                                                        <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>{partenaireUpdate.produit.OUVERT}</Text>
                                                        <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" />

                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${partenaire.produit.TELEPHONE}`); }} style={{ flexDirection: "row" }}>
                                                <SimpleLineIcons name="call-end" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                                                <TouchableOpacity onPress={onPressTele}>
                                                        <Text style={{ fontSize: 15, marginLeft: 20, color: "#797E9A", right: 15 }}>{partenaire.produit.TELEPHONE}</Text>
                                                </TouchableOpacity>
                                                {/* <EvilIcons style={{ opacity: 0.5 }} name="pencil" size={22} color="black" /> */}

                                        </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={onPressDescription}>
                                        <View style={{ marginHorizontal: 10, marginTop: "10%" }} >
                                                <Text style={{ color: "#797E9A", fontSize: 11, }}>
                                                        {partenaire.produit.PRESENTATION}
                                                </Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={plusCategories} style={styles.plus}>
                                        <View>
                                                <Text style={[styles.titlePrincipal, products.length == 0 && { textAlign: "center" }]}>Mes categories</Text>
                                        </View>
                                       {categories.length>4 && <View style={{ marginLeft: 100 }}>
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
                                                {categories.map((categorie, index) => {
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
                                        {products.length>4 &&<View style={{ marginLeft: 100 }}>
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
                        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("ProduitFormulaireScreen", { product: false, partenaire: partenaire })}>
                                <Text style={styles.addBtnText}>Nouveau produit</Text>
                        </TouchableOpacity>
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
                                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("ProduitFormulaireScreen", { product: false, partenaire: partenaire })}>
                                        <Text style={styles.addBtnText}>Nouveau produit</Text>
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
                                                value={partenaire.produit.TELEPHONE}
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
                position: 'absolute',
                // marginRight: 10,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: "row",
                justifyContent: "space-between",
                top: "4%",
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
                backgroundColor: "#D7D9E4",
                width: "84%",
                height: 50,
                paddingHorizontal: 10
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
                fontWeight: 'bold'
        },
        products: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom:"3%"
        },
        addBtn: {
                // paddingVertical: 10,
                // minWidth: "100%",
                // alignSelf: "center",
                // backgroundColor: COLORS.ecommerceOrange,
                // borderRadius: 10,
                // paddingVertical: 15,
                // marginBottom: 10,
                flexDirection: "row",
                marginTop: "0%",
                marginBottom: "2%",
                padding: 5,
                borderRadius: 10,
                alignItems: 'center',
                backgroundColor: COLORS.ecommerceOrange,
                width: "95%",
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
                color: '#fff',
                fontWeight: "bold",
                textAlign: "center",
                left: "300%"
                // position: "absolute",
                // marginTop: 25,
                // marginLeft:8,
                // fontSize:17
        }
})