import React, { useCallback, useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
          Image,
          View,
          StyleSheet,
          Text,
          TouchableOpacity,
          TouchableNativeFeedback,
          TextInput,
          ScrollView,
          StatusBar,
          Modal,
          useWindowDimensions,
} from 'react-native'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import fetchApi from '../../helpers/fetchApi'
import Product from '../../components/ecommerce/main/Product'
import { Entypo } from '@expo/vector-icons'
import { COLORS } from '../../styles/COLORS'
import { useRef } from 'react'
import { HomeProductsSkeletons } from '../../components/ecommerce/skeletons/Skeletons'
import { Octicons } from '@expo/vector-icons'
import ProductImages from '../../components/ecommerce/details/ProductImages'
export default function ProductDetailScreen() {
          const navigation = useNavigation()
          const route = useRoute()
          const { width } = useWindowDimensions()
          const { detail } = route.params

          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = width / 2 - PRODUCT_MARGIN - 10
          const PRODUCT_HEIGHT = 270
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    height: PRODUCT_HEIGHT,
                    //     marginLeft: index > 0 ? PRODUCT_MARGIN : fixMargins ? PRODUCT_MARGIN : 0,
                    //     marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : fixMargins ? 0 : 0,
          }

          const [loadingShopProducts, setLoadingShopProducts] = useState(true)
          const [shopProducts, setShopProducts] = useState([])

          const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true)
          const [similarProducs, setSimilarProducts] = useState([])

          const modalizeRef = useRef(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

          const productInCart = null

          const onCartPress = () => {
                    setIsOpen(true)
                    modalizeRef.current?.open()
          }

          const onCloseAddToCart = () => {
                    modalizeRef.current?.close()
          }

          var IMAGES = [
                    detail.produit_partenaire.IMAGE_1 ? detail.produit_partenaire.IMAGE_1 : undefined,
                    detail.produit_partenaire.IMAGE_2 ? detail.produit_partenaire.IMAGE_2 : undefined,
                    detail.produit_partenaire.IMAGE_3 ? detail.produit_partenaire.IMAGE_3 : undefined,
          ]

          return (
                    <>
                              <View style={{ marginTop: 0, flex: 1 }}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableOpacity onPress={() => navigation.goBack()}>
                                                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                  </TouchableOpacity>
                                                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                                      <Entypo name="dots-three-vertical" size={24} color="black" />
                                                            </TouchableOpacity>
                                                  </View>
                                        </View>
                                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                                  <ProductImages images={IMAGES} />
                                                  <View
                                                            style={{
                                                                      flexDirection: 'row',
                                                                      alignItems: 'center',
                                                                      justifyContent: 'space-between',
                                                                      paddingHorizontal: 10,
                                                                      marginTop: 10,
                                                            }}
                                                  >
                                                            <View>
                                                                      <TouchableOpacity style={styles.category}>
                                                                                <Entypo name="shopping-cart" size={24} color={COLORS.primary} />
                                                                                <Text style={styles.categoryName} numberOfLines={2}>
                                                                                          {detail.categorie.NOM}
                                                                                </Text>
                                                                      </TouchableOpacity>
                                                                      <View style={styles.productNames}>
                                                                                <Text style={styles.productName}>
                                                                                          {detail.produit.NOM} ·
                                                                                          <Text numberOfLines={2} style={styles.productName}>
                                                                                                    {' '}
                                                                                                    {detail.produit_partenaire.NOM}{' '}
                                                                                          </Text>
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                            <View style={styles.shareBtn}>
                                                                      <AntDesign name="sharealt" size={20} color={COLORS.primary} />
                                                            </View>
                                                  </View>
                                                  <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                                                            <Text style={styles.productDescription}>
                                                                      {detail.produit_partenaire.DESCRIPTION}
                                                            </Text>
                                                  </View>
                                                  <View
                                                            style={{
                                                                      flexDirection: 'row',
                                                                      justifyContent: 'center',
                                                                      flexWrap: 'wrap',
                                                            }}
                                                  >
                                                            <View key={1} style={[styles.product, additionStyles]}>
                                                                      <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                                                                                <Text style={styles.quantite}>QUANTITE STOCK</Text>
                                                                                <Text style={styles.valeur}> {detail.stock.QUANTITE_STOCKE} </Text>
                                                                      </View>
                                                            </View>
                                                            <View key={2} style={[styles.product, additionStyles]}>
                                                                      <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                                                                                <Text style={styles.quantite}>QUANTITE RESTANTE</Text>
                                                                                <Text style={styles.valeur}> {detail.stock.QUANTITE_RESTANTE} </Text>
                                                                      </View>
                                                            </View>
                                                            <View key={3} style={[styles.product, additionStyles]}>
                                                                      <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                                                                                <Text style={styles.quantite}>QUANTITE VENDUE</Text>
                                                                                <Text style={styles.valeur}> {detail.stock.QUANTITE_VENDUE} </Text>
                                                                      </View>
                                                            </View>
                                                  </View>

                                        </ScrollView>
                              </View>
                              <View style={styles.productFooter}>
                                        {detail.produit_partenaire.PRIX ? (
                                                  <Text style={styles.productPrice}>
                                                            {detail.produit_partenaire.PRIX.toString().replace(
                                                                      /\B(?=(\d{3})+(?!\d))/g,
                                                                      ' ',
                                                            )}{' '}
                                                            Fbu
                                                  </Text>
                                        ) : null}
                                        <TouchableOpacity style={[styles.addCartBtn]} onPress={onCartPress}>
                                                  <>
                                                            <View>
                                                                      <Ionicons name="cart" size={24} color="#fff" />
                                                            </View>
                                                            <Text style={styles.addCartBtnTitle}>Booster</Text>
                                                  </>
                                        </TouchableOpacity>
                              </View>
                    </>
          )
}
const styles = StyleSheet.create({
          product: {
                    maxWidth: 900,
                    maxHeight: 80,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 10,
                    marginVertical: 10,
                    marginHorizontal: 10,
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
                    backgroundColor: '#F1F1F1',
          },
          category: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
          },
          categoryName: {
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: COLORS.primary,
                    marginLeft: 5,
          },
          productNames: {
                    marginTop: 5,
          },
          productName: {
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: COLORS.ecommercePrimaryColor,
          },
          shop: {
                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
          },
          shopLeft: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          shopIcon: {
                    // width: 40,
                    // height: 40,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 10,
                    padding: 25,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    marginVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
          },
          shopOwner: {
                    marginLeft: 10,
          },
          productSeller: {
                    fontWeight: 'bold',
          },
          shopAdress: {
                    color: '#777',
                    fontSize: 13,
          },
          text: {
                    color: '#646B95',
                    fontSize: 20,
          },
          carre1: {
                    padding: 15,
                    height: 50,
                    width: 50,
                    color: '#1D8585',
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
          shareBtn: {
                    padding: 15,
                    height: 50,
                    width: 50,
                    color: '#1D8585',
                    backgroundColor: '#D7D9E4',
                    borderRadius: 100,
          },
          productDescription: {
                    color: '#777',
                    fontSize: 15,
                    lineHeight: 22,
          },
          quantite: {
                    color: '#777',
                    fontSize: 12,
                    lineHeight: 22,
          },
          valeur: {
                    color: '#777',
                    fontSize: 30,
                    lineHeight: 40,
                    fontWeight: 'bold',
                    textAlign: "center"
          },
          txtDispla: {
                    color: '#646B94',
                    fontSize: 15,
                    fontWeight: 'bold',
          },
          image: {
                    height: '30%',
                    width: '30%',
                    borderRadius: 8,
                    resizeMode: 'contain',
          },
          productsHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
          },
          title: {
                    fontWeight: 'bold',
          },
          products: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
          },
          productFooter: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
          },
          productPrice: {
                    fontWeight: 'bold',
                    fontSize: 22,
          },
          addCartBtn: {
                    borderRadius: 30,
                    backgroundColor: COLORS.ecommerceOrange,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          addCartBtnTitle: {
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
          },
          badge: {
                    minWidth: 25,
                    minHeight: 20,
                    borderRadius: 20,
                    paddingHorizontal: 3,
                    backgroundColor: COLORS.ecommerceRed,
                    position: 'absolute',
                    top: -10,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
          },
          badgeText: {
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#FFF',
                    fontWeight: 'bold',
          },
})
