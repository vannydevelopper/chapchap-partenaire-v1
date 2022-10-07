import React from 'react'
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableNativeFeedback } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

export default function Product({ product, index, totalLength, fixMargins = false }) {
          const { width } = useWindowDimensions()
          const MAX_WIDTH = 200
          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
          const PRODUCT_HEIGHT = 360
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    maxHeight: PRODUCT_HEIGHT,
                    marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
                    marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
          }
          const navigation =useNavigation()
          const detail = async (detail) => {
            const details=detail
            navigation.navigate("ProductDetail")   
            } 
        
          return (
        
                    <View key={index} style={[styles.product, additionStyles]}>
                              <View style={styles.productHeader}>
                                        <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text>
                                        <Text numberOfLines={2} style={styles.productCategory}>
                                                  {product.produit.NOM}
                                        </Text>
                              </View>
                              <View style={styles.imageCard}>
                                
                              
                              <TouchableOpacity onPress={() => detail(product)}>
                                        <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.image} />
                              </TouchableOpacity>
                              </View>
                              {product.produit_partenaire.PRIX ? <Text style={styles.price}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                              <View style={styles.details}>
                                        <View style={styles.detail}>
                                                  <Text style={styles.detailLabel}>Quantité total</Text>
                                                  <Text style={styles.detailValue}>{ product.stock.QUANTITE_STOCKE }</Text>
                                        </View>
                                        <View style={styles.detail}>
                                                  <Text style={styles.detailLabel}>Vendus</Text>
                                                  <Text style={styles.detailValue}>{ product.stock.QUANTITE_VENDUE }</Text>
                                        </View>
                                        <View style={styles.detail}>
                                                  <Text style={styles.detailLabel}>Restante</Text>
                                                  <Text style={[styles.detailValue, { fontSize: 18 }]}>{ product.stock.QUANTITE_RESTANTE }</Text>
                                        </View>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          product: {
                    maxWidth: 200,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 5,
                    marginTop: 10,
          },
          productHeader: {
                    padding: 5
          },
          productName: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold"
          },
          productCategory: {
                    fontSize: 13,
                    color: '#777',
                    marginLeft: 5,
          },
          imageCard: {
                    height: "40%",
                    width: "100%"
          },
          image: {
                    height: "100%",
                    width: "100%",
                    resizeMode: 'contain'
          },
          price: {
                    color: '#F29558',
                    fontWeight: "bold",
                    padding: 5
          },
          details: {
                    paddingHorizontal: 5
          },
          detail: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
          },
          detailLabel: {
                    color: '#c4bebe',
                    fontSize: 13,
                    fontWeight: "bold"
          },
          detailValue: {
                    fontWeight: "bold"
          }
})