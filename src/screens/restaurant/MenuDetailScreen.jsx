import React, { useState } from "react"
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from "react-native"
import { Ionicons, AntDesign, Entypo, Foundation } from '@expo/vector-icons';
export default function MenuDetailScreen() {
          const [nombre, setNombre] = useState(0);
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
                    <ScrollView>
                    <View style={{ marginLeft: 30, marginTop: 50, marginHorizontal: 20 }}>
                              <View style={{ width: '100%', marginTop: 10 }}>
                                        <Image source={require('../../../assets/images/event.jpg')} style={{ ...styles.imagePrincipal }} />
                              </View>

                              <Ionicons name="ios-arrow-back-outline" size={24} color="white" style={{ ...styles.icon, marginTop: 0 }} />
                              <Entypo name="shopping-cart" size={24} color="white" style={{ ...styles.icon1, marginTop: 0 }} />
                              <View style={styles.cardOK}>
                                        <Text style={{ color: "white", fontSize: 5 }}>5</Text>
                              </View>

                              <View style={{ marginTop: 50 }} >
                                        <Text style={styles.text} numberOfLines={2}>Riz Tropical</Text>
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
                                        <View style={{ marginTop: -5 }}>
                                                  <Text style={styles.textFbu}>12.000 Fbu</Text>
                                        </View>
                              </View>
                              <View style={{ marginTop: 50 }} >
                                        <Text style={styles.text1} numberOfLines={2}>Riz frit avec pomme de terre</Text>
                              </View>
                              <View style={{ marginTop: 15 }} >
                                        <Text style={styles.txtDisplay}>
                                                  Les pommes de terre relevent la tradictionnelle recette de riz frit
                                                  et lui ajoutent de la valeur nutritive;
                                                  Ce plat se cuisine en 30minutes au moins
                                        </Text>
                              </View>
                              <View >
                                        <Text style={styles.txtDispla}>Nombres de plat</Text>
                              </View>
                              <View>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-around', }}>

                                                  <TouchableOpacity
                                                            onPress={mouveNumber}
                                                            style={styles.carre1}>
                                                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>-</Text>

                                                  </TouchableOpacity>
                                                  <View style={styles.carre2}>
                                                            <TextInput
                                                                      disabled={nombre == ''}

                                                                      keyboardType="phone-pad"
                                                                      defaultValue="0"
                                                                      onChangeText={(nb) => setNombre(nb)}
                                                                      value={nombre.toString()}
                                                                      style={{ textAlign: 'center' }}></TextInput>

                                                  </View>

                                                  <TouchableOpacity onPress={addNumber} style={styles.carre1}>
                                                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>+</Text>

                                                  </TouchableOpacity>

                                        </View>
                              </View>
                              <View>
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
                              </View>
                    </View>
        </ScrollView >

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
})
