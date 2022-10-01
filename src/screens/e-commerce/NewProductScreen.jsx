import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import fetchApi from "../../helpers/fetchApi";
import useFetch from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { COLORS } from "../../styles/COLORS";
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

export default function NewProductSreen() {

          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)
          
          const produitsModalizeRef = useRef(null)
          const categoriesModalizeRef = useRef(null)
          const subCategoriesModalizeRef = useRef()

          const [data, handleChange] = useForm({
                    produit: null,
                    category: null,
                    subCategory: null,
                    nom: "",
                    description: "",
                    quantite: "",
                    montant: "",
                    image_1: "",
                    image_2: "",
                    image_3: "",
          })

          const [produits, setProduits] = useState([])
          const [loadingProduits, setLoadingProduits] = useState(true)

          const [categories, setCategories] = useState([])
          const [loadingCategories, setLoadingCategories] = useState(true)

          const [subCategories, setSubCategories] = useState([])
          const [loadingSubCategories, setLoadingSubCategories] = useState(true)

          const [isFocused, setIsFocused] = useState(false)
          const [isDescFocused, setIsDescFocused] = useState(false)
          const [isAmountFocused, setIsAmountFocused] = useState(false)
          const [isPriceFocused, setIsPriceFocused] = useState(false)

          const descriptionRef = useRef(null)
          const amountRef = useRef(null)
          const priceRef = useRef(null)

          const fetchProduits = async () => {
                    try {
                              const pdts = await fetchApi('/partenaire/produits')
                              setProduits(pdts)
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingProduits(false)
                    }
          }

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

          useEffect(() => {
                    fetchProduits()
                    fetchCategories()
          }, [])

          useEffect(() => {
                    if(data.category) {
                              fetchSubCategories()
                    }
          }, [data])

          useEffect(() => {
                    if(isOpen) {
                              const timer = setTimeout(() => {
                                        setLoadingForm(false)
                              })
                              return () => {
                                        clearTimeout(timer)
                              }
                    }
          }, [isOpen])

          const ProduitsModalize = () => {
                    return (
                              (loadingForm || loadingProduits) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                              <View style={styles.modalContainer}>
                                        <Text style={styles.modalTitle}>Les produits</Text>
                                        <View style={styles.modalHeader}>
                                                  <TouchableOpacity style={styles.newProductBtn}>
                                                            <Text style={styles.newProductText}>Nouveau</Text>
                                                  </TouchableOpacity>
                                                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor}  />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                      <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </TouchableOpacity>
                                                  </View>
                                        </View>
                                        {produits.result?.map((produit, index) => {
                                                  return (
                                                            <TouchableNativeFeedback onPress={() => {
                                                                      handleChange("produit", produit)
                                                                      produitsModalizeRef.current.close()
                                                            }}
                                                            key={produit.ID_PRODUIT.toString()}>
                                                                      <View style={[styles.modalItem,  produit.ID_PRODUIT == data.produit?.ID_PRODUIT && { backgroundColor: '#ddd'}]}>
                                                                                <View style={styles.modalImageContainer}>
                                                                                          <Image style={styles.modalImage} source={{ uri: produit.IMAGE}} />
                                                                                </View>
                                                                                <Text style={styles.itemTitle}>{ produit.NOM }</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                  )
                                        })}
                              </View>
                    )
          }

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
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor}  />
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
                                                                      <View style={[styles.modalItem,  produit.ID_CATEGORIE_PRODUIT == data.category?.ID_CATEGORIE_PRODUIT && { backgroundColor: '#ddd'}]} >
                                                                                <View style={styles.modalImageContainer}>
                                                                                          <Image style={styles.modalImage} source={{ uri: produit.IMAGE}} />
                                                                                </View>
                                                                                <Text style={styles.itemTitle}>{ produit.NOM }</Text>
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
                                                  <Text style={styles.modalTitle}>Les sous categories</Text>
                                                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor}  />
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
                                                                      <View style={[styles.modalItem,  produit.ID_PRODUIT_SOUS_CATEGORIE == data.category?.ID_PRODUIT_SOUS_CATEGORIE && { backgroundColor: '#ddd'}]}>
                                                                                <Text style={[styles.itemTitle, { marginLeft: 0 }]}>{ produit.NOM_SOUS_CATEGORIE }</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                  )
                                        })}
                              </View>
                    )
          }
          return (
                    <ScrollView style={styles.container}>
                              <Text style={styles.title}>Nouveau produit</Text>
                              <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Produit</Text>
                                        <TouchableOpacity style={[styles.selectedLabelContainer]} onPress={() => {
                                                  setIsOpen(true)
                                                  produitsModalizeRef.current?.open()
                                        }}>
                                                  <Text style={styles.selectedLabel} >
                                                            {data.produit ? data.produit.NOM : "Aucun produit selectionné"}
                                                  </Text>
                                        </TouchableOpacity>
                              </View>
                              <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Nom du produit</Text>
                                        <TextInput
                                                  style={[styles.input, isFocused && { borderColor: COLORS.primary}]}
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
                                        <Text style={styles.selectLabel}>Description du produit</Text>
                                        <TextInput
                                                  ref={descriptionRef}
                                                  style={[styles.input, isDescFocused && { borderColor: COLORS.primary}]}
                                                  value={data.description}
                                                  onChangeText={e => handleChange("description", e)}
                                                  onFocus={() => setIsDescFocused(true)}
                                                  placeholder="Décrire votre produit(facultatif)"
                                                  onBlur={() => {
                                                            setIsDescFocused(false)
                                                  }}
                                                  returnKeyType="next"
                                                  onSubmitEditing={() => amountRef.current.focus()}
                                                  blurOnSubmit={false}
                                        />
                              </View>
                              <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Quantité</Text>
                                        <TextInput
                                                  ref={amountRef}
                                                  style={[styles.input, isAmountFocused && { borderColor: COLORS.primary}]}
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
                              <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Prix unitaire</Text>
                                        <TextInput
                                                  ref={priceRef}
                                                  style={[styles.input, isPriceFocused && { borderColor: COLORS.primary}]}
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
                                        <TouchableWithoutFeedback>
                                                  <View style={styles.addImager}>
                                                            <Feather name="image" size={30} color="#777" />
                                                  </View>
                                        </TouchableWithoutFeedback>
                              </View>
                              <TouchableOpacity style={styles.addBtn}>
                                        <Text style={styles.addBtnText}>Publier le produit</Text>
                              </TouchableOpacity>
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
                    </ScrollView>
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
          }
})