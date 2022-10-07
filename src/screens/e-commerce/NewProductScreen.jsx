import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import fetchApi from "../../helpers/fetchApi";
import useFetch from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { COLORS } from "../../styles/COLORS";
import { SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import Loading from "../../components/app/Loading";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";


export default function NewProductSreen() {
          const [showTaille, setshowTaille] = useState(false)
          const [selectedTaille, setselectedTaille] = useState(false)
          const navigation = useNavigation()
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)
          const [isLoading, setIsLoading] = useState(false)
          const [showSize, setshowSize] = useState(false)
          const [showColor, setshowColor] = useState(false)

          const [taille, setsTaille] = useState([])
          let total = 0


          const produitsModalizeRef = useRef(null)
          const categoriesModalizeRef = useRef(null)
          const subCategoriesModalizeRef = useRef()
          const sizeModalizeRef = useRef(null)
          const detailsModalizeRef = useRef(null)

          const [data, handleChange] = useForm({
                    produit: null,
                    category: null,
                    subCategory: null,
                    nom: "",
                    size: null,
                    description: "",
                    quantite: "",
                    montant: "",
                    color: "",
                    quantiteDetail: ""
          })

          const add = (total, sizeId, size, quantite, colorId, color) => {
                    setsTaille(s => [...s, { total, sizeId, size, quantite, colorId, color }])
          }
          // console.log(taille)

          const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                    produit: {
                              required: true,
                    },
                    category: {
                              required: true,
                    },
                    subCategory: {
                              required: true
                    },
                    nom: {
                              required: true,
                              length: [2, 100]
                    },
                    description: {
                              length: [1, 3000]
                    },
                    quantite: {
                              required: true,
                              length: [1, 11]
                    },
                    montant: {
                              required: true,
                              length: [1, 11]
                    }
          }, {
                    produit: {
                              required: "Veuillez choisir le produit",
                    },
                    category: {
                              required: "Veuillez choisir la catégorie",
                    },
                    subCategory: {
                              required: "Veuillez choisir le sous-catégorie",
                    },
                    nom: {
                              required: "Le nom du produit est obligatoire",
                              length: "Le nom du produit ne peut pas dépasser 100 caractères"
                    },
                    description: {
                              length: "La description du produit ne peut pas dépasser 3000 caractères"
                    },
                    quantite: {
                              required: "La quantité est obligatoire",
                              length: "Quantité invalide"
                    },
                    montant: {
                              required: "Le prix unitaire est obligatoire",
                              length: "Prix unitaire invalide"
                    }
          })

          const [produits, setProduits] = useState([])
          const [loadingProduits, setLoadingProduits] = useState(true)

          const [categories, setCategories] = useState([])
          const [loadingCategories, setLoadingCategories] = useState(true)

          const [subCategories, setSubCategories] = useState([])
          const [loadingSubCategories, setLoadingSubCategories] = useState(true)

          const [sizes, setSizes] = useState([])
          const [loadingSizes, setLoadingSizes] = useState(true)

          const [colors, setColors] = useState([])
          const [loadingColors, setLoadingColors] = useState(true)

          const [isFocused, setIsFocused] = useState(false)
          const [isDescFocused, setIsDescFocused] = useState(false)
          const [isAmountFocused, setIsAmountFocused] = useState(false)
          const [isPriceFocused, setIsPriceFocused] = useState(false)

          const descriptionRef = useRef(null)
          const amountRef = useRef(null)
          const priceRef = useRef(null)
          const [amount, setAmount] = useState(1)

          const [images, setImages] = useState([])
          //   const onChangeText = am => {
          //     setAmount(am)
          // }

          const onSizeSelect = () => {
                    setshowSize(true)
          }
          // console.log(showSize)
          const fetchCategories = async () => {
                    try {
                              const pdts = await fetchApi('/products/categories')
                              setCategories(pdts)
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingCategories(false)
                    }
          }
          const fetchColors = async () => {
                    try {
                              const colors = await fetchApi('/products/colors')
                              setColors(colors)
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingColors(false)
                    }
          }
          const fetchProduits = async () => {
                    try {
                              const pdts = await fetchApi(`/partenaire/produits/${data.category.ID_CATEGORIE_PRODUIT}`)
                              setProduits(pdts)
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingProduits(false)
                    }
          }

          const fetchSubCategories = async () => {
                    try {
                              const pdts = await fetchApi(`/products/sub_categories/${data.category.ID_CATEGORIE_PRODUIT}`)
                              setSubCategories(pdts)
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingSubCategories(false)
                    }
          }
          const fetchSizes = async () => {
                    try {
                              const size = await fetchApi(`/products/sizes/${data.category.ID_CATEGORIE_PRODUIT}/${data.subCategory.ID_PRODUIT_SOUS_CATEGORIE}`)
                              setSizes(size)
                              // console.log(sizes)

                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingSizes(false)
                    }
          }

          const onImageSelect = async () => {
                    const image = await ImagePicker.launchImageLibraryAsync({
                              mediaTypes: ImagePicker.MediaTypeOptions.Images,
                              quality: 0.6
                    });
                    if (!image.cancelled) {
                              setImages(t => [...t, image])
                    }
          }

          const onRemoveImage = index => {
                    const newImages = images.filter((_, i) => i != index)
                    setImages(newImages)
          }

          const onSubmit = async () => {
                    try {
                              setIsLoading(true)
                              if (!isValidate()) throw { errors: getErrors() }
                              const form = new FormData()
                              form.append("ID_PRODUIT", data.produit.ID_PRODUIT)
                              form.append("ID_CATEGORIE_PRODUIT", data.category.ID_CATEGORIE_PRODUIT)
                              form.append("ID_PRODUIT_SOUS_CATEGORIE", data.subCategory.ID_PRODUIT_SOUS_CATEGORIE)
                              form.append("NOM", data.nom)
                              form.append("QUANTITE_STOCKE", data.quantite)
                              form.append("QUANTIPRIX", data.montant)
                              form.append("DETAIL", JSON.stringify(taille))
                              if (data.DESCRIPTION != "") {
                                        form.append("DESCRIPTION", data.description)
                              }
                              if (images.length > 0) {
                                        await Promise.all(images.map(async (image, index) => {
                                                  const key = `IMAGE_${index + 1}`
                                                  const manipResult = image
                                                  let localUri = manipResult.uri;
                                                  let filename = localUri.split('/').pop();
                                                  let match = /\.(\w+)$/.exec(filename);
                                                  let type = match ? `image/${match[1]}` : `image`;
                                                  form.append(key, {
                                                            uri: localUri, name: filename, type
                                                  })
                                        }))
                              }
                              // console.log(form)
                              const newProduct = await fetchApi('/partenaire/produit/create', {
                                        method: "POST",
                                        body: form
                              })
                              // console.log(newProduct)
                              navigation.navigate("NeProductDetail", {
                                        product: newProduct,
                                        index: 3,
                                        totalLength: 3,
                                        fixMargins: 3
                              })

                    } catch (error) {
                              console.log(error)
                    } finally {
                              setIsLoading(false)
                    }
          }

          useEffect(() => {
                    fetchCategories()
                    fetchColors()
          }, [])
          useEffect(() => {
                    if (data.category) {
                              fetchProduits()

                    }
          }, [data])

          useEffect(() => {
                    if (data.category) {
                              fetchSubCategories()
                    }
          }, [data])
          useEffect(() => {
                    if (data.category && data.subCategory) {
                              fetchSizes()
                    }
          }, [data])

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


          const CategoriesModalize = () => {
                    return (
                              (loadingForm || loadingCategories) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                                        <View style={styles.modalContainer}>
                                                  <View style={styles.modalHeader}>
                                                            <Text style={styles.modalTitle}>Les categories</Text>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                                  {categories.result?.map((produit, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback onPress={() => {
                                                                                handleChange("category", produit)
                                                                                categoriesModalizeRef.current.close()
                                                                      }} key={index.toString()}>
                                                                                <View style={[styles.modalItem, produit.ID_CATEGORIE_PRODUIT == data.category?.ID_CATEGORIE_PRODUIT && { backgroundColor: '#ddd' }]} >
                                                                                          <View style={styles.modalImageContainer}>
                                                                                                    <Image style={styles.modalImage} source={{ uri: produit.IMAGE }} />
                                                                                          </View>
                                                                                          <Text style={styles.itemTitle}>{produit.NOM}</Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                    )
          }
          const SubCategoriesModalize = () => {
                    return (
                              (loadingForm || loadingSubCategories) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                                        <View style={styles.modalContainer}>
                                                  <View style={styles.modalHeader}>
                                                            <Text style={styles.modalTitle}>
                                                                      Les sous categories
                                                            </Text>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                                  {subCategories.result?.map((produit, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback key={produit.ID_PRODUIT_SOUS_CATEGORIE} onPress={() => {
                                                                                handleChange("subCategory", produit)
                                                                                subCategoriesModalizeRef.current.close()
                                                                      }} >
                                                                                <View style={[styles.modalItem, produit.ID_PRODUIT_SOUS_CATEGORIE == data.subCategory?.ID_PRODUIT_SOUS_CATEGORIE && { backgroundColor: '#ddd' }]}>
                                                                                          <Text style={[styles.itemTitle, { marginLeft: 0 }]}>{produit.NOM_SOUS_CATEGORIE}</Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                    )
          }
          const ProduitsModalize = () => {
                    return (
                              (loadingForm || loadingProduits) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                                        <View style={styles.modalContainer}>
                                                  <View style={styles.modalHeader}>
                                                            <Text style={styles.modalTitle}>Les produits</Text>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                                  {produits.result?.map((produit, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback key={produit.ID_PRODUIT} onPress={() => {
                                                                                handleChange("produit", produit)
                                                                                produitsModalizeRef.current.close()
                                                                      }} >
                                                                                <View style={[styles.modalItem, produit.ID_PRODUIT == data.produit?.ID_PRODUIT && { backgroundColor: '#ddd' }]}>
                                                                                          <Text style={[styles.itemTitle, { marginLeft: 0 }]}>{produit.NOM_PRODUIT}</Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                    )
          }
          const DetailsModalize = () => {
                    const [dataDetail, handleChangeDetail] = useForm({
                              size: "",
                              color: "",
                              quantiteDetail: "",
                              quantite: ""
                    })
                    console.log(showColor)
                    console.log(showSize)



                    //   const checkAmount = () => {
                    //     handleChangeDetail("quantiteDetail",((parseInt(dataDetail.quantiteDetail)+total) <= data.quantite ?  parseInt(dataDetail.quantiteDetail):data.quantite-total ) )
                    //   }
                    return (
                              (loadingForm || loadingSizes) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                                        <View style={styles.modalContainer}>
                                                  <Text style={styles.modalTitle}>Les détails</Text>
                                                  <View style={styles.modalHeader}>
                                                            <TouchableOpacity style={styles.newProductBtn}>
                                                                      <Text style={styles.newProductText}>Nouveau</Text>
                                                            </TouchableOpacity>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>

                                                  <View style={styles.selectControl}>
                                                            <Text style={styles.selectLabel}>taille</Text>

                                                            <TouchableOpacity style={[styles.selectedLabelContainer]} onPress={() => setshowSize(true)}>
                                                                      <Text style={styles.selectedLabel} >
                                                                                {data.size ? data.size.TAILLE : "Aucun taille selectionné"}
                                                                      </Text>
                                                            </TouchableOpacity>
                                                            {
                                                                      showSize &&

                                                                      sizes.result?.map((size, index) => {
                                                                                return (
                                                                                          <TouchableNativeFeedback key={size.ID_TAILLE} onPress={() => {
                                                                                                    handleChange("size", size)
                                                                                                    setshowSize(false)
                                                                                          }} >
                                                                                                    <View style={[styles.modalItem, size.ID_TAILLE == data.size?.ID_TAILLE && { backgroundColor: '#ddd' }]}>
                                                                                                              <Text style={[styles.itemTitle, { marginLeft: 0 }]}>{size.TAILLE}</Text>
                                                                                                    </View>
                                                                                          </TouchableNativeFeedback>
                                                                                )
                                                                      })

                                                            }
                                                  </View>
                                                  <View style={styles.selectControl}>
                                                            <Text style={styles.selectLabel}>Couleur</Text>

                                                            <TouchableOpacity style={[styles.selectedLabelContainer]} onPress={() => setshowColor(true)}>
                                                                      <Text style={styles.selectedLabel} >
                                                                                {data.color ? data.color.COULEUR : "Aucun couleur selectionné"}
                                                                      </Text>
                                                            </TouchableOpacity>
                                                            {
                                                                      showColor &&
                                                                      colors.result?.map((color, index) => {
                                                                                return (
                                                                                          <TouchableNativeFeedback key={color.ID_COULEUR} onPress={() => {
                                                                                                    handleChange("color", color)
                                                                                                    setshowColor(false)
                                                                                          }} >
                                                                                                    <View style={[styles.modalItem, color.ID_COULEUR == data.color?.ID_COULEUR && { backgroundColor: '#ddd' }]}>
                                                                                                              <Text style={[styles.itemTitle, { marginLeft: 0 }]}>{color.COULEUR}</Text>
                                                                                                    </View>
                                                                                          </TouchableNativeFeedback>
                                                                                )
                                                                      })

                                                            }
                                                  </View>



                                                  <View style={styles.selectControl}>
                                                            <Text style={styles.selectLabel}>Quantité {data.quantite}</Text>
                                                            <TextInput
                                                                      ref={amountRef}
                                                                      style={[styles.input, isAmountFocused && { borderColor: COLORS.primary }]}
                                                                      value={data.quantite - dataDetail.quantiteDetail}
                                                                      defaultValue={10}
                                                                      onChangeText={detail => handleChangeDetail("quantiteDetail", detail, "quantite", data.quantite)}
                                                                      onFocus={() => setIsAmountFocused(true)}
                                                                      placeholder="Combien de pièces à detail ?"
                                                                      onBlur={() => {
                                                                                setIsAmountFocused(false)
                                                                                // checkAmount()
                                                                      }}
                                                                      keyboardType="decimal-pad"
                                                                      returnKeyType="next"


                                                                      onSubmitEditing={() => priceRef.current.focus()}
                                                                      blurOnSubmit={false}
                                                            />
                                                  </View>

                                                  <TouchableOpacity style={styles.addBtn} onPress={() => {
                                                            add(total, data.size.ID_TAILLE, data.size.TAILLE, dataDetail.quantiteDetail, data.color.ID_COULEUR, data.color.COULEUR)


                                                            detailsModalizeRef.current?.close()

                                                  }} disabled={showColor == false || showSize == false} >

                                                            <Text style={[styles.addBtnText]}>Ajouter</Text>
                                                  </TouchableOpacity>
                                        </View>
                    )
          }
          const SizesModalize = () => {
                    return (
                              (loadingForm || loadingProduits) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                                        <View style={styles.modalContainer}>
                                                  <View style={styles.modalHeader}>
                                                            <Text style={styles.modalTitle}>Les produits</Text>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                                  {produits.result?.map((produit, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback key={produit.ID_PRODUIT} onPress={() => {
                                                                                handleChange("produit", produit)
                                                                                produitsModalizeRef.current.close()
                                                                      }} >
                                                                                <View style={[styles.modalItem, produit.ID_PRODUIT == data.produit?.ID_PRODUIT && { backgroundColor: '#ddd' }]}>
                                                                                          <Text style={[styles.itemTitle, { marginLeft: 0 }]}>{produit.NOM_PRODUIT}</Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                    )
          }
          return (
                    <>
                              <ScrollView style={styles.container}>
                                        {isLoading && <Loading />}
                                        <Text style={styles.title}>Nouveau produit</Text>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Categorie</Text>
                                                  <TouchableOpacity style={[styles.selectedLabelContainer]} onPress={() => {
                                                            setIsOpen(true)
                                                            categoriesModalizeRef.current?.open()
                                                  }}>
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.category ? data.category.NOM : "Aucune catégorie selectionné"}
                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Sous catégorie</Text>
                                                  <TouchableOpacity style={[styles.selectedLabelContainer]} onPress={() => {
                                                            setIsOpen(true)
                                                            subCategoriesModalizeRef.current?.open()
                                                  }}>
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.subCategory ? data.subCategory.NOM_SOUS_CATEGORIE : "Aucun sous-catégorie selectionné"}
                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Produit</Text>
                                                  <TouchableOpacity style={[styles.selectedLabelContainer]} onPress={() => {
                                                            setIsOpen(true)
                                                            produitsModalizeRef.current?.open()
                                                  }}>
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.produit ? data.produit.NOM_PRODUIT : "Aucun produit selectionné"}
                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>

                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Nom du produit</Text>
                                                  <TextInput
                                                            style={[styles.input, isFocused && { borderColor: COLORS.primary }]}
                                                            value={data.nom}
                                                            onChangeText={e => handleChange("nom", e)}
                                                            onFocus={() => setIsFocused(true)}
                                                            placeholder="Ecrire votre propre nom du produit"
                                                            onBlur={() => {
                                                                      setIsFocused(false)
                                                            }}
                                                  />
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Description du produit</Text>
                                                  <TextInput
                                                            ref={descriptionRef}
                                                            style={[styles.input, isDescFocused && { borderColor: COLORS.primary }, { height: 80 }]}
                                                            value={data.description}
                                                            onChangeText={e => handleChange("description", e)}
                                                            onFocus={() => setIsDescFocused(true)}
                                                            placeholder="Décrire votre produit(facultatif)"
                                                            onBlur={() => {
                                                                      setIsDescFocused(false)
                                                            }}
                                                            multiline
                                                  />
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Quantité</Text>
                                                  <TextInput
                                                            ref={amountRef}
                                                            style={[styles.input, isAmountFocused && { borderColor: COLORS.primary }]}
                                                            value={data.quantite}
                                                            onChangeText={e => handleChange("quantite", e)}
                                                            onFocus={() => setIsAmountFocused(true)}
                                                            placeholder="Combien de pièces à mettre en stock ?"
                                                            onBlur={() => {
                                                                      setIsAmountFocused(false)
                                                            }}
                                                            keyboardType="decimal-pad"
                                                            returnKeyType="next"
                                                            onSubmitEditing={() => priceRef.current.focus()}
                                                            blurOnSubmit={false}
                                                  />
                                        </View>
                                        {taille &&

                                                  taille.map((t, index) => {
                                                            total = total + parseInt(t.quantite)
                                                            return (

                                                                      <View key={index} style={styles.product}>
                                                                                <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                                                                                          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                                                                    <Text style={styles.quantite}>Couleur</Text>
                                                                                                    <Text style={styles.quantite}>{t.color}</Text>

                                                                                          </View>
                                                                                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                                                    <Text style={styles.quantite}>Quantite</Text>
                                                                                                    <Text style={styles.quantite}>{t.quantite}</Text>
                                                                                          </View>
                                                                                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                                                    <Text style={styles.quantite}>Size</Text>
                                                                                                    <Text style={styles.quantite}>{t.size}</Text>


                                                                                          </View>
                                                                                </View>
                                                                      </View>
                                                            )
                                                  }
                                                  )

                                        }
                                        {data.quantite > 0 && total <= data.quantite - 1 && <TouchableOpacity style={styles.addBtn} onPress={() => {
                                                  setIsOpen(true)
                                                  console.log(total)
                                                  detailsModalizeRef.current?.open()
                                        }}>

                                                  <Text style={[styles.addBtnText]}>Detailler les quantites</Text>
                                        </TouchableOpacity>}
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Prix unitaire</Text>
                                                  <TextInput
                                                            ref={priceRef}
                                                            style={[styles.input, isPriceFocused && { borderColor: COLORS.primary }]}
                                                            value={data.montant}
                                                            onChangeText={e => handleChange("montant", e)}
                                                            onFocus={() => setIsPriceFocused(true)}
                                                            placeholder="Prix pour chaque pièce ?"
                                                            onBlur={() => {
                                                                      setIsPriceFocused(false)
                                                            }}
                                                            keyboardType="decimal-pad"
                                                  />
                                        </View>

                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Images du produit</Text>
                                                  <View style={styles.images}>
                                                            {images.map((image, index) => {
                                                                      return (
                                                                                <TouchableWithoutFeedback onPress={() => onRemoveImage(index)} key={index}>
                                                                                          <Image style={[styles.addImager, index > 0 && { marginLeft: 10 }]} source={{ uri: image.uri }} />
                                                                                </TouchableWithoutFeedback>
                                                                      )
                                                            })}
                                                            {images.length < 3 ? <TouchableWithoutFeedback onPress={onImageSelect}>
                                                                      <View style={[styles.addImager, images.length > 0 && { marginLeft: 10 }]}>
                                                                                <Feather name="image" size={30} color="#777" />
                                                                      </View>
                                                            </TouchableWithoutFeedback> : null}
                                                  </View>
                                        </View>
                                        <TouchableOpacity style={[styles.addBtn, (!isValidate() || images.length == 0) && { opacity: 0.5 }]} onPress={onSubmit} disabled={!isValidate() || images.length == 0}>
                                                  <Text style={[styles.addBtnText]}>Publier le produit</Text>
                                        </TouchableOpacity>
                              </ScrollView>
                              <Modalize
                                        ref={produitsModalizeRef}
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
                                        <ProduitsModalize />
                              </Modalize>
                              <Modalize
                                        ref={categoriesModalizeRef}
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
                                        <CategoriesModalize />
                              </Modalize>
                              <Modalize
                                        ref={subCategoriesModalizeRef}
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
                                        <SubCategoriesModalize />
                              </Modalize>
                              <Modalize
                                        ref={sizeModalizeRef}
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
                                        <SizesModalize />
                              </Modalize>
                              <Modalize
                                        ref={detailsModalizeRef}
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
                                        <DetailsModalize />
                              </Modalize>
                              {/* <DeclareModal  sizes={sizes} selectedSize={selectedSize} onSizeSelect={onSizeSelect} onClose={() => setshowVaccins(false)} /> */}



                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          title: {
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    marginVertical: 40
          },
          selectControl: {
                    paddingHorizontal: 20,
                    marginTop: 10
          },
          product: {
                    maxWidth: 900,
                    maxHeight: 80,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 10,
                    marginVertical: 10,
                    marginHorizontal: 10,
          },
          quantite: {
                    color: '#777',
                    fontSize: 12,
                    lineHeight: 22,
                    fontWeight: "bold"
          },
          valeur: {
                    color: '#777',
                    fontSize: 30,
                    lineHeight: 40,
                    fontWeight: 'bold',
                    textAlign: "center"
          },
          selectLabel: {
                    fontWeight: "bold",
                    marginLeft: 5
          },
          selectedLabelContainer: {
                    borderWidth: 1,
                    borderColor: '#ddd',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 2
          },
          modalTitle: {
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 16
          },
          modalHeader: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 5
          },
          searchInput: {
                    borderRadius: 5,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderColor: COLORS.smallBrown
          },
          newProductBtn: {
                    backgroundColor: COLORS.ecommerceOrange,
                    paddingVertical: 8,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 5
          },
          newProductText: {
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold'
          },
          modalItem: {
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F1F1F1'
          },
          modalImageContainer: {
                    width: 60,
                    height: 60,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 60,
                    justifyContent: "center",
                    alignItems: "center"
          },
          modalImage: {
                    width: "85%",
                    height: "85%",
                    resizeMode: "center",
                    borderRadius: 100
          },
          itemTitle: {
                    fontWeight: "bold",
                    marginLeft: 10
          },
          input: {
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    height: 50,
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: 'bold',
                    paddingHorizontal: 10
          },
          addBtn: {
                    paddingVertical: 10,
                    minWidth: "90%",
                    alignSelf: "center",
                    backgroundColor: COLORS.ecommerceOrange,
                    borderRadius: 10,
                    paddingVertical: 15,
                    marginBottom: 10,
                    marginTop: 10
          },
          addBtnText: {
                    color: '#FFF',
                    fontWeight: "bold",
                    textAlign: "center",
          },
          addImager: {
                    width: 100,
                    height: 100,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5
          },
          images: {
                    flexDirection: "row"
          }
})