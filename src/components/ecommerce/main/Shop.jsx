import React from 'react'
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';

export default function Shop({ product, index, totalLength }) {
          const { width } = useWindowDimensions()
          const MAX_WIDTH = 200
          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
          const PRODUCT_HEIGHT = 200
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    height: PRODUCT_HEIGHT,
                    marginLeft: index > 0 ? PRODUCT_MARGIN : 0,
                    marginRight: index == totalLength-1 ? PRODUCT_MARGIN : 0
          }
          return (
                    <View key={index} style={[styles.shop, additionStyles]}>
                              <View style={styles.imageCard}>
                                        <Image source={{ uri: product.LOGO }} style={styles.image} />
                              </View>
                                        <Text numberOfLines={2} style={styles.shopName}>
                                        {product.produit.NOM}
                              </Text>
                              <Text numberOfLines={2} style={styles.shopCategory}> {product.produit_partenaire.NOM}</Text>
                    </View>
          )
}

const styles = StyleSheet.create({
          shop: {
                    maxWidth: 200,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 8,
                    padding: 10,
                    justifyContent: 'space-between'
          },
          imageCard: {
                    borderRadius: 10,
                    height: "65%",
                    width: "90%",
                    borderRadius: 10,
                    backgroundColor: '#FFF',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          image: {
                    height: "100%",
                    width: "100%",
                    borderRadius: 10,
                    resizeMode: 'contain',
          },
          shopName: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    fontSize: 13,
                    textAlign: 'center'
          },
          shopCategory: {
                    textAlign: 'center',
                    color: '#777',
                    fontSize: 12
          }
})