import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar, Modal, ActivityIndicator } from "react-native"
import { Ionicons, AntDesign, Feather, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useNavigation, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector"
import Product from "../../components/ecommerce/main/Product";
import { Entypo } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { FontAwesome } from '@expo/vector-icons';
import { useRef } from "react";
import ProductImages from "../../components/ecommerce/details/ProductImages";
import moment from "moment/moment";
import Loading from "../../components/app/Loading";
import Couleur from "../../components/ecommerce/main/Couleur";
import { useForm } from "../../hooks/useForm";
export default function ProductDetailsScreen() {
  const navigation = useNavigation()
  const route = useRoute()

  const [loadingShopProducts, setLoadingShopProducts] = useState(true)
  const [shopProducts, setShopProducts] = useState([])
  const [produitnote, Setproduitnote] = useState([])
  const [userNote, SetuserNote] = useState([])

  //console.log(shopProducts)
  const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true)
  const [similarProducs, setSimilarProducts] = useState([])
  const user = useSelector(userSelector)
  //console.log(user.result.ID_USER)
  const { product } = route.params


  const modalizeRef = useRef(null)
  const variantmodaliseRef = useRef()
  const onPressVariante = () => {
    variantmodaliseRef.current.open()
  }
  const [isOpen, setIsOpen] = useState(false)
  const [loadingForm, setLoadingForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const [note, Setnote] = useState(null)
  const [commentaire, Setcommentaire] = useState(null)
  const [SIZES, setSIZES] = useState([])
  // console.log(product)
  const [colors, SetColors] = useState([])
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  // const productInCart = useSelector(ecommerceProductSelector(product.produit_partenaire.ID_PARTENAIRE_SERVICE))
  const onCartPress = () => {
    setIsOpen(true)
    modalizeRef.current?.open()
  }
  moment.updateLocale('fr', {
    calendar: {
      sameDay: "[Aujourd'hui]",
      lastDay: '[Hier]',
      nextDay: 'DD-M-YYYY',
      lastWeek: 'DD-M-YYYY',
      sameElse: 'DD-M-YYYY',
    },
  })

  const approvisionneModaliseRef = useRef()
  const uploadModaliseRef = useRef()
  const PricemodaliseRef = useRef()
  const ProductmodaliseRef = useRef()
  const DescriptionmodalizeRef = useRef()


  const onPressAprovisionner = () => {
    approvisionneModaliseRef.current.open()
  }
  const [quantite, setQuantite] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  var IMAGES = [
    product.produit_partenaire.IMAGE_1 ? product.produit_partenaire.IMAGE_1 : undefined,
    product.produit_partenaire.IMAGE_2 ? product.produit_partenaire.IMAGE_2 : undefined,
    product.produit_partenaire.IMAGE_3 ? product.produit_partenaire.IMAGE_3 : undefined,
  ]

  const onetoilePress = (note) => {

    Setnote(note)


  }
  const onDecrement = () => {
    if (parseInt(quantite) == 1) {
      return false
    }
    if (parseInt(quantite) <= 0) {
      return 1
    }
    setQuantite(l => parseInt(l) - 1)
  }

  const onIncrement = () => {

    setQuantite(l => parseInt(l) + 1)
  }

  const onChangeText = am => {
    setQuantite(am)
  }
  const onSelectPhoto = () => {
    uploadModaliseRef.current.open()
  }
  const onPressPrice = () => {
    PricemodaliseRef.current.open()
  }
  const onPressProduct = () => {
    ProductmodaliseRef.current.open()
  }
  const onPressDescription = () => {
    DescriptionmodalizeRef.current.open()
  }
  const [data, handleChange, setValue] = useForm({
    price: product.produit_partenaire.PRIX,
    product: product.produit.NOM,
    description: product.produit.DESCRIPTION,

  })
  const fecthProduits = async () => {
    try {
      const response = await fetchApi(`/products/products/${product.produit_partenaire.ID_PARTENAIRE_SERVICE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      setShopProducts(response.result)

    }

    catch (error) {
      console.log(error)
    } finally {
      setLoadingShopProducts(false)
    }
  }
  useFocusEffect(useCallback(() => {
    fecthProduits()
  }, []))

  useEffect(() => {
    (async () => {
      try {
        var url = `/products?category=${product.categorie.ID_CATEGORIE_PRODUIT}`
        const produits = await fetchApi(url)
        setSimilarProducts(produits.result)
        //console.log(product)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingSimilarProducts(false)
      }
    })()
  }, [])
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
  const enregistrement = async () => {

    try {

      setLoading(true)
      const res = await fetchApi("/products/note", {
        method: 'POST',
        body: JSON.stringify({
          ID_PRODUIT_PARTENAIRE: product.produit.ID_PRODUIT_PARTENAIRE,
          NOTE: note,
          COMMENTAIRE: commentaire,


        }),

        headers: { "Content-Type": "application/json" },


      })

      Setproduitnote(n => [res.result, ...n])
      //navigation.navigate("produitDetailScreen")



    }


    catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
      Setcommentaire("")


    }


  }
  useEffect(() => {
    (async () => {
      try {
        var url = `/products/note/liste/${product.produit.ID_PRODUIT_PARTENAIRE}`
        const produitsNotes = await fetchApi(url)
        Setproduitnote(produitsNotes.result)
        //console.log(produitsNotes)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])




  useEffect(() => {
    (async () => {
      try {
        var url = `/products/note/${product.produit.ID_PRODUIT_PARTENAIRE}`
        const userNotes = await fetchApi(url)
        SetuserNote(userNotes.result)
        //console.log(userNote)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const onSizePress = async (size) => {

    try {
      // setLoadingSubCategories(true)
      if (size?.id) {
        const color = await fetchApi(`/products/color/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}/${size?.id}`, {
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
      const sizes = await fetchApi(`/products/size/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}`, {
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

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // setLoadingSubCategories(true)
  //       if (selectedSize?.ID_TAILLE) {
  //         const color = await fetchApi(`/products/color/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}/${selectedSize?.ID_TAILLE}`, {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json" },
  //         })
  //         SetColors(color.result)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     // finally {
  //     //     setLoadingSubCategories(false)
  //     // }
  //   })()
  // }, [selectedSize])

  return (
    <>
      {loading && <Loading />}
      <View style={{ backgroundColor: '#F1F1F1', marginTop: 0, flex: 1 }}>
        {/* {showImageModal && <ImagesGallery images={IMAGES.filter(image => image)} showImageModal={showImageModal} setShowImageModal={setShowImageModal} />} */}
        <View style={styles.cardHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
              <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
            </TouchableOpacity>
            {/* <EcommerceBadge /> */}
          </View>
        </View>
        <ProductImages images={IMAGES} />
        <TouchableOpacity onPress={() => onSelectPhoto()} style={styles.uploadImages}>
          <Feather name="image" size={24} color={COLORS.ecommercePrimaryColor} />
        </TouchableOpacity>
        <View style={{
          backgroundColor: "white", flex: 1, borderTopLeftRadius: 60, elevation: 10, padding: 10,
          borderTopRightRadius: 60,
        }}>
          <View style={styles.productNames}>
            <TouchableOpacity onPress={onPressProduct}>
              <Text style={styles.productName}>
                {product.produit.NOM}</Text>
              <EvilIcons style={{ opacity: 0.5, marginLeft: "56%", marginTop: "-10%" }} name="pencil" size={22} color="black" />
            </TouchableOpacity>

            <View>
              <TouchableOpacity onPress={onPressPrice}>
                <Text style={styles.productPrice}>BIF {product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                  <EvilIcons style={{ opacity: 0.5, marginLeft: "-20%", marginTop: "3%" }} name="pencil" size={22} color="black" />
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <AntDesign name="star" size={15} color="#EFC519" />
                <AntDesign name="star" size={15} color="#EFC519" />
                <AntDesign name="star" size={15} color="#EFC519" />
                <AntDesign name="star" size={15} color="#EFC519" />
                <AntDesign name="staro" size={15} color="#EFC519" />
              </View>
            </View>
          </View>
          <ScrollView>
            {SIZES.length != 0 &&
              <>
                <View style={styles.moreDetails}>
                  <Text style={styles.subTitle}>Taille</Text>
                  <View style={[styles.sizes]}>
                    {
                      SIZES?.map((size, index) =>
                        <TouchableOpacity style={[styles.size, index == 0 && { marginLeft: 0 }, size.id == selectedSize?.id && { backgroundColor: COLORS.ecommerceOrange }]} key={index} onPress={() => {
                          setSelectedSize(size)
                          setSelectedColor(null)
                          // onChangeText(0)
                          onSizePress(size)
                        }
                        }>
                          <Text style={[styles.sizeText, size.id == selectedSize?.id && { color: '#FFF' }]}>{size.name}</Text>
                        </TouchableOpacity>)}
                  </View>
                </View>
                {selectedSize && <View style={styles.moreDetails}>
                  <Text style={styles.subTitle}>couleur</Text>
                  <View style={[styles.sizes]}>
                    {colors.map((color, index) =>
                      <TouchableOpacity style={[styles.color, index == 0 && { marginLeft: 0 }, color.ID_COULEUR == selectedColor?.ID_COULEUR && { backgroundColor: COLORS.ecommerceOrange }]} key={index} onPress={() => {
                        setSelectedColor(color)
                        setQuantite(color.QUANTITE_RESTANTE)
                      }
                      }>
                        <Text style={[styles.colorText, color.ID_COULEUR == selectedColor?.ID_COULEUR && { color: '#FFF' }]}>{color.COULEUR}</Text>
                      </TouchableOpacity>)}
                  </View>
                </View>}
              </>
            }
            <View style={{ marginLeft: "70%" }}>
              <Text style={[styles.subTitle,]}></Text>
              {selectedColor ? <Text style={{ fontSize: 12, color: '#777', marginBottom: 5 }}>
              Quantité: {selectedColor.QUANTITE_RESTANTE}
              </Text> : <Text style={{ fontSize: 12, color: '#777', marginBottom: 5 }}>
              Quantité: 0
              </Text>}
            </View>

          </ScrollView>
        </View>
        <View style={{ backgroundColor: "white" }}>
          {/* <TouchableOpacity onPress={onPressDescription}> */}
            <Text style={{ marginHorizontal: "5%", marginBottom: "0%", marginTop: "-40%", color: "#797E9A" }}>
              {product.produit.DESCRIPTION}
              {product.produit.DESCRIPTION&&<EvilIcons style={{ opacity: 0.5, marginLeft: "-10%", marginTop: "3%" }} name="pencil" size={22} color="#797E9A" />}
              

            </Text>
          {/* </TouchableOpacity> */}

          <TouchableOpacity onPress={onPressAprovisionner}>
            <View style={{ position: "absolute", backgroundColor: COLORS.ecommerceOrange, borderRadius: 50, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="add" size={30} color="white" />
            </View>
          </TouchableOpacity>
          {product.produit.DESCRIPTION&&
          <View style={{ zIndex: 1, marginTop: "-45%", marginHorizontal: "5%" }}>
            <Text style={styles.subTitle}>Description</Text>

          </View>}
        </View>
        
      </View>
      <Modalize ref={variantmodaliseRef} adjustToContentHeight
        handlePosition='inside'
        modalStyle={{
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          paddingVertical: 20
        }}
        handleStyle={{ marginTop: 10 }}
        scrollViewProps={{
          keyboardShouldPersistTaps: "handled"
        }}>
        <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
        <View style={styles.inputCard}>
          <OutlinedTextField
            style={styles.input}
            label={"Modifier le heure d travail"}
            lineWidth={0.5}
            activeLineWidth={0.5}
            baseColor={COLORS.smallBrown}
            tintColor={COLORS.primary}
          />
        </View>
        <TouchableOpacity style={styles.addBtn} >
          <Text style={styles.addBtnText}>Modifier</Text>
        </TouchableOpacity>
      </Modalize>

      <Modalize ref={approvisionneModaliseRef}
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
      >
        <Text style={{ marginBottom: "1%", marginBottom: "1%", fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Approvisionner</Text>
        <View style={styles.inputCard}>
          <OutlinedTextField
            style={styles.input}
            label={"Taille"}
            value={selectedSize?.name}
            disabled={true}
            lineWidth={0.5}
            activeLineWidth={0.5}
            baseColor={COLORS.smallBrown}
            tintColor={COLORS.primary}
          />
          <OutlinedTextField
            style={styles.input}
            label={"Couleur"}
            value={selectedColor?.COULEUR}
            lineWidth={0.5}
            disabled={true}
            activeLineWidth={0.5}
            baseColor={COLORS.smallBrown}
            tintColor={COLORS.primary}
          />
          <View style={styles.quantiteContainer}>
            <TouchableOpacity style={[styles.quantiteChanger, (quantite <= 1 || !/^\d+$/.test(quantite)) && { opacity: 0.5 }]} onPress={onDecrement} disabled={quantite <= 1 || !/^\d+$/.test(quantite)}>
              <Text style={styles.quantiteChangerText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.inputApp, isFocused && { borderColor: COLORS.primary }]}
              // value={quantite}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false)
                checkAmount()
              }}
              keyboardType="decimal-pad"
            />
            <TouchableOpacity style={[styles.quantiteChanger]} onPress={onIncrement} >
              <Text style={styles.quantiteChangerText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.addBtn} >
          <Text style={styles.addBtnText}>Approvisionner</Text>
        </TouchableOpacity>
      </Modalize>
      <Modalize ref={uploadModaliseRef} handlePosition="inside" modalHeight={100} snapPoint={250}>
        <View style={styles.modalContent}>
          <TouchableNativeFeedback >
            {/* <TouchableNativeFeedback onPress={() => onImporterPhoto()}> */}
            <View style={styles.modalAction}>
              <View style={styles.actionIcon}>
                <AntDesign name="folderopen" size={24} color="black" />
              </View>
              <View style={styles.actionLabels}>
                <Text style={styles.modalActionText}>
                  Importer une photo
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Modalize>
      <Modalize ref={PricemodaliseRef} adjustToContentHeight
        handlePosition='inside'
        modalStyle={{
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          paddingVertical: 20
        }}
        handleStyle={{ marginTop: 10 }}
        scrollViewProps={{
          keyboardShouldPersistTaps: "handled"
        }}>
        <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
        {/* <View style={styles.inputCard}>
          <OutlinedTextField
            style={styles.input}
            label={"Modifier le prix"}
            // adresse:partenaire.produit.ADDRESSE,
            // value={data.price}
            onChangeText={(newValue) => handleChange('price', newValue)}
          />
        </View> */}
        <TouchableOpacity style={styles.addBtn} >
          <Text style={styles.addBtnText}>Modifier</Text>
        </TouchableOpacity>
      </Modalize>
      <Modalize ref={ProductmodaliseRef} adjustToContentHeight
        handlePosition='inside'
        modalStyle={{
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          paddingVertical: 20
        }}
        handleStyle={{ marginTop: 10 }}
        scrollViewProps={{
          keyboardShouldPersistTaps: "handled"
        }}>
        <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>
        {/* <View style={styles.inputCard}>
          <OutlinedTextField
            style={styles.input}
            label={"Modifier le prix"}
value={data.product}
            onChangeText={(newValue) => handleChange('price', newValue)}
          />
        </View> */}
        <TouchableOpacity style={styles.addBtn} >
          <Text style={styles.addBtnText}>Modifier</Text>
        </TouchableOpacity>
      </Modalize>
      <Modalize ref={DescriptionmodalizeRef}
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
      >
        <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Modification</Text>

        {/* <View style={styles.inputCard}>
          <OutlinedTextField
            label={"Modifier la description"}
            fontSize={14}
            value={data.description}
            onChangeText={(newValue) => handleChange('description', newValue)}
            lineWidth={0.5}
            activeLineWidth={0.5}
            baseColor={COLORS.smallBrown}
            tintColor={COLORS.primary}
            multiline={true}
          />
        </View> */}
        <TouchableOpacity style={styles.addBtn} >
          <Text style={styles.addBtnText}>Modifier</Text>
        </TouchableOpacity>
      </Modalize>

    </>

  )
}
const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: StatusBar.currentHeight,
    height: 60,
    backgroundColor: '#F1F1F1',
  },
  quantiteContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    // marginHorizontal: 10,
    flexDirection: 'row',
    marginTop: "2%",
    marginBottom: "2%"
  },
  inputApp: {
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 10,
    borderColor: '#fff',
    flex: 1,
    height: "100%",
    // marginHorizontal: 15,
    textAlign: 'center',
    color: COLORS.ecommercePrimaryColor,
    fontWeight: 'bold'
  },
  quantiteChanger: {
    width: 20,
    // height: "100%",
    // backgroundColor: COLORS.ecommercePrimaryColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantiteChangerText: {
    color: COLORS.ecommerceRed,
    fontWeight: 'bold',
    fontSize: 20
  },
  addBtnText: {
    color: '#fff',
    fontWeight: "bold",
    textAlign: "center",
    left: "220%"
  },
  addBtn: {
    flexDirection: "row",
    marginTop: "0%",
    marginBottom: "2%",
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: COLORS.ecommerceOrange,
    height: 50,
    marginHorizontal: "5%",
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  points: {
    marginTop: 25,
    marginLeft: 10
  },
  userImage: {
    width: "120%",
    height: "120%",
    borderRadius: 50,
    // alignItems:"center",
    // justifyContent:"center"
  },
  Cardnote: {
    padding: 15,
    height: 20,
    width: 20,
    color: "#1D8585",
    backgroundColor: '#D7D9E4',
    borderRadius: 50,

  },
  etoiles: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 60,
    paddingHorizontal: 10

  },
  inputCard: {
    marginHorizontal: 20,
    marginTop: 10,
    multiline: true


  },
  categoryName: {
    fontWeight: "bold",
    fontSize: 13,
    color: COLORS.primary,
    marginLeft: 5
  },
  productNames: {
    marginTop: "5%",
    flexDirection: "row",
    // marginHorizontal: "3%",
    justifyContent: "space-between",

  },
  uploadImages: {
    width: 50,
    height: 50,
    backgroundColor: "#D7D9E4",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    position: 'absolute',
    left: "80%",
    marginTop: 230,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    marginTop: 20
  },
  modalAction: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingVertical: 15
  },
  modalActionText: {
    fontWeight: "bold"
  },

  productName: {
    fontWeight: "bold",
    fontSize: 18,
    opacity: 0.7,
    color: COLORS.ecommercePrimaryColor
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
  text: {
    color: '#646B95',
    fontSize: 20
  },
  carre1: {
    padding: 15,
    height: 50,
    width: 50,
    color: "#1D8585",
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
    color: "#1D8585",
    backgroundColor: '#D7D9E4',
    borderRadius: 100
  },
  productDescription: {
    color: '#777',
    fontSize: 15,
    lineHeight: 22
  },
  txtDispla: {
    color: '#646B94',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    height: "30%",
    width: "30%",
    borderRadius: 8,
    resizeMode: 'contain'
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
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  productFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft:"1%",
    color: COLORS.ecommercePrimaryColor,
    opacity: 0.7
  },
  addCartBtn: {
    borderRadius: 30,
    backgroundColor: COLORS.ecommerceOrange,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    // textTransform:"uppercase",
    fontSize: 16,
    textAlign: "center"
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primaryPicker,
    marginHorizontal: 20
  },
  addCartBtnTitle: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  Cardnote: {
    padding: 15,
    height: 40,
    width: 40,
    color: "#1D8585",
    backgroundColor: '#D7D9E4',
    borderRadius: 100
  },
  rateHeader: {
    marginLeft: 10,
    flex: 1
  },
  rateTitles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  notecard: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  notecards: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginTop: 7


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
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#FFF',
    fontWeight: "bold"
  },
  moreDetails: {
    marginTop: "1%",
    marginHorizontal: "2%",

  },
  subTitle: {
    color: COLORS.ecommercePrimaryColor,
    fontWeight: 'bold'
  },
  sizes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  },
  color: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },

  sizeText: {
    color: COLORS.ecommercePrimaryColor,
    fontWeight: 'bold',
    fontSize: 16
  },
  size: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
})
