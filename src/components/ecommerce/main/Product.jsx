import React, { useCallback, useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import { Fontisto, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../styles/COLORS';
import moment from 'moment'

export default function Product({ product, index, totalLength, fixMargins = false, onRemove,shop ,serviceResto,serviceEco}) {
          const navigation = useNavigation()
          const { width } = useWindowDimensions()
          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = (width / 2) - 10
          const PRODUCT_HEIGHT = 270
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    height: PRODUCT_HEIGHT,
                    // marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
                    // marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
          }
          return (
                    <TouchableWithoutFeedback onPress={() => navigation.push("ProductDetailsScreen", { product: product, shop:shop, serviceResto:serviceResto,  serviceEco:serviceEco })} >
                    <View key={index} style={[styles.product, additionStyles,]}>
                              <View style={styles.imageCard}>
                                        <Image source={{ uri: product.IMAGE_1 }} style={styles.image} />
                              </View>
                              <View style={styles.productNames}>
                                        <Text numberOfLines={2} style={styles.productName}>
                                                  <Text numberOfLines={2} style={styles.productName}>{product.NOM}</Text>
                                        </Text>
                              </View>
                              {product.PRIX ? <Text style={styles.price}>{product.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU</Text> : null}
                              {shop.ID_SERVICE==1 ? <Text style={styles.piecesCount}>
                                        { product.quantity } pièce{product.quantity > 0 && 's'}
                              </Text>:null}
                              <Text style={styles.date}>
                                        {moment(product.DATE_INSERTION).calendar(null, {
                                                  sameDay: `[Auj]`,
                                                  lastDay: `[Hier]`,
                                                  nextDay: 'DD-MM-YYYY',
                                                  lastWeek: 'DD-MM-YYYY',
                                                  sameElse: 'DD-MM-YYYY',
                                        })}, {moment(product.DATE_INSERTION).format('HH:mm')}
                              </Text>
                    </View>
                    </TouchableWithoutFeedback>
          )
}

const styles = StyleSheet.create({
          product: {
                    maxWidth: 240,
                    marginHorizontal: 5,
                    backgroundColor: 'white',
                    elevation: 5,
                    shadowColor: '#919191',
                    borderRadius: 10,
                    padding: 5,
                    marginTop: "2%"
          },
          imageCard: {
                    borderRadius: 8,
                    height: "55%",
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
          cartBtn: {
                    marginTop: 10,
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 8
          },
          badge: {
                    minWidth: 25,
                    minHeight: 20,
                    paddingHorizontal: 5,
                    borderRadius: 20,
                    backgroundColor: COLORS.ecommerceRed,
                    position: 'absolute',
                    top: -5,
                    right: -10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          badgeText: {
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#FFF',
                    fontWeight: "bold"
          },
          productNames: {
                    marginTop: 5
          },
          productName: {
                    color: '#000',
                    fontWeight: "400",
          },
          price: {
                    fontWeight: 'bold',
                    color: COLORS.ecommercePrimaryColor
          },
          piecesCount: {
                    color: COLORS.ecommerceOrange,
                    fontSize: 11,
                    fontWeight: 'bold'
          },
          date: {
                    color: '#777',
                    fontSize: 10,
                    position: "absolute",
                    bottom: 5,
                    left: 10
          }
})