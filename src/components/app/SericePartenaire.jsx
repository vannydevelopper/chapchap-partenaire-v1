import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions, View, Image, TouchableOpacity } from "react-native";
import fetchApi from "../../helpers/fetchApi";
import { COLORS } from "../../styles/COLORS";

export default function SericePartenaire() {
        const { width, height } = useWindowDimensions()
        const SERVICE_MARGIN = 40
        const SERVICE_WIDTH = (width / 2)
        const navigation = useNavigation()

        const [services, setServices] = useState([])

        useEffect(() => {
                (async () => {
                        try {
                                const partenaire = await fetchApi("/service/partenaire")
                                setServices(partenaire.result)
                                // console.log(partenaire.result)
                        }
                        catch (error) {
                                console.log(error)
                        } finally {

                        }
                })()
        }, [])

        const searchProduit = (service) => {
                navigation.navigate("EcommerceHomeScreen", { partenaire: service })
        }

        return (
                <>
                        <ScrollView>
                                <View style={{ flex: 1 }}>
                                        <Text style={styles.title}>Catégories de service</Text>
                                        <View style={styles.services}>
                                                {services.map((service, index) => {
                                                        return (
                                                                <View style={[styles.serviceContainer, { width: SERVICE_WIDTH, height: SERVICE_WIDTH }]} key={index}>
                                                                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} onPress={() => searchProduit(service)}>
                                                                                <View style={[styles.service]}>
                                                                                        <ImageBackground source={{ uri: service.produit.BACKGROUND_IMAGE }} style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                                                                                <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 10 }} />
                                                                                                <View style={styles.serviceIcon}>
                                                                                                        <Image source={{ uri: service.produit.LOGO }} style={styles.serviceIconImage} />
                                                                                                </View>
                                                                                                <Text style={styles.serviceName}>{service.produit.NOM_SERVICE}</Text>
                                                                                        </ImageBackground>
                                                                                </View>
                                                                        </TouchableNativeFeedback>
                                                                </View>
                                                        )
                                                })}

                                        </View>
                                </View>
                        </ScrollView>
                        <TouchableOpacity onPress={()=>navigation.navigate("HomeAllServiceScreen")}>
                                <View style={styles.addBtn}>
                                        <Text style={[styles.addBtnText]}>
                                                Demander le service
                                        </Text>
                                </View>
                        </TouchableOpacity>
                </>
        )
}

const styles = StyleSheet.create({
        title: {
                fontWeight: "bold",
                marginBottom: 10,
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20
        },
        services: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
        },
        serviceContainer: {
                maxWidth: 300,
                justifyContent: 'center',
                alignItems: 'center'
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
                color: '#fff',
                fontWeight: 'bold',
                marginBottom: 20,
                fontSize: 16
        },
        serviceIconImage: {
                width: 40,
                height: 40,
                borderRadius: 10,
        },
        addBtn: {
                paddingVertical: 15,
                backgroundColor: COLORS.ecommerceOrange,
                borderRadius: 10,
                marginBottom: 10,
                marginTop: 10,
                flexDirection: "row",
                marginHorizontal: 20,
                paddingHorizontal: 30,
                alignSelf: "center",
                overflow: "hidden"
        },
        addBtnText: {
                color: '#FFF',
                fontWeight: "bold",
        },
})