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
    const  partenaire=route.params
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
    const [categories, setCategories] = useState([])
    const [repass, setRepass] = useState([])

    const [souscategories, setSouscategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([])


    const [data, handleChange, setValue] = useForm({
        CategorieSelect: null,
        selectedSousCategorie: null,
        nom:"",
        repas:"",
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
                const repas = await fetchApi("/resto/repas/")
                setRepass(repas.result)
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
        repasModalizeRef.current.close()
        // setshowMapis(false)
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
            form.append("ID_SOUS_CATEGORIE_MENU",selectedSousCategorie.ID_SOUS_CATEGORIE_MENU )                 
           if(RepasSelect.ID_REPAS)
           {
            form.append('ID_REPAS', RepasSelect.ID_REPAS)
           }
            form.append('ID_PARTENAIRE_SERVICE',partenaire.partenaire.produit.ID_PARTENAIRE_SERVICE)
            form.append("NOM_REPAS", data.repas)

            form.append("PRIX", data.prix)
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
              console.log("newMenu")
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
                                        {autre && <Text>Autre repas</Text>
                                        }
                                    </View>
                                    <AntDesign name="caretdown" size={20} color="#777" />
                                </TouchableOpacity>
                            </View>
                        
                            {autre &&
                            <>
                            <View style={styles.inputCard}>
                                <OutlinedTextField
                                    label={"Nom du repas"}
                                    fontSize={14}
                                    value={data.repas}
                                    onChangeText={(newValue) => handleChange('repas', newValue)}
                                    onBlur={() => checkFieldData('nom')}
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
                            </>}
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
                            
                            <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Images du menu</Text>
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
                        <TouchableOpacity onPress={SendData}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText} >Enregistrer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Modalize ref={repasModalizeRef} adjustToContentHeight handlePosition='inside'>
                <>
                    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Repas</Text>
                    </View>
                    <View>
                    <TouchableWithoutFeedback onPress={() => onAutreSelect(true)}>
                   
                                        <View style={styles.modalItemModel2} >
                                        {autre ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                            <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                        <Text>Autre repas</Text>
                                    </View>
                                    </TouchableWithoutFeedback>
                        {repass.map((rep, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => onRepasSelect(rep)}>
                                    <View style={styles.modalItemModel2} >
                                        {RepasSelect?.ID_REPAS == rep.ID_REPAS ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                            <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                        <Text>{rep.NOM}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

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