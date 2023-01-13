import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
import fetchApi from '../../../helpers/fetchApi'
import { Feather } from '@expo/vector-icons'; 

export default function ProductsTabScreen({ shop }) {
          const [products, setProducts] = useState([])
          const [loading, setLoading] = useState(true)
          useEffect(() => {
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
          }, [])
          return (
                    <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                              <View style={styles.container}>
                                        {loading ? <View style={styles.loadingContainer}>
                                                  <ActivityIndicator size={"large"} color='#777' />
                                        </View> :
                                        products.length == 0 ? <View style={styles.emptyContainer}>
                                                  <Feather name="check-square" size={24} color="#777" />
                                                  <Text style={styles.emptyFeedback}>
                                                            Votre stock est vide. Cliquez sur le bouton en dessous pour ajouter un nouveau produit
                                                  </Text>
                                        </View> :
                                        <View>
                                        </View>}
                              </View>
                    </Tabs.ScrollView>
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
                    textAlign: "center"
          }
})