import React, { useRef, useState } from "react"
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput, TouchableNativeFeedback, ScrollView } from "react-native"
import { Ionicons, AntDesign, Entypo, Foundation, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from "@react-navigation/native";
import ProductImages from "../../components/restaurant/details/ProductImages"
import { Modalize } from "react-native-modalize";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import fetchApi from "../../helpers/fetchApi";
import { useEffect } from "react";
import { useCallback } from "react";

export default function MenuDetailScreen() {
    const route = useRoute()
    const { detail } = route.params
    // console.log(detail)
    const uploadModaliseRef = useRef()
    var restaurant = detail.ID_RESTAURANT_MENU
    var IMAGES = [
        detail.IMAGE ? detail.IMAGE : undefined,
        detail.IMAGE2 ? detail.IMAGE2 : undefined,
        detail.IMAGE3 ? detail.IMAGE3 : undefined,
    ]
    const [nombre, setNombre] = useState(0);
    const [menuImage, setMenuImage] = useState(null)

    // useFocusEffect(useCallback(() => {
    //     (async () => {
    //         try {
    //             if (menuImage) {
    //                 const form = new FormData()
    //                 const manipResult = await manipulateAsync(
    //                     logoImage.uri,
    //                     [
    //                         { resize: { width: 500 } }
    //                     ],
    //                     { compress: 0.8, format: SaveFormat.JPEG }
    //                 );
    //                 let localUri = manipResult.uri;
    //                 let filename = localUri.split('/').pop();
    //                 let match = /\.(\w+)$/.exec(filename);
    //                 let type = match ? `image/${match[1]}` : `image`;
    //                 form.append('IMAGE', {
    //                     uri: localUri, name: filename, type
    //                 })
    //             }
    //             console.log(form)
    //             const newProduct = await fetchApi(`/resto/menu/${detail.ID_RESTAURANT_MENU}`, {
    //                 method: "POST",
    //                 body: form
    //             })

    //         }
    //         catch (error) {
    //             console.log(error)
    //         }
    //     })()
    // }, []))



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
            console.log(form)
            const newProduct = await fetchApi(`/resto/menu/${restaurant}`, {
                method: "POST",
                body: form
            })
        }
        catch (error) {
            console.log(error)
        }
    }


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
    return (
        <>

            <ScrollView>
                <View style={{ marginLeft: 30, marginTop: 50, marginHorizontal: 20 }}>
                    {detail.IMAGE ? <View style={{ width: '100%', marginTop: 10 }}>
                        <  Image source={{ uri: detail.IMAGE }} style={{ ...styles.imagePrincipal }} />
                    </View> :
                        <View>
                            <Image source={{ uri: menuImage.uri }} style={{ ...styles.imagePrincipal }} />
                        </View>}

                    {/* <ProductImages images={IMAGES} /> */}
                    <Ionicons name="ios-arrow-back-outline" size={24} color="white" style={{ ...styles.icon, marginTop: 0 }} />
                    <Entypo name="shopping-cart" size={24} color="white" style={{ ...styles.icon1, marginTop: 0 }} />
                    <View style={styles.cardOK}>
                        <Text style={{ color: "white", fontSize: 5 }}>5</Text>
                    </View>
                    <TouchableOpacity style={styles.uploadImages} onPress={() => onSelectPhoto()}>
                        <Feather name="image" size={24} color="black" />
                    </TouchableOpacity>


                    <View style={{ marginTop: 50 }} >
                        <Text style={styles.text} numberOfLines={2}>{detail.repas}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <AntDesign name="star" size={15} color="#EFC519" />
                            <AntDesign name="star" size={15} color="#EFC519" />
                            <AntDesign name="star" size={15} color="#EFC519" />
                            <AntDesign name="staro" size={15} color="#EFC519" />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <AntDesign name="clockcircleo" size={15} color="#797E9A" />
                            <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A" }}>30 Min</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={{ marginTop: -5 }}>
                                <Text style={styles.textFbu}>{detail.PRIX} Fbu</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginTop: 50 }} >
                        <Text style={styles.text1} numberOfLines={2}>{detail.categorie}</Text>
                    </View>
                    <View style={{ marginTop: 15 }} >
                        <Text style={styles.txtDisplay}>
                            {detail.DESCRIPTION}
                        </Text>
                    </View>
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
            <Modalize ref={uploadModaliseRef} handlePosition="inside" modalHeight={200} snapPoint={250}>
                <View style={styles.modalContent}>
                    {/* <TouchableNativeFeedback>
                        <View style={styles.modalAction}>
                            <View style={styles.actionIcon}>
                            <Feather name="camera" size={24} color="black" />
                            </View>
                            <View style={styles.actionLabels}>
                                <Text style={styles.modalActionText}>
                                    Prendre une photo
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback> */}
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

                    <TouchableNativeFeedback>
                        <View style={styles.modalAction}>
                            <View style={styles.actionIcon}>
                                <Feather name="trash" size={24} color="red" />
                            </View>
                            <View style={styles.actionLabels}>
                                <Text style={styles.modalActionText}>
                                    delete
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                </View>
            </Modalize>
        </>
    )
}
const styles = StyleSheet.create({
    imagePrincipal:
    {

        width: '120%',
        height: 200,
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
        fontSize: 15
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
        marginTop: 160,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        marginTop: 40
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
})
