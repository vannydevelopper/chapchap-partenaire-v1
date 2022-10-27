import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { Octicons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import LottieView from 'lottie-react-native';

export default function ServiceNotFoundScreen() {
          const { height } = useWindowDimensions()
          const navigation = useNavigation()
          const route = useRoute()
          const { id_service,service } = route.params

          const onRequestPress = () => {
                    navigation.navigate(service.noRegisteredDirection, { id_service,service})
                // navigation.navigate("AccueilSearchProduitScreen")
          }
          return (
                    <>
                              <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                              <View style={styles.imgBackground}>
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
                                        <ScrollView style={styles.cardOrginal}>
                                                  <Text style={styles.title}>{service.title}</Text>
                                                  <LottieView style={{ width: "100%", transform: [{ scale: 0.9 }] }} source={service.lottie} autoPlay speed={1.8} />
                                                  <Text style={styles.desciption}>
                                                            {service.description}
                                                  </Text>
                                                  <TouchableOpacity useForeground activeOpacity={0.7} onPress={onRequestPress}>
                                                            <View style={styles.addBtn}>
                                                                      <Text style={[styles.addBtnText]}>
                                                                                Demander le service
                                                                      </Text>
                                                            </View>
                                                  </TouchableOpacity>
                                        </ScrollView>
                              </View>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
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
          imgBackground: {
                    flex: 1,
                    width: '100%',
                    height: "100%"
          },
          cardOrginal: {
          },
          desciption: {
                    fontSize: 16,
                    color: '#777',
                    paddingHorizontal: 20,
                    textAlign: "center"
          },
          title: {
                    fontWeight: 'bold',
                    fontSize: 25,
                    fontWeight: "bold",
                    marginBottom: 12,
                    color: COLORS.ecommercePrimaryColor,
                    margin: 20,
                    textAlign: "center"
          },
          products: {
                    flexDirection: 'row',
                    flexWrap: 'wrap'
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
})