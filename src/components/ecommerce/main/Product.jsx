import React from 'react'
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';

export default function Product({ product, index, totalLength, fixMargins = false }) {
          const { width } = useWindowDimensions()
          const MAX_WIDTH = 200
          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
          const PRODUCT_HEIGHT = 270
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    height: PRODUCT_HEIGHT,
                    marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
                    marginRight: index == totalLength-1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
          }
          return (
                    <View key={index} style={[styles.product, additionStyles]}>
                              <View style={styles.imageCard}>
                                        <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.image} />
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                        <View style={styles.cardLike}>
                                                  <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                        </View>
                                        <View style={styles.cardLike2}>
                                                  <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                        </View>
                              </View>
                              <View style={styles.productNames}>
                                        <Text numberOfLines={2} style={styles.productName}>
                                                  {product.produit.NOM} ·
                                                  <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text>
                                        </Text>
                              </View>
                              {product.produit_partenaire.PRIX ? <Text style={{ color: "#F29558", fontWeight: "bold" }}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu</Text> : null}
                    </View>
          )
}

const styles = StyleSheet.create({
          product: {
                    maxWidth: 200
          },
          imageCard: {
                    borderRadius: 8,
                    height: "60%",
                    width: "100%"
          },
          image: {
                    height: "100%",
                    width: "100%",
                    borderRadius: 8,
                    resizeMode: 'contain'
          },
          cardLike: {
                    marginTop: 10,
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
          },
          cardLike2: {
                    marginTop: 10,
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 8
          },
          productName: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "400",
                    fontSize: 13         
          }
})