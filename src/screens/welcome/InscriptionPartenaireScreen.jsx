import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableWithoutFeedback, Button, TouchableOpacity, ImageBackground, TouchableNativeFeedback, } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useForm } from '../../hooks/useForm';
import { Modalize } from 'react-native-modalize';
import useFetch from "../../hooks/useFetch";
import { useFocusEffect } from '@react-navigation/native';
import fetchApi from '../../helpers/fetchApi';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useToast } from 'native-base';
import { COLORS } from '../../styles/COLORS';
// import {  useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as Location from 'expo-location'
import Loading from '../../components/app/Loading';
import { useFormErrorsHandle } from '../../hooks/useFormErrorsHandle';

export default function InscriptionPartenaireScreen() {

    const [services, setService] = useState([])
    const [partenairetypes, setPartenairetype] = useState([])
    const [location, setLocation] = useState(null)
    const servicesModalizeRef = useRef(null)
    const partenairetypesModalizeRef = useRef(null)
    const serviceRef = useRef(null)
    const [ServiceSelect, setServiceSelect] = useState(null)
    const [typepartenaireselect, setTypepartenaireselect] = useState(null)

    const [backgroundimage, SetBackgroundimage] = useState("")
    const [imagelogo, SetImagelogo] = useState("")

    // const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const [data, handleChange, setValue] = useForm({
        ServiceSelect: null,
        typepartenaireselect: null,
        organisation: "",
        email: "",
        telephone: "",
        nif: "",
        // backgroundimage: "",
        // imagelogo: "",
        adresse: "",

    })
    const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {


        email: {
            required: true,
            email: true
        },
        telephone: {
            required: true,

        },
        imagelogo: {
            required: true
        }

    }, {

        email: {
            required: "L'email est obligatoire",
            email: "Email invalide"
        },
        telephone: {
            required: "Telephone est obligatoire"
        },
        imagelogo: {
            required: "Logo est obligatoire"
        }

    })
    const askLocationPermission = async () => {
        let {
            status: locationStatus,
        } = await Location.requestForegroundPermissionsAsync()
        if (locationStatus !== 'granted') {
            console.log('Permission to access location was denied')
            setLocation(false)
            return
        }
        var location = await Location.getCurrentPositionAsync({})
        setLocation(location)
    }

    useEffect(() => {
        askLocationPermission()
    }, [])
    if (location === false) {
        return (
            <View
                style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 16, opacity: 0.8 }}>
                    Pas d'accès à la localisation
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#777',
                        marginTop: 10,
                        paddingHorizontal: 10,
                    }}
                >
                    L'application a besoin de votre localisation pour fonctionner
                </Text>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('#ddd')}
                    useForeground={true}
                    onPress={() => askLocationPermission()}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 20,
                        }}
                    >
                        <Text>Autoriser l'accès</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }


    const sendData = async () => {
        setLoading(true)
        if (!location) {
            let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
            if (locationStatus !== 'granted') {
                return setLoading(false)
            }
            var loc = await Location.getCurrentPositionAsync({});
            setLocation(loc)
        }

        const form = new FormData()
        form.append('ID_USER', typepartenaireselect.ID_PARTENAIRE_TYPE)
        form.append('ID_TYPE_PARTENAIRE', typepartenaireselect.ID_PARTENAIRE_TYPE)
        form.append('NOM_ORGANISATION', data.organisation)
        form.append('TELEPHONE', data.telephone)
        form.append('NIF', data.nif)
        form.append('EMAIL', data.email)
        form.append('ADRESSE_COMPLETE', data.adresse)
        form.append('LONGITUDE', location.coords.longitude)
        form.append('LATITUDE', location.coords.latitude)
        form.append('ID_SERVICE', ServiceSelect.ID_SERVICE)


        if (imagelogo) {
            const manipResult = await manipulateAsync(
                imagelogo.uri,
                [
                    { resize: { width: 500 } }
                ],
                { compress: 0.8, format: SaveFormat.JPEG }
            );
            let localUri = manipResult.uri;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            form.append('LOGO', {
                uri: localUri, name: filename, type
            })

        }

        if (backgroundimage) {
            const manipResult = await manipulateAsync(
                backgroundimage.uri,
                [
                    { resize: { width: 500 } }
                ],
                { compress: 0.7, format: SaveFormat.JPEG }
            );
            let localUri = manipResult.uri;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            form.append('BACKGROUND_IMAGE', {
                uri: localUri, name: filename, type
            })

            try {
                const data = await fetchApi("/partenaire/Ajouter", {
                    method: "POST",
                    body: form

                })
                console.log(data)
                //navigation.navigate("Home")
                setLoading(false)
                toast.show({
                    title: "L'enregistrement est faite avec succès",
                    placement: "bottom",
                    status: 'success',
                    duration: 6000,
                    width: '90%',
                    minWidth: 300
                })
            }
            catch (error) {
                console.log(error)
                toast.show({
                    title: "La connexion a echoue",
                    placement: "bottom",
                    status: 'success',
                    duration: 6000,
                    width: '90%',
                    minWidth: 300
                })
                setLoading(false)
            }
            setLoading(false)

        }



    }
    const onServiceSelect = (service) => {
        setServiceSelect(service)
        servicesModalizeRef.current.close()


    }
    const ontypepartenaireselect = (partenairetype) => {
        setTypepartenaireselect(partenairetype)
        partenairetypesModalizeRef.current.close()
    }

    useEffect(() => {
        (async () => {
            try {


                const response = await fetchApi('/service', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                setService(response.result)
                //console.log(response.result)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    //fetch partenaires types
    useEffect(() => {
        (async () => {
            try {


                const partenaire = await fetchApi('/partenaire/type', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                setPartenairetype(partenaire.result)
                //console.log(partenaire.result)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const onTakePictureSelect = async () => {
        // photoTypeSelectRef.current?.close()
        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        })
        SetImagelogo(photo)
    }
    const onTakeimageSelect = async () => {
        // photoTypeSelectRef.current?.close()
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        })
        SetBackgroundimage(image)
    }


    return (
        <>
            {loading && <Loading />}

            <ImageBackground source={require('../../../assets/images/g52.png')} style={styles.container}>
                <View style={{ backgroundColor: "#fff" }}>
                    <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                </View>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View>
                        <View style={styles.cardTitle}>
                            <Text style={styles.Title}>Compte Partenaire</Text>
                            <Text style={styles.description}> Chap Chap</Text>
                        </View>

                        <TouchableNativeFeedback
                            accessibilityRole='button'
                            background={TouchableNativeFeedback.Ripple('#c9c5c5')}

                            onPress={() => servicesModalizeRef.current.open()}>
                            <View style={styles.CardModal} >
                                <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                    {ServiceSelect != null ? ServiceSelect.NOM : "Choisir le service"}
                                </Text>
                            </View>

                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            accessibilityRole='button'
                            background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                            onPress={() => partenairetypesModalizeRef.current.open()}>
                            <View style={styles.CardModal}>
                                <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                    {typepartenaireselect != null ? typepartenaireselect.DESCRIPTION : "Choisir le type de partenaire"}
                                </Text>
                            </View>
                        </TouchableNativeFeedback>

                        {typepartenaireselect != null && typepartenaireselect.ID_PARTENAIRE_TYPE == 2 && <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Nom organisation"
                                fontSize={14}
                                value={data.organisation}
                                onChangeText={(newValue) => handleChange('organisation', newValue)}
                                onBlur={() => checkFieldData('organisation')}
                                error={hasError('organisation') ? getError('organisation') : ''}

                            />
                        </View>}
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Adresse email"
                                fontSize={14}
                                value={data.email}
                                onChangeText={(newValue) => handleChange('email', newValue)}
                                onBlur={() => checkFieldData('email')}
                                error={hasError('email') ? getError('email') : ''}

                            />
                        </View>
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Telephone"
                                fontSize={14}
                                value={data.telephone}
                                onChangeText={(newValue) => handleChange('telephone', newValue)}
                                onBlur={() => checkFieldData('telephone')}
                                error={hasError('telephone') ? getError('telephone') : ''}
                            />
                        </View>

                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Nif"
                                fontSize={14}
                                value={data.nif}
                                onChangeText={(newValue) => handleChange('nif', newValue)}
                                onBlur={() => checkFieldData('nif')}
                                error={hasError('nif') ? getError('nif') : ''}

                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                            <View>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                                        <Text style={styles.image}>
                                            Logo
                                        </Text>

                                    </View>
                                </View>
                                <TouchableOpacity onPress={onTakePictureSelect} >
                                    <View style={{ ...styles.addImage }}>
                                        {imagelogo ? <Image source={{ uri: imagelogo.uri }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> :
                                            <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
                                                <Image source={require('../../../assets/images/logo.png')} style={{ width: '30%', height: '30%' }} />
                                            </View>}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                                        <Text style={styles.image}>
                                            Image
                                        </Text>

                                    </View>
                                </View>
                                <TouchableOpacity onPress={onTakeimageSelect}>
                                    <View style={{ ...styles.addImage }}>
                                        {backgroundimage ? <Image source={{ uri: backgroundimage.uri }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> :
                                            <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
                                            <Image source={require('../../../assets/images/person-icon.png')} style={{ width: '30%', height: '30%', marginTop: 10 }} />
                                            </View>}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {typepartenaireselect != null && typepartenaireselect.ID_PARTENAIRE_TYPE == 2 && <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Adresse Complete"
                                fontSize={14}
                                value={data.adresse}
                                onChangeText={(newValue) => handleChange('adresse', newValue)}
                                onBlur={() => checkFieldData('adresse')}
                                error={hasError('adresse') ? getError('adresse') : ''}


                            />
                        </View>}
                        <TouchableOpacity onPress={sendData} >
                            <View style={styles.button}>
                                <Text style={styles.buttonText} >Enregistrer</Text>
                            </View>


                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </ImageBackground>
            <Modalize ref={servicesModalizeRef} adjustToContentHeight handlePosition='inside'>
                <>
                    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Type de Service</Text>
                    </View>
                    <View>
                        {services.map((service, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => onServiceSelect(service)}>
                                    <View style={styles.modalItem} >
                                        {ServiceSelect?.ID_SERVICE == service.ID_SERVICE ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                            <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                        <Text>{service.NOM}</Text>
                                    </View>
                                </TouchableOpacity>
                            )

                        })

                        }
                    </View>
                </>
            </Modalize>

            <Modalize ref={partenairetypesModalizeRef} adjustToContentHeight handlePosition='inside'>

                <>
                    <View>
                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Type de Partenaire</Text>
                        </View>
                        {partenairetypes.map((partenairetype, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => ontypepartenaireselect(partenairetype)}>
                                    <View style={styles.modalItem} >
                                        {typepartenaireselect?.ID_PARTENAIRE_TYPE == partenairetype.ID_PARTENAIRE_TYPE ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                            <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                        <Text>{partenairetype.DESCRIPTION}</Text>
                                    </View>
                                </TouchableOpacity>
                            )

                        })

                        }
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
    image: {
        marginTop: 30,
        alignSelf: "center",
    },
    cardTitle: {
        flexDirection: "row",
        marginTop: 30,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    Title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    button: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primaryPicker,
        marginHorizontal: 20
    },
    description: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1D8585"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        // textTransform:"uppercase",
        fontSize: 16,
        textAlign: "center"
    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 10,

    },
    ButtonCard: {
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: COLORS.primaryPicker,

    },
    addImage: {
        width: 160,
        height: 100,
        borderRadius: 5,
        margin: 10,
        marginHorizontal: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderColor: '#777',
        backgroundColor:'#ffcc',
        borderWidth: 1,
        //alignSelf: 'center'
    },
    image: {

        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        //  marginTop: 10, 
        textAlign: "center",
        alignSelf: 'center'

    },

    modalItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    openModalizeLabel: {
        color: '#555',
        fontSize: 14,
    },
    CardModal: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 20

    },
    addImageContainer: {
        flex: 1,
        // backgroundColor: 'blue'
    },
    button: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: "#1D8585",
        marginHorizontal: 20
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        // textTransform:"uppercase",
        fontSize: 16,
        textAlign: "center"
    },

})
