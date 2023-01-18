import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback, ScrollView, StatusBar } from "react-native"
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import ProductImages from "../../components/ecommerce/details/ProductImages";

export default function ProductDetailsScreen() {
          const navigation = useNavigation()
          const route = useRoute()
          const { product } = route.params
          var IMAGES = [
                    product.IMAGE_1 ? product.IMAGE_1 : undefined,
                    product.IMAGE_2 ? product.IMAGE_2 : undefined,
                    product.IMAGE_3 ? product.IMAGE_3 : undefined,
          ]
          return (
                    <>
                              <View style={{ backgroundColor: '#F1F1F1', marginTop: 0, flex: 1 }}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableNativeFeedback
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                                                            onPress={() => navigation.goBack()}>
                                                            <View style={[styles.headerBtn]}>
                                                                      <Ionicons name="chevron-back" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <TouchableNativeFeedback
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)} >
                                                            <View style={[styles.headerBtn]}>
                                                                      <Feather name="more-horizontal" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                                        <ProductImages images={IMAGES} product={product} />
                                        <View style={{
                                                  backgroundColor: "white", flex: 1, padding: 10
                                        }}>
                                                  <View style={styles.productNames}>
                                                            <View>
                                                                      <Text style={styles.productName}>
                                                                                {product.NOM}
                                                                      </Text>
                                                            </View>
                                                            <View>
                                                                      <View>
                                                                                <Text style={styles.productPrice}>
                                                                                          {product.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU
                                                                                </Text>
                                                                      </View>
                                                                      {false && <View style={{ flexDirection: "row" }}>
                                                                                <AntDesign name="star" size={15} color="#EFC519" />
                                                                                <AntDesign name="star" size={15} color="#EFC519" />
                                                                                <AntDesign name="star" size={15} color="#EFC519" />
                                                                                <AntDesign name="star" size={15} color="#EFC519" />
                                                                                <AntDesign name="staro" size={15} color="#EFC519" />
                                                                      </View>}
                                                            </View>
                                                  </View>
                                                  <ScrollView>
                                                            <View>
                                                                      {product.DESCRIPTION ? <View>
                                                                                <Text style={styles.productDescription}>
                                                                                          {product.DESCRIPTION}
                                                                                </Text>
                                                                      </View> : null}
                                                            </View>
                                                  </ScrollView>
                                        </View>
                              </View>
                    </>
          )
}
const styles = StyleSheet.create({
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: StatusBar.currentHeight,
                    height: 60,
                    backgroundColor: '#F1F1F1',
          },
          productNames: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10
          },
          productName: {
                    fontWeight: "bold",
                    fontSize: 18,
                    opacity: 0.7,
                    color: COLORS.ecommercePrimaryColor
          },
          productPrice: {
                    fontWeight: "bold",
                    fontSize: 15,
                    marginLeft: "1%",
                    color: COLORS.ecommercePrimaryColor,
                    opacity: 0.7
          },
          shop: {
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-between",
                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginBottom: "-1%"
          },
          shopLeft: {
                    flexDirection: "row",
                    alignItems: 'center'
          },
          shopIcon: {
                    width: 40,
                    height: 40,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: -40

          },
          shopOwner: {
                    marginLeft: 10,
                    marginTop: "-6%",
          },
          productSeller: {
                    fontWeight: "bold",
                    marginTop: "-30%",
          },
          shopAdress: {
                    color: '#777',
                    fontSize: 13
          },
          productDescription: {
                    color: '#777',
                    fontSize: 15,
                    lineHeight: 22
          },
          headerBtn: {
                    padding: 10
          }
})
