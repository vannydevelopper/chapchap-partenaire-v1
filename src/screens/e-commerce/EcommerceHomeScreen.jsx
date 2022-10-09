import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons, Octicons, Feather } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import Shops from "../../components/ecommerce/home/Shops";
import Product from "../../components/ecommerce/main/Product";
import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";

export default function EcommerceHomeScreen() {
          const { height } = useWindowDimensions()
          
          const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
          const [products, setProducts] = useState([])

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        var url = "/partenaire/produit"
                                        const produits = await fetchApi(url)
                                        setProducts(produits.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setFirstLoadingProducts(false)
                              }
                    })()
          }, []))

          const navigation = useNavigation()

          return (
                    <View style={styles.container}>
                              <View style={styles.cardHeader}>
                                        <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                                  <View style={styles.menuOpenerLine} />
                                                  <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                  <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                        </TouchableOpacity>
                                        <View style={{ marginTop: 25 }}>
                                                  <Octicons name="bell" size={24} color={COLORS.ecommercePrimaryColor} />
                                        </View>
                              </View>
                              <ScrollView style={styles.cardOrginal}>
                                        <Text style={[styles.titlePrincipal, products.length == 0 && { textAlign: "center" }]}>Vos produits</Text>
                                        {products.length > 0 && <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
                                                  <View style={styles.searchSection}>
                                                            <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            <TextInput
                                                                      style={styles.input}
                                                                      placeholder="Recherche..."
                                                            />
                                                  </View>
                                                  <View style={styles.cardRecherche}>
                                                            <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                                                  </View>
                                        </View>}
                                        {/* {(loadingCategories || firstLoadingProducts) ? <CategoriesSkeletons /> :
                                        <View>
                                                  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 10 }}>
                                                            {categories.map((categorie, index) => {
                                                                      return (
                                                                                <TouchableOpacity key={index} onPress={() => onCategoryPress(categorie)}>
                                                                                          <View style={{ alignContent: "center", alignItems: "center" }}>
                                                                                                    <View style={[styles.cardPhoto, { backgroundColor: categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT ? COLORS.handleColor : "#DFE1E9" }]}>
                                                                                                              <Image source={{ uri: categorie.IMAGE }} style={styles.DataImageCategorie} />
                                                                                                    </View>
                                                                                                    <Text style={[{ fontSize: 12, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                                                                          </View>
                                                                                </TouchableOpacity>
                                                                      )
                                                            })}
                                                  </View>
                                        </View>}

                                        {selectedCategorie && ((loadingSubCategories || loadingProducts) ? <SubCategoriesSkeletons /> : <SubCategories
                                                  sousCategories={sousCategories}
                                                  selectedItemSousCategories={selectedItemSousCategories}
                                                  selectedsousCategories={selectedsousCategories}
                                        />)} */}
                                        {firstLoadingProducts ? <HomeProductsSkeletons wrap /> :
                                                  products.length == 0 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                                                            <Feather name="check-square" size={24} color="#777" />
                                                            <Text style={{ color: '#777', paddingHorizontal: 50, textAlign: "center", marginTop: 10  }}>
                                                                      Votre stock est vide. Cliquez sur le bouton en dessous pour ajouter un nouveau produit
                                                            </Text>
                                                            </View> : <View style={styles.products}>
                                                            {products.map((product, index) => {
                                                                      return (
                                                                                <Product
                                                                                          product={product}
                                                                                          index={index}
                                                                                          totalLength={products.length}
                                                                                          key={index}
                                                                                          fixMargins
                                                                                />
                                                                      )
                                                            })}
                                                  </View>
                                        }
                              </ScrollView>
                              <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewProductSreen')}>
                                        <Text style={styles.addBtnText}>Nouveau produit</Text>
                              </TouchableOpacity>
                    </View>
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
                    paddingHorizontal: 10,
                    height: 88
          },
          menuOpener: {
                    marginTop: 25
          },
          menuOpenerLine: {
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    marginTop: 5
          },
          imgBackground: {
                    flex: 1,
                    width: '100%',
                    height: "100%"
          },
          cardOrginal: {
          },
          titlePrincipal: {
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 12,
                    color: COLORS.ecommercePrimaryColor,
                    marginHorizontal: 10
          },

          searchSection: {
                    flexDirection: "row",
                    marginTop: 10,
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    backgroundColor: "#D7D9E4",
                    width: "84%",
                    height: 50,
                    paddingHorizontal: 10
          },
          input: {
                    flex: 1,
                    marginLeft: 10
          },
          cardRecherche: {
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: "#EF4255",
                    marginTop: 8,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
          },

          DataImageCategorie: {
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: 10,
          },
          cardPhoto1: {
                    marginTop: 10,
                    width: 50,
                    height: 50,
                    backgroundColor: "#DFE1E9",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          cardPhoto: {
                    marginTop: 10,
                    width: 50,
                    height: 50,
                    //backgroundColor: "#242F68",
                    backgroundColor: "#DFE1E9",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          productsHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10
          },
          title: {
                    fontWeight: 'bold'
          },
          products: {
                    flexDirection: 'row',
                    flexWrap: 'wrap'
          },
          addBtn: {
                    paddingVertical: 10,
                    minWidth: "90%",
                    alignSelf: "center",
                    backgroundColor: COLORS.ecommerceOrange,
                    borderRadius: 10,
                    paddingVertical: 15,
                    marginBottom: 10,
          },
          addBtnText: {
                    color: '#FFF',
                    fontWeight: "bold",
                    textAlign: "center",
          }
})