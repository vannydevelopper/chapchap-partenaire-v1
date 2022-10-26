import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useRef, useState, useEffect } from 'react'
import {
        Image,
        View,
        StyleSheet,
        Text,
        TouchableOpacity,
        TouchableNativeFeedback,
        TextInput,
        ScrollView,
        StatusBar,
        Modal,
        useWindowDimensions,
} from 'react-native'
import { Entypo, Ionicons, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'
import ProductImages from "../../components/ecommerce/details/ProductImages";
import { COLORS } from '../../styles/COLORS'
import { Modalize } from "react-native-modalize";
import { useForm } from "../../hooks/useForm";
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import fetchApi from "../../helpers/fetchApi";



export default function ApprovisionnementScreen() {
        const route = useRoute()
        const navigation = useNavigation()
        const { detail } = route.params
        const modalizeQuantiteStockerRef = useRef(null)
        const tailleModalizeRef = useRef(null)
        const couleurModalizeRef = useRef(null)

        const [showAUtresTaille, setShowAUtresTaille] = useState(false)
        const [showAUtresCouleur, setShowAUtresCouleur] = useState(false)

        const [tailles, setTaille] = useState([])
        const [couleurs, setCouleur] = useState([])

        const AutresTypesTaille = () => {
                setShowAUtresTaille(true)
                // setTailleSelect(null)
        }

        const AutresTypesCouleurs = () => {
                setShowAUtresCouleur(true)
                // setselectedCouleur(false)

        }


        var IMAGES = [
                detail.produit_partenaire.IMAGE_1 ? detail.produit_partenaire.IMAGE_1 : undefined,
                detail.produit_partenaire.IMAGE_2 ? detail.produit_partenaire.IMAGE_2 : undefined,
                detail.produit_partenaire.IMAGE_3 ? detail.produit_partenaire.IMAGE_3 : undefined,
        ]

        useEffect(() => {
                (async () => {
                        try {
                                var taille = await fetchApi(`/produit/taille?ID_CATEGORIE_PRODUIT=${detail.categorie.ID_CATEGORIE_PRODUIT}`)
                                // setTaille(taille.result)
                                if (detail.sous_categorie.ID_PRODUIT_SOUS_CATEGORIE != null) {
                                        var taille = await fetchApi(`/produit/taille?ID_CATEGORIE_PRODUIT=${detail.categorie.ID_CATEGORIE_PRODUIT}&ID_PRODUIT_SOUS_CATEGORIE=${detail.sous_categorie.ID_PRODUIT_SOUS_CATEGORIE}`)
                                        setTaille(taille.result)
                                }
                                console.log(taille.result)
                        }
                        catch (error) {
                                console.log(error)
                        } finally {

                        }
                })()
        }, [detail])
        return (
                <>
                        <View style={{ flex: 1 }}>
                                <View style={styles.cardHeader}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                                <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                        </TouchableOpacity>
                                        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                        <Entypo name="dots-three-vertical" size={24} color="black" />
                                                </TouchableOpacity>
                                        </View> */}
                                </View>
                                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                        <ProductImages images={IMAGES} />
                                </ScrollView>
                                <ScrollView>
                                        <View style={styles.cardApprove}>
                                                <View style={{ borderWidth: 1, borderColor: "#F29558", borderRadius: 10 }}>
                                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginHorizontal: 10, marginTop: 10 }}>
                                                                <View style={styles.cardPhoto}>
                                                                        <FontAwesome5 name="elementor" size={24} color="white" />
                                                                </View>
                                                                <View style={{ marginLeft: 10 }}>
                                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{detail.produit.NOM}</Text>
                                                                        <Text>Prix {detail.produit_partenaire.PRIX} Fbu</Text>
                                                                </View>

                                                        </View>
                                                        <View style={{ flexDirection: "row", marginHorizontal: 40, justifyContent: "space-between", marginTop: 10, marginBottom: 10 }}>
                                                                <View style={styles.cardType}>
                                                                        <Text style={{ color: "#fff" }}>{detail.categorie.NOM_CATEGORIE}</Text>
                                                                </View>
                                                                <View style={styles.cardType}>
                                                                        <Text style={{ color: "#fff" }}> {detail.sous_categorie.SOUS_CATEGORIE}</Text>
                                                                </View>
                                                        </View>
                                                </View>

                                                <View style={styles.cardDetail}>
                                                        <TouchableOpacity style={{ marginHorizontal: 10, marginBottom: 5 }}
                                                                onPress={() => modalizeQuantiteStockerRef.current.open()}
                                                        >
                                                                <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>Quantite Stocke</Text>
                                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                                                        <View style={styles.cardQuantite}>
                                                                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>{detail.stock.QUANTITE_STOCKE}</Text>
                                                                        </View>
                                                                        <View style={{ marginLeft: 10 }}>
                                                                                <Text style={{ fontSize: 15, color: "#777" }}>couleur: {detail.couleur.COULEUR}</Text>
                                                                                <Text style={{ fontSize: 15, color: "#777" }}>taille: {detail.taille.TAILLE}</Text>

                                                                        </View>
                                                                </View>
                                                        </TouchableOpacity>
                                                </View>

                                                <View style={styles.cardDetail}>
                                                        <View style={{ marginHorizontal: 10, marginBottom: 5 }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>Quantite vendue</Text>
                                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                                                        <View style={styles.cardQuantite}>
                                                                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>{detail.stock.QUANTITE_VENDUE}</Text>
                                                                        </View>
                                                                        <View style={{ marginLeft: 10 }}>
                                                                                <Text style={{ fontSize: 15, color: "#777" }}>couleur: {detail.couleur.COULEUR}</Text>
                                                                                <Text style={{ fontSize: 15, color: "#777" }}>taille: {detail.taille.TAILLE}</Text>

                                                                        </View>
                                                                </View>
                                                        </View>
                                                </View>


                                                <View style={styles.cardDetail}>
                                                        <View style={{ marginHorizontal: 10, marginBottom: 5 }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>Quantite restante</Text>
                                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                                                        <View style={styles.cardQuantite}>
                                                                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>{detail.stock.QUANTITE_RESTANTE}</Text>
                                                                        </View>
                                                                        <View style={{ marginLeft: 10 }}>
                                                                                <Text style={{ fontSize: 15, color: "#777" }}>couleur: {detail.couleur.COULEUR}</Text>
                                                                                <Text style={{ fontSize: 15, color: "#777" }}>taille: {detail.taille.TAILLE}</Text>

                                                                        </View>
                                                                </View>
                                                        </View>
                                                </View>
                                        </View>
                                </ScrollView>
                        </View>

                        <Modalize ref={modalizeQuantiteStockerRef} adjustToContentHeight handlePosition='inside'>
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
                                                                                // value={data.quantite}
                                                                                // onChangeText={(newValue) => handleChange('quantite', newValue)}
                                                                                // onBlur={() => checkFieldData('quantite')}
                                                                                // error={hasError('quantite') ? getError('quantite') : ''}
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
                                                                                                <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                                        ffffff
                                                                                                </Text>
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
                                                                                                <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                                        kkk
                                                                                                </Text>
                                                                                        </View>
                                                                                        <AntDesign name="caretdown" size={20} color="#777" />
                                                                                </TouchableOpacity>
                                                                        </View>

                                                                        <TouchableOpacity >
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
                                                        {showAUtresTaille ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Autres</Text>
                                                </TouchableOpacity>
                                                {tailles.map((taille, index) => {
                                                        return (
                                                                <TouchableOpacity key={index}>
                                                                        <View style={styles.modalItemModel2} >
                                                                                <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> 
                                                                                        <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                                                <Text>33333</Text>
                                                                        </View>

                                                                </TouchableOpacity>
                                                        )
                                                })}

                                                {showAUtresTaille && <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                                                        <OutlinedTextField
                                                                label={"Autres Tailles"}
                                                                fontSize={14}
                                                                // value={data.autresTaille}
                                                                // onChangeText={(newValue) => handleChange('autresTaille', newValue)}
                                                                // onBlur={() => checkFieldData('autresTaille')}
                                                                // error={hasError('autresTaille') ? getError('autresTaille') : ''}
                                                                lineWidth={0.5}
                                                                activeLineWidth={0.5}
                                                                baseColor={COLORS.smallBrown}
                                                                tintColor={COLORS.primary}
                                                        />
                                                </View>}

                                                {showAUtresTaille && <TouchableOpacity >
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
                                                        {showAUtresCouleur ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Autres</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity >
                                                        <View style={styles.modalItemModel2} >
                                                                <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" />
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                                <Text>ghfhf</Text>
                                                        </View>
                                                </TouchableOpacity>

                                                {showAUtresCouleur && <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                                                        <OutlinedTextField
                                                                label={"Autres Couleurs"}
                                                                fontSize={14}
                                                                // value={data.autresCouleur}
                                                                // onChangeText={(newValue) => handleChange('autresCouleur', newValue)}
                                                                // onBlur={() => checkFieldData('autresCouleur')}
                                                                // error={hasError('autresCouleur') ? getError('autresCouleur') : ''}
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
        cardApprove: {
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 20,
                // marginHorizontal:10,
                marginTop: 5
        },
        cardPhoto: {
                width: 40,
                height: 40,
                backgroundColor: "#777",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center"
        },
        cardQuantite: {
                width: 40,
                height: 40,
                backgroundColor: "#777",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
        },
        cardType: {
                minWidth: 20,
                padding: 3,
                backgroundColor: "#777",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center"
        },
        cardDetail: {
                borderWidth: 2,
                borderRadius: 20,
                borderColor: "#fff",
                marginTop: 10,
                backgroundColor: COLORS.ecommerceOrange,

        },
        inputCard: {
                marginHorizontal: 20,
                marginTop: 10,

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
        buttonModal: {
                marginTop: 10,
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 10,
                backgroundColor: COLORS.primaryPicker,
                marginBottom: 10
        },
        buttonText: {
                color: "#fff",
                fontWeight: "bold",
                // textTransform:"uppercase",
                fontSize: 16,
                textAlign: "center"
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