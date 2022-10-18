import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Image, useWindowDimensions, ImageBackground, Vibration, TouchableNativeFeedback } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { COLORS } from '../../styles/COLORS'
import fetchApi from "../../helpers/fetchApi";
import Loading from './Loading'

const SERVICES = [{
          id_service: 1,
          title: "Achat de produits",
          imageBg: require('../../../assets/images/ecommerce.png'),
          icon: require('../../../assets/images/ecommerce-icon.png'),
          route: "EcommerceNavigator",
          lottie:  require('../../../assets/lotties/ecommerce.json'),
          description: "Vous deviendrez un marchand! Publiez vos produits et gérer votre stock",
          noRegisteredDirection: "InscriptionPartenaireScreen"
}, {
          id_service: 2,
          title: "Restauration",
          imageBg: require('../../../assets/images/resto.jpg'),
          icon: require('../../../assets/images/resto-icon.png'),
          route: "RestaurantNavigator",
          lottie:  require('../../../assets/lotties/resto.json'),
          description: "Créez votre restaurant virtuel! préparer vos commandes simplement",
          noRegisteredDirection: "InscriptionPartenaireScreen"
}, {
          id_service: 3,
          title: "Evénement",
          imageBg: require('../../../assets/images/event.jpg'),
          icon: require('../../../assets/images/event-icon.png')
}, {
          id_service: 4,
          title: "Services à la personne",
          imageBg: require('../../../assets/images/person.jpg'),
          icon: require('../../../assets/images/person-icon.png')
}, {
          id_service: 5,
          title: "Hôtel",
          imageBg: require('../../../assets/images/hotel.jpg'),
          icon: require('../../../assets/images/hotel-icon.png')
}, {
          id_service: 6,
          title: "Publicité et campagne",
          imageBg: require('../../../assets/images/pub.jpg'),
          icon: require('../../../assets/images/pub-icon.png')
}]
export default function ServicesCategories() {
          const { width, height } = useWindowDimensions()
          const SERVICE_MARGIN = 40
          const SERVICE_WIDTH = (width / 2)
          const modalizeRef = useRef(null)
          const navigation = useNavigation()
          const [loading, setLoading] = useState(false)
          const [services, setServices] = useState([])

          const search = async (service) => {
                    setLoading(true)
                    const services = service
                    try {
                              const service = await fetchApi(`/service/search/${services.id_service}`)
                              if (service.result > 0) {
                                        navigation.navigate(services.route)
                              }
                              else {
                                        navigation.navigate("ServiceNotFoundScreen", { service: services })
                              }
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoading(false)
                    }
          }

          useEffect(()=>{
            (async()=>{
              try{
                const partenaire = await fetchApi("/service/partenaire")
                setServices(partenaire)
                console.log(partenaire)
              }catch(error){
                console.log(error)
              } finally{

              }
            })()
          },[])


          useEffect(() => {
                    modalizeRef.current?.open()
          }, [modalizeRef])
          return (
                    <>
                    {loading && <Loading />}
                    <Modalize
                              ref={modalizeRef}
                              alwaysOpen={(height / 2) + 150}
                              modalStyle={styles.servicesContainer}
                              handleStyle={{ backgroundColor: '#D6ECEC' }}
                              handlePosition="inside"
                              withOverlay
                              dragToss={1}
                    >
                              <View style={{}}>
                                        <Text style={styles.title}>Catégories de service</Text>
                                        <View style={styles.services}>
                                                  {SERVICES.map((service, index) => {

                                                            return (
                                                                      <View style={[styles.serviceContainer, { width: SERVICE_WIDTH, height: SERVICE_WIDTH }]} key={index.toString()}>
                                                                                {/* <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} useForeground onPress={() => navigation.navigate(service.route)}> */}
                                                                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")} useForeground onPress={() => search(service)}>

                                                                                          <View style={[styles.service]}>
                                                                                                    <ImageBackground source={service.imageBg} style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                                                                                              <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 10 }} />
                                                                                                              <View style={styles.serviceIcon}>
                                                                                                                        <Image source={service.icon} style={styles.serviceIconImage} />
                                                                                                              </View>
                                                                                                              <Text style={styles.serviceName}>{service.title}</Text>
                                                                                                    </ImageBackground>
                                                                                          </View>
                                                                                </TouchableNativeFeedback>
                                                                      </View>
                                                            )
                                                  })}
                                        </View >
                              </View >
                    </Modalize>
                    </>
          )
}

const styles = StyleSheet.create({
          servicesContainer: {
                    elevation: 10,
                    shadowColor: '#000',
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
          },
          handle: {
                    height: 5,
                    width: 50,
                    backgroundColor: '#D6ECEC',
                    alignSelf: 'center',
                    marginBottom: 20,
                    borderRadius: 5
          },
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
})