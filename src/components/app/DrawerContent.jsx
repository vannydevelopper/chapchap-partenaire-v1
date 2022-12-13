import React, { useCallback, useState } from "react"
import { Text, StyleSheet, View, ScrollView, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Image, StatusBar } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, FontAwesome, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector";
import { COLORS } from "../../styles/COLORS";
import { unsetUserAction } from "../../store/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";

export default function DrawerContent({ state, navigation, descriptors }) {
          const user = useSelector(userSelector)
          const dispacth = useDispatch()
          const [services, setServices] = useState([])

          const [showServiceCommands, setShowCommandService] = useState(false)

          const onLogOut = async () => {
                    await AsyncStorage.removeItem('user')
                    dispacth(unsetUserAction())
          }

          const onCommandeToggle = () => {
                    setShowCommandService(t => !t)
          }

          const onServicePress = service => {
                    if (service.ID_SERVICE == 1) {
                              navigation.navigate('CommandeEmiseScreen')
                    }
                    else if (service.ID_SERVICE == 2) {
                        navigation.navigate('CommandeEmiseScreen')
              }
                    navigation.dispatch(DrawerActions.closeDrawer)
          }
          const handlePress = routeName => {
                    navigation.navigate(routeName)
                    navigation.dispatch(DrawerActions.closeDrawer)
          }

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        const svs = await fetchApi('/partenaire/service')
                                        setServices(svs.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {

                              }
                    })()
          }, [showServiceCommands]))
          return (
                    <View style={styles.drawerContent}>
                              <TouchableNativeFeedback>
                                        <View style={styles.connectedUser}>
                                                  <View style={styles.imageContainer}>
                                                            <Image source={require('../../../assets/images/user.png')} style={styles.image} />
                                                  </View>
                                                  <View style={styles.userNames}>
                                                            <Text style={styles.fullName} numberOfLines={1}>{user.result.NOM} {user.result.PRENOM}</Text>
                                                            <Text style={styles.email}>{user.result.EMAIL}</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.separator} />
                              <DrawerContentScrollView style={styles.drawerScroller}>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple(COLORS.handleColor)} onPress={() => handlePress('HomeScreen')}>
                                                  <View style={[{ borderRadius: 10, overflow: "hidden" }, (state.index == 0 || state.index == 1 || state.index == 2) && { backgroundColor: COLORS.handleColor }]}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="home" size={27} color="#000" />
                                                                      <Text style={[styles.drawerItemLabel, (state.index == 0 || state.index == 1 || state.index == 2) && { color: '#000' }]}>Produits et  services</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')} onPress={onCommandeToggle}>
                                                  <View style={[{ borderRadius: 10, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                                                            <View style={styles.drawerItem}>
                                                                      <Feather name="shopping-cart" size={24} color="#777" />
                                                                      <Text style={[styles.drawerItemLabel, state.index == 3 && { color: '#000' }]}>Commandes</Text>
                                                            </View>
                                                            {showServiceCommands ? <Ionicons name="caret-up" size={24} color="#777" /> :
                                                                      <Ionicons name="caret-down" size={24} color="#777" />}
                                                  </View>
                                        </TouchableNativeFeedback>
                                        {showServiceCommands && <View style={styles.services}>
                                                  {services.map((service, index) => {
                                                            return (
                                                                      <TouchableOpacity key={index} onPress={() => onServicePress(service)} style={{ borderRadius: 10 }}>
                                                                                <View style={[styles.service,  (state.index == 3 && service.ID_SERVICE == 1) && { backgroundColor: COLORS.handleColor }]}>
                                                                                          <View style={styles.serviceImageContainer}>
                                                                                                    <Image source={{ uri: service.LOGO }} style={styles.serviceImage} />
                                                                                          </View>
                                                                                          <Text style={[styles.serviceName, (state.index == 3 && service.ID_SERVICE == 1) && { color: '#000' }]}>{service.NOM_ORGANISATION ?? service.NOM_SERVICE}</Text>
                                                                                </View>
                                                                      </TouchableOpacity>
                                                            )
                                                  })}
                                        </View>}
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="hearto" size={24} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Wishlist</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <View style={[styles.separator, { marginVertical: 20 }]} />
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <Feather name="menu" size={24} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Condition d'utilisation</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="setting" size={24} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Paramètres</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="infocirlceo" size={24} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Infos et assistance</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')} onPress={onLogOut}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <MaterialIcons name="logout" size={20} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Déconnexion</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </DrawerContentScrollView>
                    </View>
          )

}
const styles = StyleSheet.create({
          separator: {
                    height: 2,
                    width: "95%",
                    backgroundColor: COLORS.handleColor,
                    alignSelf: "center"
          },
          drawerContent: {
                    backgroundColor: '#FFF',
                    flex: 1,
                    marginTop: StatusBar.currentHeight,
          },
          connectedUser: {
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 15
          },
          imageContainer: {
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.handleColor,
                    borderRadius: 10,
                    padding: 5
          },
          image: {
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    resizeMode: "center"
          },
          userNames: {
                    marginLeft: 10
          },
          fullName: {
                    fontWeight: "bold",
                    fontSize: 16
          },
          email: {
                    color: '#777',
                    fontSize: 13
          },
          drawerScroller: {
                    paddingHorizontal: 10
          },
          drawerItem: {
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    overflow: "hidden"
          },
          drawerItemLabel: {
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: '#777'
          },
          services: {
                    paddingLeft: 20
          },
          service: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    padding: 10,
                    borderRadius: 10
          },
          serviceImageContainer: {
                    width: 35,
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    borderColor: COLORS.handleColor,
                    borderWidth: 2
          },
          serviceImage: {
                    width: "100%",
                    height: "100%",
                    borderRadius: 10
          },
          serviceName: {
                    color: '#777',
                    marginLeft: 10,
                    fontSize: 13
          }
})