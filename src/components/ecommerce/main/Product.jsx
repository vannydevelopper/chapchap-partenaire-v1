// import React from 'react'
// import { Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View, TouchableNativeFeedback } from 'react-native'
// import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
// import { COLORS } from '../../../styles/COLORS';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';

// export default function Product({ product, index, totalLength, fixMargins = false }) {
//         const { width } = useWindowDimensions()
//         // console.log(product)
//         const MAX_WIDTH = 200
//         const PRODUCT_MARGIN = 10
//         const SERVICE_WIDTH = (width / 2)
//         const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
//         const PRODUCT_HEIGHT = 360
//         const additionStyles = {
//                 width: PRODUCT_WIDTH,
//                 maxHeight: PRODUCT_HEIGHT,
//                 marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
//                 marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
//         }
//         const navigation = useNavigation()
//         const detail = async (detail) => {
//                 const details = detail
//                 navigation.navigate("ProductDetailScreen", { detail: product })
//         }


//         return (
//                 <>

//                         <View key={index} style={[styles.product, additionStyles]}>
//                                 <ImageBackground style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
//                                         <View style={{ ...styles.productHeader, marginHorizontal: 10, marginBottom: 20 }}>
//                                                 {/* <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text> */}
//                                                 <Text numberOfLines={2} style={styles.productCategory}>
//                                                         {product.produit.NOM}
//                                                 </Text>
//                                                 <View style={{ flexDirection: "row", marginBottom: 5, alignItems: "center" }}>
//                                                         <Text style={{ color: "#777", fontWeight: 'bold', fontSize: 14 }}>Prix</Text>
//                                                         {product.produit_partenaire.PRIX ? <Text style={styles.price}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
//                                                 </View>
//                                         </View>
//                                         <View style={styles.serviceIcon}>
//                                                 {/* <TouchableOpacity onPress={() => detail(product)}>
//                                                         <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.serviceIconImage} />
//                                                 </TouchableOpacity> */}
//                                                 <TouchableNativeFeedback onPress={() => detail(product)}>
//                                                         <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.serviceIconImage} />
//                                                 </TouchableNativeFeedback>
//                                         </View>
//                                         {/* <View style={{ flexDirection: "row", }}>
//                                                 <Text style={styles.serviceName}>Quantite Total</Text>
//                                                 <Text style={{ fontWeight: "bold", color:"#777", marginLeft: 5 }}>{product.stock.QUANTITE_STOCKE}</Text>
//                                         </View>
//                                         <View style={{ marginTop: -40, flexDirection: "row" }}>
//                                                 <Text style={styles.serviceName1}>Vendus</Text>
//                                                 <Text style={{ fontWeight: "bold",color:"#777", marginLeft: 5 }}>{product.stock.QUANTITE_VENDUE}</Text>
//                                         </View>
//                                         <View style={{ flexDirection: "row" }}>
//                                                 <Text style={styles.serviceName1}>Restante</Text>
//                                                 <Text style={{ fontWeight: "bold",color:"#777", marginLeft: 5 }}>{product.stock.QUANTITE_RESTANTE}</Text>
//                                         </View> */}
//                                 </ImageBackground>
//                         </View>
//                 </>
//         )
// }

// const styles = StyleSheet.create({
//         product: {
//                 maxWidth: 200,
//                 // backgroundColor: '#F1F1F1',
//                 borderWidth: 1,
//                 borderColor: "#D7D9E4",
//                 borderRadius: 5,
//                 marginTop: 10,
//         },
//         productHeader: {
//                 // padding: 5
//         },
//         productName: {
//                 color: COLORS.ecommercePrimaryColor,
//                 fontWeight: "bold",

//         },
//         productCategory: {
//                 fontSize: 17,
//                 color: '#777',
//         },
//         imageCard: {
//                 height: "40%",
//                 width: "100%"
//         },
//         image: {
//                 height: "100%",
//                 width: "100%",
//                 resizeMode: 'contain'
//         },
//         price: {
//                 color: '#F29558',
//                 fontWeight: "bold",
//                 padding: 5
//         },
//         details: {
//                 paddingHorizontal: 5
//         },
//         detail: {
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//         },
//         detailLabel: {
//                 color: '#c4bebe',
//                 fontSize: 13,
//                 fontWeight: "bold"
//         },
//         detailValue: {
//                 fontWeight: "bold"
//         },

//         serviceContainer: {
//                 maxWidth: 300,
//                 justifyContent: 'center',
//                 alignItems: 'center'
//         },
//         service: {
//                 borderRadius: 10,
//                 width: "90%",
//                 // height: "85%",
//                 overflow: 'hidden',
//                 flex: 1
//         },
//         serviceBackgound: {
//                 width: "100%",
//                 height: "80%",
//                 justifyContent: 'space-between'
//         },
//         serviceIcon: {
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "#fff",
//                 borderRadius: 10,
//                 marginLeft: 30,
//                 // marginTop: -9,
//                 justifyContent: 'center',
//                 alignItems: 'center'
//         },
//         serviceName: {
//                 textAlign: 'center',
//                 color: '#777',
//                 fontWeight: 'bold',
//                 marginBottom: 40,
//                 fontSize: 14,
//                 marginHorizontal: 10
//         },
//         nameTitle: {
//                 textAlign: 'center',
//                 color: '#777',
//                 fontWeight: 'bold',
//                 fontSize: 16
//         },
//         serviceName1: {
//                 textAlign: 'center',
//                 color: '#777',
//                 fontWeight: 'bold',
//                 fontSize: 14,
//                 marginHorizontal: 10
//         },
//         serviceIconImage: {
//                 width: 140,
//                 height: 140,
//                 borderRadius: 10,
//         },
// })


import React, { useCallback, useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity,TouchableNativeFeedback, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons,Fontisto, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
// import AddCart from './AddCart';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { ecommerceProductSelector } from '../../../store/selectors/ecommerceCartSelectors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import fetchApi from "../../../helpers/fetchApi";

export default function Product({ product, index, totalLength, fixMargins = false, onRemove }) {
  const [wishlist, setWishlist] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
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

  const modalizeRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loadingForm, setLoadingForm] = useState(true)

  // const [SIZES, setSIZES] = useState([])
  const [SIZES, setSIZES] = useState([])
// console.log(product)
  const [colors, SetColors] = useState([])
const detail = async (product) => {
                const details = product
                navigation.navigate("ProductDetailScreen", { product: product })
        }
  const onSizePress = async (size) => {

    try {
      // setLoadingSubCategories(true)
      if (size?.id) {
        const color = await fetchApi(`/products/color/${product.produit.ID_PRODUIT_PARTENAIRE}/${size?.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        SetColors(color.result)

      }
    } catch (error) {
      console.log(error)
    }
  }
  const fecthSizes = async () => {
    try {
      const sizes = await fetchApi(`/products/size/${product.produit.ID_PRODUIT_PARTENAIRE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },

      })
      setSIZES(sizes.result)
    }
    catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fecthSizes()
  }, []))

  useEffect(() => {
    (async () => {
      try {
        // setLoadingSubCategories(true)
        if (selectedSize?.ID_TAILLE) {
          const color = await fetchApi(`/products/color/${product.produit.ID_PRODUIT_PARTENAIRE}/${selectedSize?.ID_TAILLE}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
          SetColor(color.result)
        }
      } catch (error) {
        console.log(error)
      }
      // finally {
      //     setLoadingSubCategories(false)
      // }
    })()
  }, [selectedSize])


  const onCartPress = () => {
    setIsOpen(true)
    modalizeRef.current?.open()
  }
  const fecthWishlist = async () => {
    try {
      const wishliste = await fetchApi(`/wishlist/verification/${product.produit.ID_PRODUIT_PARTENAIRE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      // console.log(wishliste.result)
      if (wishliste.result) {
        setWishlist(true)
      }

    }
    catch (error) {
      console.log(error)
    }
  }
  useFocusEffect(useCallback(() => {
    fecthWishlist()
  }, []))


  const Addishlist = async (id) => {
    //  console.log(id)
    if (wishlist) {
      try {

        const newWishlist = await fetchApi(`/wishlist/suppression/${id}`, {
          method: "DELETE",
        })
        if (onRemove) {
          onRemove(id)
        }

        setWishlist(false)

      } catch (error) {
        console.log(error)
      }

    }

    else {
      try {
        const form = new FormData()
        // form.append("ID_PRODUIT", id)
        //  console.log(id)
        const newWishlist = await fetchApi('/wishlist', {
          method: 'POST',
          body: JSON.stringify({
            ID_PRODUIT_PARTENAIRE: id,

          }),
          headers: { "Content-Type": "application/json" },
        })

        setWishlist(true)


      } catch (error) {
        console.log(error)
      }

    }

  }
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setLoadingForm(false)
      })
      return () => {
        clearTimeout(timer)
      }
    }
  }, [isOpen])

  return (
    <View key={index} style={[styles.product, additionStyles,]}>
      <TouchableOpacity onPress={() => detail(product)} style={styles.imageCard}>
      {/* <TouchableNativeFeedback style={styles.imageCard} onPress={() => detail(product)}> */}

        <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.image} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <View style={styles.cardLike}>
            <AntDesign name="like2" size={24} color="#F29558" />
           { product.NbreCommande&&<View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>{product.NbreCommande?.nbr}</Text>
            </View> }
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
          <Fontisto name="shopping-basket" size={24} color="#F29558" />
           { product.NbreLike&&<View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>{product.NbreLike?.nbr} </Text>
            </View> }
        </TouchableOpacity>
      </View>
      <View style={styles.productNames}>
        <Text numberOfLines={2} style={styles.productName}>

          <Text numberOfLines={2} style={styles.productName}> {product.produit.NOM}</Text>
        </Text>
      </View>
      {product.produit_partenaire.PRIX ? <Text style={{ color: "#F29558", fontWeight: "bold" }}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
      <Text numberOfLines={2} style={styles.productName}>Quantite:{product.Qte.RESTANTE?product.Qte.RESTANTE:0}</Text>
     
      <Portal>
        <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
          <Modalize
            ref={modalizeRef}
            adjustToContentHeight
            handlePosition='inside'
            modalStyle={{
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingVertical: 20
            }}
            handleStyle={{ marginTop: 10 }}
            scrollViewProps={{
              keyboardShouldPersistTaps: "handled"
            }}
            onClosed={() => {
              setIsOpen(false)
              setLoadingForm(true)
            }}
          >
            {/* <AddCart colors={colors} onSizePress={onSizePress} SIZES={SIZES} product={product} loadingForm={loadingForm} onClose={onCloseAddToCart} /> */}

          </Modalize>
        </GestureHandlerRootView>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    maxWidth: 240,
    
    marginHorizontal: 5,
    backgroundColor: 'white',
    elevation: 15,
    borderRadius: 10,
    padding: 5,
    marginTop:"2%"
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
  productName: {
    color: COLORS.ecommercePrimaryColor,
    fontWeight: "400",
    fontSize: 13
  }
})