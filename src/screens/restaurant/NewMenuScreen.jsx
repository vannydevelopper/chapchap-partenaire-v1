import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import useFetch from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { COLORS } from "../../styles/COLORS";
import { SimpleLineIcons, AntDesign, Ionicons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import Loading from "../../components/app/Loading"
export default function NewMenuScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    // const { product, partenaire } = route.params
    // console.log(partenaire)
    const couleurModalizeRef = useRef(null)
    const tailleModalizeRef = useRef(null)
    const ajoutDetailsModalizeRef = useRef(null)
    const categoriesModalizeRef = useRef(null)
    const SousCategoriesModalizeRef = useRef(null)

    const [logoImage, setLogoImage] = useState(null)
    const [logoImage1, setLogoImage1] = useState(null)
    const [logoImage2, setLogoImage2] = useState(null)

    const [TailleSelect, setTailleSelect] = useState(null)
    const [selectedCouleur, setselectedCouleur] = useState(null)
    const [CategorieSelect, setCategorieSelect] = useState(null)
    const [selectedSousCategorie, setselectedSousCategorie] = useState(null)

    const [showAUtresTaille, setShowAUtresTaille] = useState(false)
    const [showAUtresCouleur, setShowAUtresCouleur] = useState(false)

    const [categories, setCategories] = useState([])
    const [souscategories, setSouscategories] = useState([])
    const [loading, setLoading] = useState(false);

    const [data, handleChange, setValue] = useForm({
        CategorieSelect: null,
        selectedSousCategorie: null,
        nom:"",
        prix: "",
        description:"",
        logoImage: "",
        logoImage1: "",
        logoImage2: "",
    })

    // console.log(detailData)

    const { checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
        quantite: {
            required: true,

        },
    }, {
        quantite: {
            required: "Quantite est obligatoire"
        },
    })

    useEffect(() => {
        (async () => {
            try {
                const catego = await fetchApi("/resto/menu/categories")
                setCategories(catego.result)
                // console.log(catego.result)
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
                // console.log(sousCatego.result)

            }
            catch (error) {
                console.log(error)
            } finally {

            }
        })()
    }, [CategorieSelect])
    const onCategorieSelect = (categorie) => {
        console.log(CategorieSelect)
        setCategorieSelect(categorie)
        categoriesModalizeRef.current.close()
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

    const SendData = async () => {
        try {
            setLoading(true)
            const form = new FormData()
            form.append("ID_CATEGORIE_MENU", CategorieSelect.ID_CATEGORIE_MENU)
            form.append("ID_SOUS_CATEGORIE_MENU",selectedSousCategorie.ID_SOUS_CATEGORIE_MENU )                 

            form.append('ID_PARTENAIRE_SERVICE', 1)
            form.append("NOM_MENU", data.nom)
            form.append("PRIX", data.prix)
            if (logoImage) {
                const manipResult = await manipulateAsync(
                        logoImage.uri,
                        [
                                { resize: { width: 500 } }
                        ],
                        { compress: 0.8, format: SaveFormat.JPEG }
                );
                let localUri = manipResult.uri;
                let filename = localUri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                form.append('IMAGE_1', {
                        uri: localUri, name: filename, type
                })
                if (logoImage1) {
                    const manipResult = await manipulateAsync(
                            logoImage1.uri,
                            [
                                    { resize: { width: 500 } }
                            ],
                            { compress: 0.8, format: SaveFormat.JPEG }
                    );
                    let localUri = manipResult.uri;
                    let filename = localUri.split('/').pop();
                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;
                    form.append('IMAGE_2', {
                            uri: localUri, name: filename, type
                    })

            }
            if (logoImage2) {
                    const manipResult = await manipulateAsync(
                            logoImage2.uri,
                            [
                                    { resize: { width: 500 } }
                            ],
                            { compress: 0.8, format: SaveFormat.JPEG }
                    );
                    let localUri = manipResult.uri;
                    let filename = localUri.split('/').pop();
                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;
                    form.append('IMAGE_3', {
                            uri: localUri, name: filename, type
                    })

            }

        }
            form.append("DESCRIPTION", data.description)

            console.log(form)
              const newMenu = await fetchApi('/resto/menu/create', {
                        method: "POST",
                        body: form
              })
              navigation.navigate("NewMenuDetailScreen", { menus: newMenu })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {loading && <Loading />}
            <View style={styles.container}>
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
                        <Octicons name="bell" size={24} color={COLORS.primary} />
                    </View>
                </View>
                <Text style={styles.title}>Nouveau Menu</Text>
                <ScrollView keyboardShouldPersistTaps="handled" style={{ marginBottom: 20 }}>
                    <View>
                        <View>
                            <View style={styles.inputCard}>
                                <OutlinedTextField
                                    label={"Nom du menu"}
                                    fontSize={14}
                                    value={data.nom}
                                    onChangeText={(newValue) => handleChange('nom', newValue)}
                                    onBlur={() => checkFieldData('nom')}
                                    error={hasError('nom') ? getError('nom') : ''}
                                    lineWidth={0.5}
                                    activeLineWidth={0.5}
                                    baseColor={COLORS.smallBrown}
                                    tintColor={COLORS.primary}
                                />
                            </View>
                            <View style={styles.inputCard}>
                                <OutlinedTextField
                                    label={"Description"}
                                    fontSize={14}
                                    value={data.description}
                                    onChangeText={(newValue) => handleChange('description', newValue)}
                                    onBlur={() => checkFieldData('nom')}
                                    error={hasError('description') ? getError('description') : ''}
                                    lineWidth={0.5}
                                    multiline={true}
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
                                            {CategorieSelect.NOM}
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
                            <View style={[styles.addImageContainer, { marginVertical: 30 }]}>
                                <TouchableWithoutFeedback onPress={onImagesSelect}>
                                    <View style={styles.addImageItem}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Feather name="image" size={24} color="#777" />
                                            <Text style={styles.addImageLabel}>
                                                Images
                                            </Text>
                                        </View>
                                        {logoImage && <Image source={{ uri: logoImage.uri }} style={{ width: "100%", height: 200, marginTop: 10, borderRadius: 5 }} />}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.addImageContainer, { marginVertical: 30 }]}>
                                <TouchableWithoutFeedback onPress={onImagesSelect1}>
                                    <View style={styles.addImageItem}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Feather name="image" size={24} color="#777" />
                                            <Text style={styles.addImageLabel}>
                                                Images_1
                                            </Text>
                                        </View>
                                        {logoImage1 && <Image source={{ uri: logoImage1.uri }} style={{ width: "100%", height: 200, marginTop: 10, borderRadius: 5 }} />}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.addImageContainer, { marginVertical: 30 }]}>
                                <TouchableWithoutFeedback onPress={onImagesSelect2}>
                                    <View style={styles.addImageItem}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Feather name="image" size={24} color="#777" />
                                            <Text style={styles.addImageLabel}>
                                                Images_2
                                            </Text>
                                        </View>
                                        {logoImage2 && <Image source={{ uri: logoImage2.uri }} style={{ width: "100%", height: 200, marginTop: 10, borderRadius: 5 }} />}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <TouchableOpacity onPress={SendData}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText} >Enregistrer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
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
                        {souscategories.map((souscategorie, index) => {
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
        flex: 1,
    },
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