import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
import fetchApi from '../../../helpers/fetchApi'
import { Feather, Ionicons } from '@expo/vector-icons'; 
import { COLORS } from '../../../styles/COLORS'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Product from '../../../components/ecommerce/main/Product'
import { useCallback } from 'react'

/**
 * Un composant d'un onglet qui affiche les produits d'un partenaire
 * @author Dukizwe Darcie <darcy@mediabox.bi>
 * @date 10/01/2023
 * @returns 
 */
export default function ProductsTabScreen({ shop }) {
          const [products, setProducts] = useState([])
          const [loading, setLoading] = useState(true)
          const navigation = useNavigation()

          const renderProducts = ({ item: product, index}) => {
                    return (
                              <Product
                                        product={product}
                                        index={index}
                                        totalLength={products.length}
                              />
                    )
          }
          
          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        var url = `/partenaire/produit/${shop.ID_PARTENAIRE_SERVICE}`
                                        const produits = await fetchApi(url)
                                        setProducts(produits.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, []))
          return (
                    <>
                    {loading ? <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                              <View style={styles.container}>
                                         <View style={styles.loadingContainer}>
                                                  <ActivityIndicator size={"large"} color='#777' />
                                        </View>
                              </View>
                    </Tabs.ScrollView> : 
                              products.length == 0 ?
                              <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={styles.container}>
                                                  <View style={styles.emptyContainer}>
                                                            <Feather name="check-square" size={24} color="#777" />
                                                            <Text style={styles.emptyFeedback}>
                                                                      Votre stock est vide. Cliquez sur le bouton en bas pour ajouter un nouveau produit
                                                            </Text>
                                                  </View>
                                        </View>
                              </Tabs.ScrollView> : 
                              <Tabs.FlatList
                                        data={products}
                                        renderItem={renderProducts}
                                        contentContainerStyle={styles.products}
                              />
                    }
                    <TouchableNativeFeedback
                              background={TouchableNativeFeedback.Ripple('#C4C4C4', true)}
                              onPress={() => navigation.navigate('NewProductScreen', { shop })}>
                              <View style={styles.newProductBtn}>
                                        <Ionicons name="add" size={40} color="white" />
                              </View>
                    </TouchableNativeFeedback>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
          },
          loadingContainer: {
                    flex: 1,
                    marginTop: 30
          },
          emptyContainer: {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30
          },
          emptyFeedback: {
                    marginTop: 10,
                    color: '#777',
                    textAlign: "center",
                    paddingHorizontal: 30
          },
          newProductBtn: {
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    backgroundColor: COLORS.ecommerceOrange,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#fff",
                    position: 'absolute',
                    bottom: 20,
                    right: 20
          },
          products: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap'
          }
})