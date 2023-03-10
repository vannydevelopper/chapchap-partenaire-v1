import React, { useEffect, useRef, useCallback, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { DrawerActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { Portal } from "react-native-portalize";
import useFetch from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { COLORS } from "../../styles/COLORS";
import { SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import fetchApi from "../../helpers/fetchApi";
import Loading from "../../components/app/Loading";

export default function NewMenuScree() {
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)
          const [isLoading, setIsLoading] = useState(false)

          const navigation = useNavigation()

          const repasModalizeRef = useRef(null)
          const categoriesModalizeRef = useRef(null)
          const sousCategoriesModalizeRef = useRef(null)
          const sousSousCategoriesModalizeRef = useRef(null)
          const unitesModalizeRef = useRef(null)
          const typesModalizeRef = useRef(null)

          const [data, handleChange] = useForm({
                    typess: null,
                    repas: null,
                    category: null,
                    subcategory: null,
                    subSubcategory: null,
                    unity: null,
                    quantite: "",
                    descriptionTaille: "",
                    montant: ""
          })
          // console.log(data.typess)
          const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                    repas: {
                              required: true,
                    },
                    category: {
                              required: true,
                    },
                    descriptionTaille: {
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
                    repas: {
                              required: "Veuillez choisir le produit",
                    },
                    category: {
                              required: "Veuillez choisir la cat??gorie",
                    },
                    descriptionTaille: {
                              length: "La description du produit ne peut pas d??passer 3000 caract??res"
                    },
                    quantite: {
                              required: "La quantit?? est obligatoire",
                              length: "Quantit?? invalide"
                    },
                    montant: {
                              required: "Le prix unitaire est obligatoire",
                              length: "Prix unitaire invalide"
                    }
          })

          const nomRef = useRef(null)
          const descriptionrepasRef = useRef(null)
          const quantiteRef = useRef(null)
          const descriptionTailleRef = useRef(null)
          const amountRef = useRef(null)

          const [types, setTypes] = useState([])
          const [loadingTypes, setLoadingTypes] = useState(true)

          const [repas, setRepas] = useState([])
          const [loadingRepas, setLoadingRepas] = useState(true)

          const [categories, setCategories] = useState([])
          const [loadingCategories, setLoadingCategories] = useState(true)

          const [sousCategorie, setSousCategorie] = useState([])
          const [loadingSousCategorie, setLoadingSousCategorie] = useState(true)

          const [sousSousCategorie, setSousSousCategorie] = useState([])
          const [loadingSousSousCategorie, setLoadingSousSousCategorie] = useState(true)

          const [unites, setUnites] = useState([])
          const [loadingUnites, setLoadingUnites] = useState(true)

          const [images, setImages] = useState([])

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

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        var url = "/resto/menu/types"
                                        const type = await fetchApi(url)
                                        setTypes(type.result)
                                        // console.log(type.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingRepas(false)
                              }
                    })()
          }, []))

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        // var url = `/resto/menu/repas/${data.typess.ID_TYPE_REPAS}`
                                        const type = await fetchApi(`/resto/menu/repas/${data.typess.ID_TYPE_REPAS}`)
                                        setRepas(type.result)
                                        // console.log(repa.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingRepas(false)
                              }
                    })()
          }, [data]))

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        var url = "/resto/menu/categories"
                                        const categorie = await fetchApi(url)
                                        setCategories(categorie.result)
                                        // console.log(categorie.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingCategories(false)
                              }
                    })()
          }, []))

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        var url = "/resto/menu/souscategories"
                                        const souscategorie = await fetchApi(url)
                                        setSousCategorie(souscategorie.result)
                                        // console.log(souscategorie.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingSousCategorie(false)
                              }
                    })()
          }, []))

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        var url = "/resto/menu/soussouscategories"
                                        const soussouscategorie = await fetchApi(url)
                                        setSousSousCategorie(soussouscategorie.result)
                                        // console.log(soussouscategorie.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingSousSousCategorie(false)
                              }
                    })()
          }, []))

          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        var url = "/resto/menu/unites"
                                        const unites = await fetchApi(url)
                                        setUnites(unites.result)
                                        // console.log(unites.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingUnites(false)
                              }
                    })()
          }, []))

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
                              form.append("DESCRIPTION", data.repas.ID_REPAS)
                              form.append("ID_CATEGORIE_MENU", data.category.ID_CATEGORIE_MENU)
                              form.append("ID_SOUS_CATEGORIE_MENU", data.subcategory.ID_SOUS_CATEGORIE_MENU)
                              if (data.subSubcategory != null) {
                                        form.append("ID_SOUS_SOUS_CATEGORIE", data.subSubcategory.ID_SOUS_SOUS_CATEGORIE)
                              }
                              form.append("QUANTITE", data.quantite)
                              form.append("DESCRIPTION_TAILLE", data.descriptionTaille)
                              form.append("ID_UNITE", data.unity.ID_UNITE)
                              form.append("MONTANT", data.montant)

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
                              console.log(form)
                              const newMenu = await fetchApi('/resto/menu/create', {
                                        method: "POST",
                                        body: form
                              })
                              navigation.navigate("NewMenuDetailScreen", { menus: newMenu })
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setIsLoading(false)
                    }
          }

          const TypesModalize = () => {
                    return (
                              <View style={styles.modalContainer}>
                                        <View style={styles.modalHeader}>
                                                  <Text style={styles.modalTitle}>Les types de repas</Text>
                                                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                      <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </TouchableOpacity>
                                                  </View>
                                        </View>
                                        {types.map((type, index) => {
                                                  return (
                                                            <TouchableNativeFeedback
                                                                      onPress={() => {
                                                                                handleChange("typess", type)
                                                                                typesModalizeRef.current.close()
                                                                      }} key={index.toString()}>
                                                                      <View style={styles.modalItem}>
                                                                                {/* <View style={styles.modalImageContainer}>
                                                                <Image style={styles.modalImage} source={{ uri: produit.IMAGE }} />
                                                        </View> */}
                                                                                <Text style={styles.itemTitle}>{type.DESCRIPTION}</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                  )
                                        })}

                              </View>
                    )
          }

          const RepasModalize = () => {
                    return (
                              (loadingForm || loadingRepas) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :

                                        <View style={styles.modalContainer}>
                                                  <View style={styles.modalHeader}>
                                                            <Text style={styles.modalTitle}>Les repas</Text>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>

                                                  {repas.map((repa, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback onPress={() => {
                                                                                handleChange("repas", repa)
                                                                                repasModalizeRef.current.close()
                                                                      }} key={index.toString()}>
                                                                                <View style={[styles.modalItem, repa.ID_REPAS == data.repas?.ID_REPAS && { backgroundColor: '#ddd' }]} >
                                                                                          {/* <View style={styles.modalImageContainer}>
                                                                <Image style={styles.modalImage} source={{ uri: produit.IMAGE }} />
                                                        </View> */}
                                                                                          <Text style={styles.itemTitle}>{repa.DESCRIPTION}</Text>
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
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                                  {categories.map((categorie, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback onPress={() => {
                                                                                handleChange("category", categorie)
                                                                                categoriesModalizeRef.current.close()
                                                                      }} key={index.toString()}>
                                                                                <View style={[styles.modalItem, categorie.ID_CATEGORIE_MENU == data.category?.ID_CATEGORIE_MENU && { backgroundColor: '#ddd' }]} >
                                                                                          {/* <View style={styles.modalImageContainer}>
                                                                                        <Image style={styles.modalImage} source={{ uri: produit.IMAGE }} />
                                                                                </View> */}
                                                                                          <Text style={styles.itemTitle}>{categorie.NOM}</Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                    )
          }

          const SousCategoriesModalize = () => {
                    return (
                              (loadingForm || loadingSousCategorie) ? <ActivityIndicator
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
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                                  {sousCategorie.map((sousCateg, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback onPress={() => {
                                                                                handleChange("subcategory", sousCateg)
                                                                                sousCategoriesModalizeRef.current.close()
                                                                      }} key={index.toString()}>
                                                                                <View style={[styles.modalItem, sousCateg.ID_SOUS_CATEGORIE_MENU == data.subcategory?.ID_SOUS_CATEGORIE_MENU && { backgroundColor: '#ddd' }]} >
                                                                                          {/* <View style={styles.modalImageContainer}>
                                                                                        <Image style={styles.modalImage} source={{ uri: produit.IMAGE }} />
                                                                                </View> */}
                                                                                          <Text style={styles.itemTitle}>{sousCateg.NOM}</Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                    )
          }

          const SousSousCategoriesModalize = () => {
                    return (
                              (loadingForm || loadingSousSousCategorie) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                                        <View style={styles.modalContainer}>
                                                  <View style={styles.modalHeader}>
                                                            <Text style={styles.modalTitle}>Les des sous categories</Text>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                                  {sousSousCategorie.map((soussousCateg, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback onPress={() => {
                                                                                handleChange("subSubcategory", soussousCateg)
                                                                                sousSousCategoriesModalizeRef.current.close()
                                                                      }} key={index.toString()} >
                                                                                <View style={[styles.modalItem, soussousCateg.ID_SOUS_SOUS_CATEGORIE == data.subSubcategory?.ID_SOUS_SOUS_CATEGORIE && { backgroundColor: '#ddd' }]} >
                                                                                          {/* <View style={styles.modalImageContainer}>
                                                                                        <Image style={styles.modalImage} source={{ uri: produit.IMAGE }} />
                                                                                </View> */}
                                                                                          <Text style={styles.itemTitle}>{soussousCateg.DESCRIPTION}</Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                    )
          }

          const UnitesModalize = () => {
                    return (
                              (loadingForm || loadingUnites) ? <ActivityIndicator
                                        animating
                                        size={"small"}
                                        color='#777'
                                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                              /> :
                                        <View style={styles.modalContainer}>
                                                  <View style={styles.modalHeader}>
                                                            <Text style={styles.modalTitle}>Les des sous categories</Text>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                                                                <SimpleLineIcons name="grid" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                                  {unites.map((unite, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback
                                                                                onPress={() => {
                                                                                          handleChange("unity", unite)
                                                                                          unitesModalizeRef.current.close()
                                                                                }} key={index.toString()} >
                                                                                <View style={[styles.modalItem, unite.ID_UNITE == data.unity?.ID_UNITE && { backgroundColor: '#ddd' }]} >
                                                                                          {/* <View style={styles.modalImageContainer}>
                                                        <Image style={styles.modalImage} source={{ uri: produit.IMAGE }} />
                                                </View> */}
                                                                                          <Text style={styles.itemTitle}>{unite.UNITES_MESURES}</Text>
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
                                        <View style={styles.header}>
                                                  <Text style={styles.title}>Nouveau menu</Text>
                                                  <TouchableNativeFeedback useForeground onPress={() => navigation.goBack()}>
                                                            <View style={styles.cancelBtn}>
                                                                      <Ionicons name="close" size={30} color="#777" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Type de repas</Text>
                                                  <TouchableOpacity style={styles.selectedLabelContainer}
                                                            onPress={() => {
                                                                      setIsOpen(true)
                                                                      typesModalizeRef.current?.open()
                                                            }}>
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.typess ? data.typess.DESCRIPTION : "Aucun type de repas selectionn??"}
                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Nom du repas</Text>
                                                  <TouchableOpacity style={styles.selectedLabelContainer}
                                                            onPress={() => {
                                                                      setIsOpen(true)
                                                                      repasModalizeRef.current?.open()
                                                            }}
                                                  >
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.repas ? data.repas.DESCRIPTION : " Aucun Nom du repas selectionn??"}
                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Cat??gorie</Text>
                                                  <TouchableOpacity style={styles.selectedLabelContainer}
                                                            onPress={() => {
                                                                      setIsOpen(true)
                                                                      categoriesModalizeRef.current?.open()
                                                            }}
                                                  >
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.category ? data.category.NOM : "Aucune cat??gorie selectionn??"}
                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Sous cat??gorie</Text>
                                                  <TouchableOpacity style={styles.selectedLabelContainer}
                                                            onPress={() => {
                                                                      setIsOpen(true)
                                                                      sousCategoriesModalizeRef.current?.open()
                                                            }}
                                                  >
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.subcategory ? data.subcategory.NOM : "Aucun sous-cat??gorie selectionn??"}
                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Plus de pr??cision</Text>
                                                  <TouchableOpacity style={styles.selectedLabelContainer}
                                                            onPress={() => {
                                                                      setIsOpen(true)
                                                                      sousSousCategoriesModalizeRef.current?.open()
                                                            }}
                                                  >
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.subSubcategory ? data.subSubcategory.DESCRIPTION : "Aucune autre precision selectionn??"}
                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>

                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>
                                                            Taille
                                                  </Text>
                                                  <TextInput
                                                            ref={quantiteRef}
                                                            style={styles.input}
                                                            value={data.quantite}
                                                            onChangeText={e => handleChange("quantite", e)}
                                                            //  onFocus={() => setIsAmountFocused(true)}
                                                            placeholder="Taille de votre repas"
                                                            //  onBlur={() => {
                                                            //            setIsAmountFocused(false)
                                                            //  }}
                                                            keyboardType="decimal-pad"
                                                            returnKeyType="next"
                                                            //  onSubmitEditing={() => priceRef.current.focus()}
                                                            blurOnSubmit={false}
                                                  />
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Unit?? de la taille</Text>
                                                  <TouchableOpacity style={styles.selectedLabelContainer}
                                                            onPress={() => {
                                                                      setIsOpen(true)
                                                                      unitesModalizeRef.current?.open()
                                                            }}
                                                  >
                                                            <Text style={styles.selectedLabel} >
                                                                      {data.unity ? data.unity.UNITES_MESURES : "cl, mm..."}

                                                            </Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Titre de la taille</Text>
                                                  <TextInput
                                                            ref={descriptionTailleRef}
                                                            style={styles.input}
                                                            value={data.descriptionTaille}
                                                            onChangeText={e => handleChange("descriptionTaille", e)}
                                                            // onFocus={() => setIsDescFocused(true)}
                                                            placeholder="Plat..."
                                                            // onBlur={() => {
                                                            //         setIsDescFocused(false)
                                                            // }}
                                                            multiline
                                                  />
                                        </View>
                                        <View style={styles.selectControl}>
                                                  <Text style={styles.selectLabel}>Montant</Text>
                                                  <TextInput
                                                            ref={amountRef}
                                                            style={styles.input}
                                                            value={data.montant}
                                                            onChangeText={e => handleChange("montant", e)}
                                                            //  onFocus={() => setIsAmountFocused(true)}
                                                            placeholder="Combien co??te un plat ?"
                                                            //  onBlur={() => {
                                                            //            setIsAmountFocused(false)
                                                            //  }}
                                                            keyboardType="decimal-pad"
                                                            returnKeyType="next"
                                                            //  onSubmitEditing={() => priceRef.current.focus()}
                                                            blurOnSubmit={false}
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

                                        <TouchableOpacity style={styles.addBtn} onPress={onSubmit}>
                                                  <Text style={styles.addBtnText}>Publier un menu</Text>
                                        </TouchableOpacity>

                              </ScrollView>
                              <Modalize
                                        ref={typesModalizeRef}
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
                                        <TypesModalize />
                              </Modalize>
                              <Modalize
                                        ref={repasModalizeRef}
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
                                        <RepasModalize />
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
                                        ref={sousCategoriesModalizeRef}
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
                                        <SousCategoriesModalize />
                              </Modalize>
                              <Modalize
                                        ref={sousSousCategoriesModalizeRef}
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
                                        <SousSousCategoriesModalize />
                              </Modalize>
                              <Modalize
                                        ref={unitesModalizeRef}
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
                                        <UnitesModalize />
                              </Modalize>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          header: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20
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
          images: {
                    flexDirection: "row"
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
          detailBouton: {
                    paddingVertical: 10,
                    minWidth: "100%",
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
})