import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import fetchApi from "../../helpers/fetchApi";
import { COLORS } from "../../styles/COLORS";
import Loading from './Loading'
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import EmptyServiceFeeback from "../services/EmptyServiceFeeback";

export default function ServicesPartenaire() {
          const { width, height } = useWindowDimensions()
          const SERVICE_MARGIN = 40
          const SERVICE_WIDTH = (width / 2)
          const navigation = useNavigation()
          const modalizeRef = useRef(null)
          const [services, setServices] = useState([])
          const [loading, setLoading] = useState(false)
          useFocusEffect(useCallback(() => {
                    (async () => {
                              setLoading(true)
                              try {
                                        const partenaire = await fetchApi("/service/partenaire")
                                        setServices(partenaire.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, []))
          useEffect(() => {
                    modalizeRef.current?.open()
          }, [modalizeRef])
          const searchProduit = (service) => {
                    navigation.navigate("EcommerceHomeScreen", { partenaire: service })
          }
          return (
                    <>
                              <View style={styles.container}>
                                        {loading ? <View style={styles.loadingContainer}>
                                                  <ActivityIndicator size={"large"} color="#000" />
                                        </View> :
                                        <View style={styles.servicesContainer}>
                                                  {services.length == 0 ? <EmptyServiceFeeback /> :
                                                  <>
                                                  <Text style={styles.title}>Vos services</Text>
                                                  <View style={styles.services}>
                                                            {services.map((service, index) => {
                                                                      return (
                                                                                (service.produit.ID_SERVICE == 1 ?
                                                                                          <View style={[styles.serviceContainer, { width: SERVICE_WIDTH, height: SERVICE_WIDTH }]} key={index}>
                                                                                                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} onPress={() => navigation.navigate("EcommerceHomeScreen", { partenaire: service })}>
                                                                                                              <View style={[styles.service]}>
                                                                                                                        <ImageBackground source={{ uri: service.produit.BACKGROUND_IMAGE }} style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                                                                                                                  <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 10 }} />
                                                                                                                                  <View style={styles.serviceIcon}>

                                                                                                                                            <Image source={{ uri: service.produit.LOGO }} style={styles.serviceIconImage} />
                                                                                                                                  </View>
                                                                                                                                  <Text style={styles.serviceName}>{service.produit.NOM_ORGANISATION}</Text>
                                                                                                                        </ImageBackground>
                                                                                                              </View>
                                                                                                    </TouchableNativeFeedback>
                                                                                          </View>
                                                                                          : service.produit.ID_SERVICE == 2 ?
                                                                                                    <View style={[styles.serviceContainer, { width: SERVICE_WIDTH, height: SERVICE_WIDTH }]} key={index}>
                                                                                                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} onPress={() => navigation.navigate("RestaurantNavigator", { partenaire: service })}>
                                                                                                                        <View style={[styles.service]}>
                                                                                                                                  <ImageBackground source={{ uri: service.produit.BACKGROUND_IMAGE }} style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                                                                                                                            <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 10 }} />
                                                                                                                                            <View style={styles.serviceIcon}>

                                                                                                                                                      <Image source={{ uri: service.produit.LOGO }} style={styles.serviceIconImage} />
                                                                                                                                            </View>
                                                                                                                                            <Text style={styles.serviceName}>{service.produit.NOM_ORGANISATION}</Text>
                                                                                                                                  </ImageBackground>
                                                                                                                        </View>
                                                                                                              </TouchableNativeFeedback>
                                                                                                    </View> : <View style={[styles.serviceContainer, { width: SERVICE_WIDTH, height: SERVICE_WIDTH }]} key={index}>
                                                                                                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} onPress={() => searchProduit(service)}>
                                                                                                                        <View style={[styles.service]}>
                                                                                                                                  <ImageBackground source={{ uri: service.produit.BACKGROUND_IMAGE }} style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                                                                                                                            <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 10 }} />
                                                                                                                                            <View style={styles.serviceIcon}>

                                                                                                                                                      <Image source={{ uri: service.produit.LOGO }} style={styles.serviceIconImage} />
                                                                                                                                            </View>
                                                                                                                                            <Text style={styles.serviceName}>{service.produit.NOM_ORGANISATION}</Text>
                                                                                                                                  </ImageBackground>
                                                                                                                        </View>
                                                                                                              </TouchableNativeFeedback>
                                                                                                    </View>

                                                                                )

                                                                      )
                                                            })}

                                                            <View style={[styles.serviceContainer, { width: SERVICE_WIDTH, height: SERVICE_WIDTH }]}>
                                                                      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} onPress={() => navigation.navigate("HomeAllServiceScreen")}>
                                                                                <View style={[styles.service]}>
                                                                                          <ImageBackground source={require("../../../assets/images/nouveau.png")} style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                                                                                    <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 10 }} />
                                                                                                    <View style={styles.serviceIcon}>
                                                                                                              <AntDesign name="plus" size={40} color="black" />
                                                                                                    </View>
                                                                                                    <Text style={styles.serviceName}>Demander le service</Text>
                                                                                          </ImageBackground>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            </View>

                                                  </View>
                                                  </>}
                                        </View>}
                              </View>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          loadingContainer: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
          },
          title: {
                    fontWeight: "bold",
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
          servicesContainer:  {
          },
})