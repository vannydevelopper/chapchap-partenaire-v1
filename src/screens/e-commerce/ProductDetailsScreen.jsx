import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar, Modal, ActivityIndicator, Alert } from "react-native"
import { Ionicons, AntDesign, Feather, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useNavigation, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector"
import Product from "../../components/ecommerce/main/Product";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { FontAwesome } from '@expo/vector-icons';
import { useRef } from "react";
import ProductImages from "../../components/ecommerce/details/ProductImages";
import moment from "moment/moment";
import Loading from "../../components/app/Loading";
import Couleur from "../../components/ecommerce/main/Couleur";
import { useForm } from "../../hooks/useForm";
export default function ProductDetailsScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const [productUpdate, setProductUpdate] = useState(null)
    const [descriptionUpdate, setDescriptionUpdate] = useState(null)
    const [prixUpdate, setPrixUpdate] = useState(null)
    const [autreSize, setAutreSize] = useState(false)
    const [autreColor, setAutreColor] = useState(false)
    const [serviceUpdate, setServiceUpdate] = useState()

    const { product } = route.params
    const modalizeRef = useRef(null)
    const variantmodaliseRef = useRef()

    const [isOpen, setIsOpen] = useState(false)
    const [loadingForm, setLoadingForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [note, Setnote] = useState(null)
    const [commentaire, Setcommentaire] = useState(null)
    const [SIZES, setSIZES] = useState([])
    const [SIZESUPDATE, setSIZESUPDATE] = useState([])

    const [ALLSIZES, setALLSIZES] = useState([])
    const [ALLCOLORS, setALLCOLORS] = useState([])
    const [colors, SetColors] = useState([])
    const [colorsUpdate, SetColorsUpdate] = useState([])

    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

    const [quantite, setQuantite] = useState(null)
    const [isFocused, setIsFocused] = useState(false)
    const [ColorSelect, setColorSelect] = useState(false)
    const [SizeSelect, setSizeSelect] = useState(false)




    const onCartPress = () => {
        setIsOpen(true)
        modalizeRef.current?.open()
    }
    moment.updateLocale('fr', {
        calendar: {
            sameDay: "[Aujourd'hui]",
            lastDay: '[Hier]',
            nextDay: 'DD-M-YYYY',
            lastWeek: 'DD-M-YYYY',
            sameElse: 'DD-M-YYYY',
        },
    })

    const approvisionneModaliseRef = useRef()
    const PricemodaliseRef = useRef()
    const ProductmodaliseRef = useRef()
    const DescriptionmodalizeRef = useRef()
    const allColorsModalizeRef = useRef()
    const allSizesModalizeRef = useRef()
    const onPressAprovisionner = () => {
        approvisionneModaliseRef.current.open()
    }
    const onColorSelect = (color) => {
        setColorSelect(color)
        setAutreSize(false)
        allColorsModalizeRef.current.close()
    }
    const onSizeSelect = (size) => {
        setSizeSelect(size)
        allSizesModalizeRef.current.close()
    }
    var IMAGES = [
        product.produit_partenaire.IMAGE_1 ? product.produit_partenaire.IMAGE_1 : undefined,
        product.produit_partenaire.IMAGE_2 ? product.produit_partenaire.IMAGE_2 : undefined,
        product.produit_partenaire.IMAGE_3 ? product.produit_partenaire.IMAGE_3 : undefined,
    ]
    const onetoilePress = (note) => {
        Setnote(note)
    }
    const onDecrement = () => {
        if (parseInt(quantite) == 1) {
            return false
        }
        if (parseInt(quantite) <= 0) {
            return 1
        }
        setQuantite(l => parseInt(l) - 1)
    }
    const onIncrement = () => {
        setQuantite(l => parseInt(l) + 1)
    }

    const onChangeText = am => {
        setQuantite(am)
    }
    const onSelectPhoto = () => {
        uploadModaliseRef.current.open()
    }
    const onPressPrice = () => {
        PricemodaliseRef.current.open()
    }
    const onPressProduct = () => {
        ProductmodaliseRef.current.open()
    }
    const onPressDescription = () => {
        DescriptionmodalizeRef.current.open()
    }
    const [data, handleChange, setValue] = useForm({
        price: product.produit_partenaire.PRIX,
        product: product.produit.NOM,
        description: product.produit.DESCRIPTION,
        newSize: "",
        newColor: "",

    })
    const onAutreSizeSelect = () => {
        setAutreSize(true)
        setSizeSelect(null)
        setSelectedSize(null)
        setQuantite(1)
    }
    const onAutreColorSelect = () => {
        setAutreColor(true)
        setColorSelect(null)
        setSelectedColor(null)
        setQuantite(1)

    }
    const TerminerSize = () => {
        allSizesModalizeRef.current.close()
    }
    const TerminerColor = () => {
        allColorsModalizeRef.current.close()
    }
    const fecthProduits = async () => {
        try {
            const response = await fetchApi(`/products/products/${product.produit_partenaire.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            // setShopProducts(response.result)

        }

        catch (error) {
            console.log(error)
        } finally {
            // setLoadingShopProducts(false)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthProduits()
    }, []))

    useEffect(() => {
        (async () => {
            try {
                var url = `/products?category=${product.categorie.ID_CATEGORIE_PRODUIT}`
                const produits = await fetchApi(url)

            } catch (error) {
                console.log(error)
            } finally {
                // setLoadingSimilarProducts(false)
            }
        })()
    }, [])
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setLoadingForm(false)
            })
            return () => {
                clearTimeout(timer)
            }
        }
    }, [isOpen])
    const enregistrement = async () => {

        try {

            setLoading(true)
            const res = await fetchApi("/products/note", {
                method: 'POST',
                body: JSON.stringify({
                    ID_PRODUIT_PARTENAIRE: product.produit.ID_PRODUIT_PARTENAIRE,
                    NOTE: note,
                    COMMENTAIRE: commentaire,


                }),

                headers: { "Content-Type": "application/json" },


            })

        }


        catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
            Setcommentaire("")


        }


    }
    useEffect(() => {
        (async () => {
            try {
                var url = `/products/note/liste/${product.produit.ID_PRODUIT_PARTENAIRE}`
                const produitsNotes = await fetchApi(url)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])




    useEffect(() => {
        (async () => {
            try {
                var url = `/products/note/${product.produit.ID_PRODUIT_PARTENAIRE}`
                const userNotes = await fetchApi(url)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const onSizePress = async (size) => {

        try {
            // setLoadingSubCategories(true)
            if (size?.id) {
                const color = await fetchApi(`/products/color/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}/${size?.id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                SetColors(color.result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fecthSizes = async () => {
        try {
            const sizes = await fetchApi(`/products/size/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })
            setSIZES(sizes.result)
        }
        catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => {
        fecthSizes()
    }, []))

    const fecthAllSizes = async () => {
        try {
            const sizes = await fetchApi(`/products/tailles/${product.categorie.ID_CATEGORIE_PRODUIT}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })
            setALLSIZES(sizes.result)
        }
        catch (error) {
            console.log(error)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthAllSizes()
    }, []))

    const fecthAllColors = async () => {
        try {
            const colors = await fetchApi(`/products/couleurs/${product.categorie.ID_CATEGORIE_PRODUIT}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })
            setALLCOLORS(colors.result)

        }
        catch (error) {
            console.log(error)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthAllColors()
    }, []))
    const UpdateNom = async () => {
        try {
            // setLoading(true)
            const form = new FormData()
            form.append("NOM", data.product)
            const updateProduct = await fetchApi(`/products/updateNom/${product.produit.ID_PRODUIT}`, {
                method: "PUT",
                body: form
            })
            setProductUpdate(updateProduct.result.NOM)
            ProductmodaliseRef.current.close()
        } catch (error) {
            console.log(error)
        } finally {
            // setLoading(false)
        }
    }
    const UpdateDescription = async () => {

        try {
            const form = new FormData()
            form.append("DESCRIPTION", data.description)
            const updateDescription = await fetchApi(`/products/updateDescription/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}`, {
                method: "PUT",
                body: form
            })
            setDescriptionUpdate(updateDescription.result.DESCRIPTION)

            DescriptionmodalizeRef.current.close()
        } catch (error) {
            console.log(error)
        } finally {
            // setLoading(false)
        }
    }

    const aprovisionner = async () => {
        try {
            const form = new FormData()
            form.append("QUANTITE_RESTANTE", quantite)
            form.append("ID_TAILLE", selectedSize?.id)
            form.append("ID_COULEUR", selectedColor?.ID_COULEUR)

            if (autreSize) {
                form.append("TAILLE", data.newSize)
            }
            else if (selectedSize?.id != selectedSize?.id) {
                form.append("ID_TAILLE_NEW", selectedSize?.id)
            }

            if (autreColor) {
                form.append("COULEUR", data.newColor)
            }
            else if (selectedColor?.ID_COULEUR != ColorSelect.ID_COULEUR) {
                form.append("ID_COULEUR_NEW", ColorSelect.ID_COULEUR)
            }
            const updateDescription = await fetchApi(`/products/updateApprovisionner/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}`, {
                method: "PUT",
                body: form
            })

            // setApprovisionnerUpdate(updateDescription.result.QUANTITE_RESTANTE ? updateDescription.result.QUANTITE_RESTANTE : updateDescription.result.quantite)
            // setSelectedSize(updateDescription.result)
            // setSelectedColor(updateDescription.result)
            setSIZESUPDATE(updateDescription.size_update)
            SetColors(updateDescription.color_update)
            approvisionneModaliseRef.current.close()
        } catch (error) {
            console.log(error)
        } finally {
            // setLoading(false)
        }
    }
    const deleteProduct = async () => {
        setLoading(true)
        try {
            Alert.alert("Supprimer un article", "Voulez-vous vraiment enlever cet article ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Oui", onPress: async () => {
                        const serviceUpdat = await fetchApi(`/partenaire/produit/delete/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}/${product.partenaire.ID_PARTENAIRE_SERVICE}`, {
                            method: "DELETE",
                        })
                        setServiceUpdate(serviceUpdat.result)
            console.log(serviceUpdat.result)
            console.log(serviceUpdate)
                    }
                }
            ])
            
            

            //navigation.navigate("EcommerceHomeScreen", { partenaire: serviceUpdat.result[0]})
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const deleteSize = async (size) => {
        console.log(product.stock.ID_PRODUIT_STOCK)
        setLoading(true)
        try {
            Alert.alert("Enlever la taille", "Voulez-vous vraiment enlever cette taille ?",
                [
                    {
                        text: "Annuler",
                        style: "cancel"
                    },
                    {
                        text: "Oui", onPress: async () => {
                            await fetchApi(`/products/tailles/${size.id}/${product.stock.ID_PRODUIT_STOCK}`, {
                                method: "DELETE",
                            })
                        }
                    }
                ])
        }
        // setServiceUpdate(serviceUpdat.result)
        // console.log(serviceUpdat.result)
        // console.log(serviceUpdate)

        //navigation.navigate("EcommerceHomeScreen", { partenaire: serviceUpdat.result[0]})
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const UpdatePrice = async () => {
        try {
            const form = new FormData()
            form.append("PRIX", data.price)
            const updateDescription = await fetchApi(`/products/updatePrice/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}`, {
                method: "PUT",
                body: form
            })
            setPrixUpdate(updateDescription.result.PRIX)
            PricemodaliseRef.current.close()
        } catch (error) {
            console.log(error)
        } finally {
            // setLoading(false)
        }
    }
    return (
        <>
            {loading && <Loading />}
            <View style={{ backgroundColor: '#F1F1F1', marginTop: 0, flex: 1 }}>
                {/* {showImageModal && <ImagesGallery images={IMAGES.filter(image => image)} showImageModal={showImageModal} setShowImageModal={setShowImageModal} />} */}
                <View style={styles.cardHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                            <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                        </TouchableOpacity>
                        {/* <EcommerceBadge /> */}
                    </View>
                </View>
                <ProductImages images={IMAGES} product={product} />
                {/* <TouchableOpacity onPress={() => onSelectPhoto()} style={styles.uploadImages}>
                    <Feather name="image" size={24} color={COLORS.ecommercePrimaryColor} />
                </TouchableOpacity> */}
                <View style={{
                    backgroundColor: "white", flex: 1, borderTopLeftRadius: 60, elevation: 10, padding: 10,
                    borderTopRightRadius: 60,
                }}>
                    <View style={styles.productNames}>
                        <TouchableOpacity onPress={onPressProduct}>
                            <Text style={styles.productName}>
                                {productUpdate ? productUpdate : product.produit.NOM}</Text>
                            <EvilIcons style={{ opacity: 0.5, marginLeft: "56%", marginTop: "-10%" }} name="pencil" size={22} color="black" />
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity onPress={onPressPrice}>
                                <Text style={styles.productPrice}>BIF {prixUpdate ? prixUpdate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                                    <EvilIcons style={{ opacity: 0.5, marginLeft: "-20%", marginTop: "3%" }} name="pencil" size={22} color="black" />
                                </Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row" }}>
                                <AntDesign name="star" size={15} color="#EFC519" />
                                <AntDesign name="star" size={15} color="#EFC519" />
                                <AntDesign name="star" size={15} color="#EFC519" />
                                <AntDesign name="star" size={15} color="#EFC519" />
                                <AntDesign name="staro" size={15} color="#EFC519" />
                            </View>
                        </View>
                    </View>
                    <ScrollView>
                        {SIZES.length != 0 &&
                            <>
                                <View style={styles.moreDetails}>
                                    <Text style={styles.subTitle}>Taille</Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        <View style={[styles.sizes]}>
                                            {
                                                SIZES.length== 0  &&
                                                 <TouchableOpacity style={[styles.size, ]}>
                                                 <Text style={[styles.sizeText]}>+</Text>
                                             </TouchableOpacity>}
                                               { SIZESUPDATE.length != 0 ?
                                                    SIZESUPDATE?.map((size, index) =>
                                                        <TouchableOpacity style={[styles.size, index == 0 && { marginLeft: 0 }, size.id == selectedSize?.id && { backgroundColor: COLORS.ecommerceOrange }]} key={index} onPress={() => {
                                                            setSelectedSize(size)
                                                            // setSizeSelect(size)
                                                            setSelectedColor(null)
                                                            // onChangeText(0)
                                                            onSizePress(size)
                                                        }
                                                        }>
                                                            <Text style={[styles.sizeText, size.id == selectedSize?.id && { color: '#FFF' }]}>{size.name}</Text>
                                                        </TouchableOpacity>)
                                                    : SIZES?.map((size, index) =>
                                                        <TouchableOpacity style={[styles.size, index == 0 && { marginLeft: 0 }, size.id == selectedSize?.id && { backgroundColor: COLORS.ecommerceOrange }]} key={index}
                                                            onPress={() => {
                                                                setSelectedSize(size)
                                                                // setSizeSelect(size)
                                                                setSelectedColor(null)
                                                                // onChangeText(0)
                                                                onSizePress(size)
                                                            }
                                                            }
                                                            onLongPress={() => deleteSize(size)}>
                                                            <Text style={[styles.sizeText, size.id == selectedSize?.id && { color: '#FFF' }]}>{size.name}</Text>
                                                        </TouchableOpacity>)}
                                        </View>
                                    </ScrollView>
                                </View>
                                {selectedSize && <View style={styles.moreDetails}>
                                    <Text style={styles.subTitle}>couleur</Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        <View style={[styles.sizes]}>
                                            {colorsUpdate.length != 0 ?
                                                colorsUpdate.map((color, index) =>
                                                    <TouchableOpacity style={[styles.color, index == 0 && { marginLeft: 0 }, color.ID_COULEUR == selectedColor?.ID_COULEUR && { backgroundColor: COLORS.ecommerceOrange }]} key={index} onPress={() => {
                                                        setSelectedColor(color)
                                                        setQuantite(color.QUANTITE_RESTANTE)
                                                    }
                                                    }>
                                                        <Text style={[styles.colorText, color.ID_COULEUR == selectedColor?.ID_COULEUR && { color: '#FFF' }]}>{color.COULEUR}</Text>
                                                    </TouchableOpacity>)
                                                :
                                                colors.map((color, index) =>
                                                    <TouchableOpacity style={[styles.color, index == 0 && { marginLeft: 0 }, color.ID_COULEUR == selectedColor?.ID_COULEUR && { backgroundColor: COLORS.ecommerceOrange }]} key={index}
                                                        onLongPress={() => deleteSize(color)}
                                                        onPress={() => {
                                                            setSelectedColor(color)
                                                            setQuantite(color.QUANTITE_RESTANTE)
                                                        }
                                                        }>
                                                        <Text style={[styles.colorText, color.ID_COULEUR == selectedColor?.ID_COULEUR && { color: '#FFF' }]}>{color.COULEUR}</Text>
                                                    </TouchableOpacity>)}
                                        </View>
                                    </ScrollView>
                                </View>}
                            </>
                        }
                        <View style={{ marginLeft: "70%" }}>
                            <Text style={[styles.subTitle,]}></Text>
                            {
                                selectedColor ? <Text style={{ fontSize: 12, color: '#777', marginBottom: 5 }}>
                                    Quantité: {selectedColor.QUANTITE_RESTANTE}
                                </Text> : <Text style={{ fontSize: 12, color: '#777', marginBottom: 5 }}>
                                    Quantité: {selectedSize ? selectedSize.quantite : 0}
                                </Text>}
                        </View>
                        <View style={{ backgroundColor: "white" }}>
                            {descriptionUpdate || product.produit.DESCRIPTION ? <TouchableOpacity onPress={onPressDescription}>
                                <Text style={{ marginHorizontal: "3%", marginBottom: "30%", marginTop: "-1%", color: "#797E9A" }}>
                                    {descriptionUpdate ? descriptionUpdate : product.produit.DESCRIPTION}

                                    {product.produit.DESCRIPTION && <EvilIcons style={{ opacity: 0.5, marginLeft: "-10%", marginTop: "3%" }} name="pencil" size={22} color="#797E9A" />}
                                </Text>
                            </TouchableOpacity> :
                                <View style={{ marginTop: "15%" }}>
                                    <TouchableOpacity onPress={onPressDescription}>
                                        <Text style={{ marginHorizontal: "3%", marginBottom: "30%", marginTop: "-1%", color: "#797E9A" }}><Ionicons name="add-sharp" size={20} color="#797E9A" />Clique pour ajouter une description</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "-40%" }}>
                        <TouchableOpacity onPress={onPressAprovisionner} >
                            <View style={{ backgroundColor: COLORS.ecommerceOrange, borderRadius: 50, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
                                <Ionicons name="add" size={30} color="white" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteProduct} >
                            <View style={{ backgroundColor: COLORS.ecommerceOrange, borderRadius: 50, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
                                <MaterialIcons name="delete" size={24} color="white" />

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
            <Modalize ref={variantmodaliseRef} adjustToContentHeight
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
                    <OutlinedTextField
                        style={styles.input}
                        label={"Modifier le heure d travail"}
                        lineWidth={0.5}
                        activeLineWidth={0.5}
                        baseColor={COLORS.smallBrown}
                        tintColor={COLORS.primary}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} >
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>

            <Modalize ref={approvisionneModaliseRef}
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
                <Text style={{ marginBottom: "1%", marginBottom: "1%", fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Approvisionner</Text>

                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: "5%", marginBottom: "1%", marginTop: "1%" }}
                    onPress={() => allSizesModalizeRef.current.open()}
                // disabled={service.id_service == 2}
                >
                    <View >
                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                            Tailles
                        </Text>
                        {SizeSelect ? <Text style={[styles.inputText, { color: '#000' }]}>
                            {SizeSelect.name}
                        </Text> :
                            <Text style={[styles.inputText, { color: '#000' }]}>{selectedSize?.name}</Text>
                        }

                        {autreSize && <Text>{data.newSize}</Text>
                        }
                    </View>
                    <AntDesign name="caretdown" size={20} color="#777" />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: "5%", marginBottom: "1%", marginTop: "1%" }}
                    onPress={() => allColorsModalizeRef.current.open()}
                >
                    <View >
                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                            Couleurs
                        </Text>
                        {ColorSelect ? <Text style={[styles.inputText, { color: '#000' }]}>
                            {ColorSelect.COULEUR}
                        </Text> :
                            <Text style={[styles.inputText, { color: '#000' }]}>{selectedColor?.COULEUR}</Text>
                        }
                        {autreColor && <Text>{data.newColor} </Text>
                        }
                    </View>
                    <AntDesign name="caretdown" size={20} color="#777" />
                </TouchableOpacity>
                <View style={styles.inputCard}>
                    <View style={styles.quantiteContainer}>
                        <TouchableOpacity style={[styles.quantiteChanger, (quantite <= 1 || !/^\d+$/.test(quantite)) && { opacity: 0.5 }]} onPress={onDecrement} disabled={quantite <= 1 || !/^\d+$/.test(quantite)}>
                            <Text style={styles.quantiteChangerText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={[styles.inputApp, isFocused && { borderColor: COLORS.primary }]}
                            value={quantite?.toString()}
                            onChangeText={onChangeText}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                setIsFocused(false)
                                checkAmount()
                            }}
                            keyboardType="decimal-pad"
                        />
                        <TouchableOpacity style={[styles.quantiteChanger]} onPress={onIncrement} >
                            <Text style={styles.quantiteChangerText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => aprovisionner()} style={styles.addBtn} >
                    <Text style={styles.addBtnText}>Approvisionner</Text>
                </TouchableOpacity>
            </Modalize>

            <Modalize ref={PricemodaliseRef} adjustToContentHeight
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
                    <OutlinedTextField
                        style={styles.input}
                        label={"Modifier le prix"}
                        // adresse:partenaire.produit.ADDRESSE,
                        value={data.price}
                        onChangeText={(newValue) => handleChange('price', newValue)}
                    />
                </View>
                <TouchableOpacity onPress={() => UpdatePrice()} style={styles.addBtn} >
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={ProductmodaliseRef} adjustToContentHeight
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
                <Text style={{ marginBottom: 10, marginBottom: 10, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <View style={styles.inputCard}>
                    <OutlinedTextField
                        style={styles.input}
                        label={"Modifier  nom  du produit"}
                        // adresse:partenaire.produit.ADDRESSE,
                        value={data.product}
                        onChangeText={(newValue) => handleChange('product', newValue)}
                    />
                </View>


                <TouchableOpacity onPress={() => UpdateNom()} style={styles.addBtn} >
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
                <TouchableOpacity onPress={() => UpdateDescription()} style={styles.addBtn} >
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={allSizesModalizeRef} adjustToContentHeight handlePosition='inside'>
                <>
                    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Tailles</Text>
                    </View>
                    <View style={styles.searchSection1}>
                        <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                        <TextInput
                            style={styles.inputRearch}
                            // value={data.menu}
                            // onChangeText={(newValue) => handleChange('menu', newValue)}
                            placeholder="Rechercher "
                        />
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={() => onAutreSizeSelect(true)}>

                            <View style={styles.modalItemModel2} >
                                {autreSize ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                    <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                <Text>Autre tailles</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {autreSize ?
                            <>
                                <View style={styles.inputCard}>
                                    <OutlinedTextField
                                        label={"Nouvelle taille"}
                                        fontSize={14}
                                        value={data.newSize}
                                        onChangeText={(newValue) => handleChange('newSize', newValue)}
                                        lineWidth={0.5}
                                        multiline={true}
                                        activeLineWidth={0.5}
                                        baseColor={COLORS.smallBrown}
                                        tintColor={COLORS.primary}
                                    />
                                </View>
                                <TouchableOpacity onPress={TerminerSize}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText} >Ajouter</Text>
                                    </View>
                                </TouchableOpacity>
                            </> :

                            ALLSIZES.map((size, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => onSizeSelect(size)}>
                                        <View style={styles.modalItemModel2} >
                                            {SizeSelect?.id == size.id ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                            <Text>{size.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                    </View>
                </>
            </Modalize>
            <Modalize ref={allColorsModalizeRef} adjustToContentHeight handlePosition='inside'>
                <>
                    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Couleur</Text>
                    </View>
                    <View style={styles.searchSection1}>
                        <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                        <TextInput
                            style={styles.inputRearch}
                            // value={data.menu}
                            // onChangeText={(newValue) => handleChange('menu', newValue)}
                            placeholder="Rechercher "
                        />
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={() => onAutreColorSelect(true)}>

                            <View style={styles.modalItemModel2} >
                                {autreColor ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                    <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                <Text>Autre couleur</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {autreColor ?
                            <>
                                <View style={styles.inputCard}>
                                    <OutlinedTextField
                                        label={"Nouvelle couleur"}
                                        fontSize={14}
                                        value={data.newColor}
                                        onChangeText={(newValue) => handleChange('newColor', newValue)}
                                        lineWidth={0.5}
                                        multiline={true}
                                        activeLineWidth={0.5}
                                        baseColor={COLORS.smallBrown}
                                        tintColor={COLORS.primary}
                                    />
                                </View>
                                <TouchableOpacity onPress={TerminerColor}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText} >Ajouter</Text>
                                    </View>
                                </TouchableOpacity>
                            </> :
                            ALLCOLORS.map((color, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => onColorSelect(color)}>
                                        <View style={styles.modalItemModel2} >
                                            {ColorSelect?.ID_COULEUR == color.ID_COULEUR ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                            <Text>{color.COULEUR}</Text>
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60,
        backgroundColor: '#F1F1F1',
    },
    quantiteContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        // marginHorizontal: 10,
        flexDirection: 'row',
        marginTop: "2%",
        marginBottom: "2%"
    },
    modalItemModel2: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    inputApp: {
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 10,
        borderColor: '#fff',
        flex: 1,
        height: "100%",
        // marginHorizontal: 15,
        textAlign: 'center',
        color: COLORS.ecommercePrimaryColor,
        fontWeight: 'bold'
    },
    inputText: {
        color: '#777'
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
    quantiteChanger: {
        width: 20,
        // height: "100%",
        // backgroundColor: COLORS.ecommercePrimaryColor,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantiteChangerText: {
        color: COLORS.ecommerceRed,
        fontWeight: 'bold',
        fontSize: 20
    },
    addBtnText: {
        color: '#fff',
        fontWeight: "bold",
        textAlign: "center",
        left: "220%"
    },
    addBtn: {
        flexDirection: "row",
        marginTop: "0%",
        marginBottom: "2%",
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.ecommerceOrange,
        height: 50,
        marginHorizontal: "5%",
    },
    category: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    points: {
        marginTop: 25,
        marginLeft: 10
    },
    userImage: {
        width: "120%",
        height: "120%",
        borderRadius: 50,
        // alignItems:"center",
        // justifyContent:"center"
    },
    Cardnote: {
        padding: 15,
        height: 20,
        width: 20,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 50,

    },
    etoiles: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 60,
        paddingHorizontal: 10

    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 10,
        multiline: true


    },
    categoryName: {
        fontWeight: "bold",
        fontSize: 13,
        color: COLORS.primary,
        marginLeft: 5
    },
    productNames: {
        marginTop: "5%",
        flexDirection: "row",
        marginHorizontal: "3%",
        justifyContent: "space-between",

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

    productName: {
        fontWeight: "bold",
        fontSize: 18,
        opacity: 0.7,
        color: COLORS.ecommercePrimaryColor
    },
    shop: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: "-1%"
    },
    shopLeft: {
        flexDirection: "row",
        alignItems: 'center'
    },
    shopIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#F1F1F1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: -40

    },
    shopOwner: {
        marginLeft: 10,
        marginTop: "-6%",
    },
    productSeller: {
        fontWeight: "bold",
        marginTop: "-30%",
    },
    shopAdress: {
        color: '#777',
        fontSize: 13
    },
    text: {
        color: '#646B95',
        fontSize: 20
    },
    carre1: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#242F68',
        borderRadius: 10,
        // marginTop: 1,
    },
    carre2: {
        padding: 15,
        height: 50,
        width: 200,
        borderWidth: 2,
        borderColor: '#D8D8D8',
        borderRadius: 10,
        // marginTop: 1,
    },
    carre3: {
        padding: 10,
        height: 50,
        width: 200,
        backgroundColor: '#EE7526',
        borderWidth: 2,
        borderColor: '#D8D8D8',
        borderRadius: 10,
        // marginTop: 1,
    },
    shareBtn: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 100
    },
    productDescription: {
        color: '#777',
        fontSize: 15,
        lineHeight: 22
    },
    txtDispla: {
        color: '#646B94',
        fontSize: 15,
        fontWeight: 'bold',
    },
    inputRearch: {
        flex: 1,
        marginLeft: 10
    },
    image: {
        height: "30%",
        width: "30%",
        borderRadius: 8,
        resizeMode: 'contain'
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
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 10
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    productFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    productPrice: {
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: "1%",
        color: COLORS.ecommercePrimaryColor,
        opacity: 0.7
    },
    addCartBtn: {
        borderRadius: 30,
        backgroundColor: COLORS.ecommerceOrange,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        // textTransform:"uppercase",
        fontSize: 16,
        textAlign: "center"
    },
    button: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLORS.ecommerceOrange,
        marginHorizontal: 20
    },
    addCartBtnTitle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    Cardnote: {
        padding: 15,
        height: 40,
        width: 40,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 100
    },
    rateHeader: {
        marginLeft: 10,
        flex: 1
    },
    rateTitles: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    notecard: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    notecards: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 40,
        marginTop: 7


    },
    badge: {
        minWidth: 25,
        minHeight: 20,
        borderRadius: 20,
        paddingHorizontal: 3,
        backgroundColor: COLORS.ecommerceRed,
        position: 'absolute',
        top: -10,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FFF',
        fontWeight: "bold"
    },
    moreDetails: {
        marginTop: "1%",
        marginHorizontal: "3%",

    },
    subTitle: {
        color: COLORS.ecommercePrimaryColor,
        fontWeight: 'bold'
    },
    sizes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
    },
    color: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    searchSection1: {
        flexDirection: "row",
        marginTop: "5%",
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
    sizeText: {
        color: COLORS.ecommercePrimaryColor,
        fontWeight: 'bold',
        fontSize: 16
    },
    size: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
})
