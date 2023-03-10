import React, { useRef, useState } from "react"
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, TouchableNativeFeedback, ScrollView, Alert } from "react-native"
import { Ionicons, AntDesign, Entypo, Foundation, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import ProductImages from "../../components/restaurant/details/ProductImages"
import { Modalize } from "react-native-modalize";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import fetchApi from "../../helpers/fetchApi";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield';
import { COLORS } from "../../styles/COLORS"
import { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "../../hooks/useForm";
import Loading from "../../components/app/Loading";
import { set } from "react-native-reanimated";


export default function MenuDetailScreen() {
    const route = useRoute()
    const { detail, partenaire } = route.params
    const navigation = useNavigation()
    const uploadModaliseRef = useRef()
    const RepasmodaliseRef = useRef()
    const CategoriemodaliseRef = useRef()
    const PrixmodaliseRef = useRef()
    const TempsmodaliseRef = useRef()
    const DescriptionmodaliseRef = useRef()
    const categoriesModalizeRef = useRef()
    const repasModalizeRef = useRef()
    var IMAGES = [
        detail.IMAGE ? detail.IMAGE : undefined,
        detail.IMAGE2 ? detail.IMAGE2 : undefined,
        detail.IMAGE3 ? detail.IMAGE3 : undefined,
    ]
    const [nombre, setNombre] = useState(0);
    const [menuImage, setMenuImage] = useState(null)
    const [detailImage, setDetailImage] = useState([])
    const [categories, setCategories] = useState([])
    const [repass, setRepass] = useState([])
    const [CategorieSelect, setCategorieSelect] = useState(null)
    const [RepasSelect, setRepasSelect] = useState("")
    const [selectedSousCategorie, setselectedSousCategorie] = useState(null)
    const [autre, setAutre] = useState(false)
    const [menuUpdate, setMenuUpdate] = useState(null)
    const [loading, setLoading] = useState(null)
    const [deletemenu, setDeletemenu] = useState(null)



    const [data, handleChange, setValue] = useForm({
        description: detail.DESCRIPTION,
        price: detail.PRIX,
        temps: detail.TEMPS_PREPARATION,
    })
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
    const onPressPrice = () => {
        PrixmodaliseRef.current.open()
    }
    const onPressTemps = () => {
        TempsmodaliseRef.current.open()
    }
    const onPressRepas = () => {
        RepasmodaliseRef.current.open()
    }
    const onPressCategory = () => {
        CategoriemodaliseRef.current.open()
    }
    const onPressDescription = () => {
        DescriptionmodaliseRef.current.open()
    }
    const onSelectPhoto = () => {
        uploadModaliseRef.current.open()
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
        setMenuImage(photo)
        try {
            setLoading(true)

            const form = new FormData()
            if (menuImage) {
                const manipResult = await manipulateAsync(
                    menuImage.uri,
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
            const menuUpdate = await fetchApi(`/resto/menu/${detail.ID_RESTAURANT_MENU}`, {
                method: "PUT",
                body: form
            })

            setDetailImage(menuUpdate.result)

        }
        catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    const fecthRepas = async () => {
        try {
            var url = "/resto/repas/"
            const repas = await fetchApi(url)
            setRepass(repas.result)
        }
        catch (error) {
            console.log(error)
        }

        finally {
            // setLoadingCatagories(false)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthRepas()
    }, []))


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

    const addNumber = async () => {

        if (nombre != '') {
            setNombre(nbr => parseInt(nbr) + 1)

        }
        else {
            setNombre(1)
        }
    }
    const mouveNumber = async () => {
        if (nombre != '') {
            setNombre(nbr => parseInt(nbr) - 1)
        }
        else {
            setNombre(0)
        }
    }
    const UpdateData = async () => {

        try {
            setLoading(true)
            const form = new FormData()
            form.append("REPAS", RepasSelect ? RepasSelect.ID_REPAS : detail.ID_REPAS)
            form.append("CATEGORIE", CategorieSelect ? CategorieSelect?.ID_CATEGORIE_MENU : detail.ID_CATEGORIE_MENU)
            form.append("SOUSCATEGORIE", data.description)
            form.append("TEMPS", data.temps)
            form.append("PRIX", data.price)
            form.append("DESCRIPTION", data.description)
            const updateProduct = await fetchApi(`/resto/menu/update/${detail.ID_RESTAURANT_MENU}`, {
                method: "PUT",
                body: form
            })
            setMenuUpdate(updateProduct.result)
            uploadModaliseRef.current.close()
            RepasmodaliseRef.current.close()
            CategoriemodaliseRef.current.close()
            PrixmodaliseRef.current.close()
            TempsmodaliseRef.current.close()
            DescriptionmodaliseRef.current.close()
            categoriesModalizeRef.current.close()
            repasModalizeRef.current.close()
            DescriptionmodaliseRef.current.close()

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteMenu = async () => {
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
                            const serviceUpdat = await fetchApi(`/resto/menu/delete/${detail.ID_RESTAURANT_MENU}`, {
                                method: "DELETE",
                            })
                            setDeletemenu(true)
                            navigation.goBack()
                        }
                    }
                ])
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {loading && <Loading />}
            <ScrollView>
                <View style={{ marginLeft: 30, marginTop: 50, marginHorizontal: 20 }}>
                    {detailImage.length>0 ? 
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <  Image source={{ uri: detailImage[0].IMAGE }} style={{ ...styles.imagePrincipal }} />
                    </View> 
                    :
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <  Image source={{ uri: detail.IMAGE }} style={{ ...styles.imagePrincipal }} />
                        </View>}

                    {/* <ProductImages images={IMAGES} /> */}
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} >
                        <Ionicons name="ios-arrow-back-outline" size={24} color="white" style={{ ...styles.icon, marginTop: 0 }} />
                    </TouchableOpacity>
                    <Entypo name="shopping-cart" size={24} color="white" style={{ ...styles.icon1, marginTop: 0 }} />
                    <View style={styles.cardOK}>
                        <Text style={{ color: "white", fontSize: 5 }}>5</Text>
                    </View>
                    <TouchableOpacity style={styles.uploadImages} onPress={() => onSelectPhoto()}>
                        <Feather name="image" size={24} color="black" />
                    </TouchableOpacity>

                    {menuUpdate != null ?
                        <>
                            <TouchableOpacity onPress={onPressRepas}>
                                <View style={{ marginTop: "2%" }} >
                                    <Text style={styles.text} numberOfLines={2}>{menuUpdate?.repas}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "2%" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <AntDesign name="star" size={15} color="#EFC519" />
                                    <AntDesign name="star" size={15} color="#EFC519" />
                                    <AntDesign name="star" size={15} color="#EFC519" />
                                    <AntDesign name="staro" size={15} color="#EFC519" />
                                </View>
                                <TouchableOpacity onPress={onPressTemps} style={{ flexDirection: "row" }}>
                                    <AntDesign name="clockcircleo" size={15} color="#797E9A" />
                                    <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A" }}>{menuUpdate.TEMPS_PREPARATION} Min</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onPressPrice}>
                                    <View style={{ marginTop: -5 }}>
                                        <Text style={styles.textFbu}>{menuUpdate.PRIX} Fbu</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity onPress={onPressCategory}>
                                <View style={{ marginTop: "2%" }} >
                                    <Text style={styles.text1} numberOfLines={2}>{menuUpdate.categorie}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressDescription}>
                                {menuUpdate.DESCRIPTION ? <View style={{ marginTop: 15 }} >
                                    <Text style={styles.txtDisplay}>
                                        {menuUpdate.DESCRIPTION}
                                    </Text>
                                </View> :
                                    <View style={{ marginTop: "15%" }}>
                                        <TouchableOpacity onPress={onPressDescription}>
                                            <Text style={{ marginHorizontal: "3%", marginBottom: "30%", marginTop: "-1%", color: "#797E9A" }}><Ionicons name="add-sharp" size={20} color="#797E9A" />Clique pour ajouter une description</Text>
                                        </TouchableOpacity>
                                    </View>}
                            </TouchableOpacity>
                        </>
                        : <>
                            <TouchableOpacity onPress={onPressRepas}>
                                <View style={{ marginTop: "2%" }} >
                                    <Text style={styles.text} numberOfLines={2}>{detail.repas}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "2%" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <AntDesign name="star" size={15} color="#EFC519" />
                                    <AntDesign name="star" size={15} color="#EFC519" />
                                    <AntDesign name="star" size={15} color="#EFC519" />
                                    <AntDesign name="staro" size={15} color="#EFC519" />
                                </View>
                                <TouchableOpacity onPress={onPressTemps} style={{ flexDirection: "row" }}>
                                    <AntDesign name="clockcircleo" size={15} color="#797E9A" />
                                    <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A" }}>{detail.TEMPS_PREPARATION} Min</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onPressPrice}>
                                    <View style={{ marginTop: -5 }}>
                                        <Text style={styles.textFbu}>{detail.PRIX} Fbu</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity onPress={onPressCategory}>
                                <View style={{ marginTop: "2%" }} >
                                    <Text style={styles.text1} numberOfLines={2}>{detail.categorie}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressDescription}>
                                {detail.DESCRIPTION ? <View style={{ marginTop: 15 }} >
                                    <Text style={styles.txtDisplay}>
                                        {detail.DESCRIPTION}
                                    </Text>
                                </View> :
                                    <View style={{ marginTop: "15%" }}>
                                        <TouchableOpacity onPress={onPressDescription}>
                                            <Text style={{ marginHorizontal: "3%", marginBottom: "30%", marginTop: "-1%", color: "#797E9A" }}><Ionicons name="add-sharp" size={20} color="#797E9A" />Clique pour ajouter une description</Text>
                                        </TouchableOpacity>
                                    </View>}
                            </TouchableOpacity>
                        </>}
                    {/* <View>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 40 }}>

                                                  <View style={styles.carre}>
                                                            <AntDesign name="sharealt" size={20} color="black" />
                                                  </View>
                                                  <View style={styles.carre}>
                                                            <AntDesign name="shoppingcart" size={20} color="black" />

                                                  </View>


                                                  <TouchableOpacity >
                                                            <View style={styles.carre3}>
                                                                      <Text style={{ textAlign: 'center', color: 'white', }}>Ajouter au panier</Text>
                                                            </View>
                                                  </TouchableOpacity>

                                        </View>
                              </View> */}
                </View>
            </ScrollView >
            <TouchableOpacity style={styles.addBtn} onPress={deleteMenu}>
                <Text style={styles.addBtnText}>supprimer </Text>
            </TouchableOpacity>
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


            <Modalize ref={PrixmodaliseRef} adjustToContentHeight
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
                        value={data.price}
                        onChangeText={(newValue) => handleChange('price', newValue)}
                    />
                </View>
                <TouchableOpacity onPress={() => UpdateData()} style={styles.addBtn} >
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={TempsmodaliseRef} adjustToContentHeight
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
                        label={"Modifier le temps de preparation en min"}
                        value={data.temps}
                        onChangeText={(newValue) => handleChange('temps', newValue)}
                    />
                </View>
                <TouchableOpacity onPress={() => UpdateData()} style={styles.addBtn} >
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={RepasmodaliseRef} handlePosition="inside" modalHeight={180} snapPoint={250}>
                <Text style={{ marginBottom: "-1%", fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: "3%", marginTop: 10 }}
                    onPress={() => repasModalizeRef.current.open()}
                // disabled={service.id_service == 2}
                >
                    <View >
                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                            Repas
                        </Text>
                        {RepasSelect ? <Text style={[styles.inputText, { color: '#000' }]}>
                            {RepasSelect.NOM}
                        </Text> :
                            <Text style={[styles.inputText, { color: '#000' }]}>{detail.repas}</Text>
                        }
                    </View>
                    <AntDesign name="caretdown" size={20} color="#777" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBtn1} onPress={() => UpdateData()}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            <Modalize ref={CategoriemodaliseRef} handlePosition="inside" modalHeight={180} snapPoint={250}>
                <Text style={{ marginBottom: "-1%", fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
                <TouchableOpacity style={{ ...styles.modalCard, marginHorizontal: "3%", marginTop: 10 }}
                    onPress={() => categoriesModalizeRef.current.open()}
                // disabled={service.id_service == 2}
                >
                    <View >
                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                            Categorie
                        </Text>
                        {CategorieSelect ? <Text style={[styles.inputText, { color: '#000' }]}>
                            {CategorieSelect.NOM}
                        </Text> :
                            <Text style={[styles.inputText, { color: '#000' }]}>{detail.categorie}</Text>
                        }
                    </View>
                    <AntDesign name="caretdown" size={20} color="#777" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBtn1} onPress={() => UpdateData()}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize>
            {/* <Modalize ref={DescriptionmodaliseRef} handlePosition="inside" modalHeight={260} snapPoint={250}>
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
               
                <OutlinedTextField
                    label={"Modifier description"}
                    fontSize={14}
                    style={styles.input}
                    value={detail.DESCRIPTION}
                   
                    lineWidth={0.5}
                    activeLineWidth={0.5}
                    baseColor={COLORS.smallBrown}
                    tintColor={COLORS.primary}
                    multiline={true}
                />
                
                <TouchableOpacity style={styles.addBtn1} onPress={() => UpdateData()}>
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
            </Modalize> */}
            <Modalize ref={DescriptionmodaliseRef}
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
                <TouchableOpacity onPress={() => UpdateData()} style={styles.addBtn} >
                    <Text style={styles.addBtnText}>Modifier</Text>
                </TouchableOpacity>
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
                                // value={data.q}
                                // onChangeText={(newValue) => handleChange('q', newValue)}
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
                                        // value={data.repas}
                                        onChangeText={(newValue) => handleChange('repas', newValue)}
                                        // onBlur={() => checkFieldData('repas')}
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
                                        // value={data.descriptionRepas}
                                        // onChangeText={(newValue) => handleChange('descriptionRepas', newValue)}
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
        </>
    )
}
const styles = StyleSheet.create({
    imagePrincipal:
    {

        width: '120%',
        height: 400,
        alignSelf: 'center',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,


    },
    text: {
        color: '#242F68',
        fontWeight: "bold",
        fontSize: 20
    },
    text1: {
        color: '#242F68',
        fontWeight: "bold",
        fontSize: 16
    },
    textFbu: {
        color: 'red',
        fontWeight: "bold",
        fontSize: 15,
        opacity: 0.6
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
    modalItemModel2: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
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
    inputText: {
        color: '#777'
    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 10,

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
    carre: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 10,
        // marginTop: 1,
    },

    txtDisplay: {
        color: '#191970',
        fontSize: 15,
        fontWeight: 'bold',
        opacity: 0.4
    },
    txtDispla: {
        color: '#646B94',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 30

    },
    icon: {
        width: 50,
        top: 30,
        position: 'absolute',
        marginRight: 10,
        // backgroundColor: '#fff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon1: {
        width: 50,
        top: 30,
        marginLeft: 10,
        left: 250,
        position: 'absolute',
        // backgroundColor: '#fff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardOK: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,

        top: 30,
        marginLeft: 8,
        left: 270,
        position: 'absolute',
    },
    uploadImages: {
        width: 40,
        height: 40,
        backgroundColor: "#ddd",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#fff",
        position: 'absolute',
        left: 250,
        marginTop: 300,
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
    actionLabels: {
        marginLeft: 10
    },
    modalActionText: {
        fontWeight: "bold"
    },
    modalActionDescription: {
        color: '#777',
        fontSize: 12
    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 0,

    },
    addBtn: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: COLORS.ecommerceOrange,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: "1%"
    },
    modalCard2: {
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
    addBtn1: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: COLORS.ecommerceOrange,
        borderRadius: 10,
        paddingVertical: 15,
        marginBottom: 1,
        marginTop: "1%"
    },
    addBtnText: {
        color: '#FFF',
        fontWeight: "bold",
        textAlign: "center",
    }
})
