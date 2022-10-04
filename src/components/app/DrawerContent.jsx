import React from "react"
import { Text, StyleSheet, View, ScrollView, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Image, StatusBar } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import { DrawerContentScrollView  } from '@react-navigation/drawer'
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector";
import { COLORS } from "../../styles/COLORS";

export default function DrawerContent() {
          const user = useSelector(userSelector)
          return (
                    <View style={styles.drawerContent}>
                              <TouchableNativeFeedback>
                                        <View style={styles.connectedUser}>
                                                  <View style={styles.imageContainer}>
                                                            <Image source={require('../../../assets/images/user.png')} style={styles.image} />
                                                  </View>
                                                  <View style={styles.userNames}>
                                                            <Text style={styles.fullName} numberOfLines={1}>{ "user.result.NOM" } { "user.result.PRENOM" }</Text>
                                                            <Text style={styles.email}>{ "user.result.EMAIL" }</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.separator} />
                              <DrawerContentScrollView style={styles.drawerScroller}>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple(COLORS.handleColor)}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden", backgroundColor: COLORS.handleColor }}>
                                                            <View style={styles.drawerItem}>
                                                                      <AntDesign name="home" size={27} color="#000" />
                                                                      <Text style={[styles.drawerItemLabel, { color: '#000' }]}>Produits et  services</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
                                                  <View style={{ borderRadius: 10, overflow: "hidden" }}>
                                                            <View style={styles.drawerItem}>
                                                                      <Feather name="shopping-cart" size={24} color="#777" />
                                                                      <Text style={styles.drawerItemLabel}>Commandes</Text>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
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
                                        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
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
          }
})