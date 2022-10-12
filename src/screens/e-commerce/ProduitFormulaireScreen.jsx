import React, { useEffect, useRef, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";



export default function ProduitFormulaireScreen() {
        const couleurModalizeRef = useRef(null)
        const tailleModalizeRef = useRef(null)
        const ajoutDetailsModalizeRef = useRef(null)
        const categoriesModalizeRef = useRef(null)
        const SousCategoriesModalizeRef = useRef(null)

        const [logoImage, setLogoImage] = useState(null)
        const [TailleSelect, setTailleSelect] = useState(null)
        const [selectedCouleur, setselectedCouleur] = useState(null)
        const [CategorieSelect, setCategorieSelect] = useState(null)
        const [selectedSousCategorie, setselectedSousCategorie] = useState(null)

        const [showAUtresTaille, setShowAUtresTaille] = useState(false)
        const [showAUtresCouleur, setShowAUtresCouleur] = useState(false)

        const [data, handleChange, setValue] = useForm({
                TailleSelect: null,
                selectedCouleur: null,
                CategorieSelect: null,
                selectedSousCategorie: null,
                produit: "",
                quantite: "",
                logoImage: "",
                autresTaille: "",
                autresCouleur:""
        })
        const { checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                quantite: {
                        required: true,

                },
        }, {
                quantite: {
                        required: "Quantite est obligatoire"
                },
        })

        const onCouleurSelect = () => {
                // setServiceSelect(service)
                couleurModalizeRef.current.close()
        }

        const onTaillesSelect = () => {
                // setServiceSelect(service)
                tailleModalizeRef.current.close()
        }

        const onCategorieSelect = () => {
                // setServiceSelect(service)
                categoriesModalizeRef.current.close()
        }

        const onSousCategorieSelect = () => {
                // setServiceSelect(service)
                SousCategoriesModalizeRef.current.close()
        }

        const AutresTypesTaille = () => {
                setShowAUtresTaille(true)
        }

        const AutresTypesCouleurs = () => {
                setShowAUtresCouleur(true)
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
        return (
                <>
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
                                <Text style={styles.title}>Nouveau produit</Text>
                                <ScrollView keyboardShouldPersistTaps="handled" style={{ marginBottom: 20 }}>
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
                                                                        <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                hhhsggss
                                                                        </Text>
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
                                                                        <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                hhhsggss
                                                                        </Text>
                                                                </View>
                                                                <AntDesign name="caretdown" size={20} color="#777" />
                                                        </TouchableOpacity>
                                                </View>

                                                <TouchableOpacity
                                                        onPress={() => ajoutDetailsModalizeRef.current.open()}
                                                // disabled={service.id_service == 2}
                                                >
                                                        <View style={styles.button}>
                                                                <Text style={styles.buttonText} >Ajout de details </Text>
                                                        </View>
                                                </TouchableOpacity>
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
                                        </View>
                                </ScrollView>
                        </View>

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
                                                                                // disabled={service.id_service == 2}
                                                                                >
                                                                                        <View >
                                                                                                <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                                        Taille
                                                                                                </Text>
                                                                                                <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                                        hhhsggss
                                                                                                </Text>
                                                                                        </View>
                                                                                        <AntDesign name="caretdown" size={20} color="#777" />
                                                                                </TouchableOpacity>
                                                                        </View>

                                                                        <View style={{ marginTop: 10 }}>
                                                                                <TouchableOpacity style={styles.modalCard}
                                                                                        onPress={() => couleurModalizeRef.current.open()}
                                                                                // disabled={service.id_service == 2}
                                                                                >
                                                                                        <View >
                                                                                                <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                                        Couleur
                                                                                                </Text>
                                                                                                <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                                        hhhsggss
                                                                                                </Text>
                                                                                        </View>
                                                                                        <AntDesign name="caretdown" size={20} color="#777" />
                                                                                </TouchableOpacity>
                                                                        </View>

                                                                        <TouchableOpacity>
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

                        <Modalize ref={tailleModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Tailles</Text>
                                        </View>
                                        <View>
                                                <TouchableOpacity style={styles.modalAutres} onPress={AutresTypesTaille}>
                                                        <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" />
                                                        <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Autres</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => onTaillesSelect()}>
                                                        <View style={styles.modalItemModel2} >
                                                                <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" />
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                                <Text>XL 12</Text>
                                                        </View>

                                                </TouchableOpacity>

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

                                                {showAUtresTaille && <TouchableOpacity>
                                                        <View style={styles.buttonModalSecond}>
                                                                <Text style={styles.buttonText} >Ajouter</Text>
                                                        </View>
                                                </TouchableOpacity>}




                                        </View>
                                </>
                        </Modalize>

                        <Modalize ref={couleurModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Couleurs</Text>
                                        </View>
                                        <View>
                                                <TouchableOpacity style={styles.modalAutres} onPress={AutresTypesCouleurs}>
                                                        <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" />
                                                        <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Autres</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => onCouleurSelect()}>
                                                        <View style={styles.modalItemModel2} >
                                                                <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" />
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                                <Text>Vert Citron</Text>
                                                        </View>
                                                </TouchableOpacity>
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

                                                {showAUtresCouleur && <TouchableOpacity>
                                                        <View style={styles.buttonModalSecond}>
                                                                <Text style={styles.buttonText} >Ajouter</Text>
                                                        </View>
                                                </TouchableOpacity>}

                                        </View>
                                </>
                        </Modalize>

                        <Modalize ref={categoriesModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Categories</Text>
                                        </View>
                                        <View>

                                                <TouchableOpacity onPress={() => onCategorieSelect()}>
                                                        <View style={styles.modalItemModel2} >
                                                                <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" />
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                                <Text>Categorie</Text>
                                                        </View>
                                                </TouchableOpacity>

                                        </View>
                                </>
                        </Modalize>

                        <Modalize ref={SousCategoriesModalizeRef} adjustToContentHeight handlePosition='inside'>
                                <>
                                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Sous Categories</Text>
                                        </View>
                                        <View>

                                                <TouchableOpacity onPress={() => onSousCategorieSelect()}>
                                                        <View style={styles.modalItemModel2} >
                                                                <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" />
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                                <Text>Sous categories</Text>
                                                        </View>
                                                </TouchableOpacity>

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