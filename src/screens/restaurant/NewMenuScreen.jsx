import React, { useEffect, useRef, useCallback, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { DrawerActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { Portal } from "react-native-portalize";
import useFetch from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { COLORS } from "../../styles/COLORS";
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import fetchApi from "../../helpers/fetchApi";

export default function NewMenuScreen() {
        const [isOpen, setIsOpen] = useState(false)
        const [loadingForm, setLoadingForm] = useState(true)
        const [isLoading, setIsLoading] = useState(false)

        const repasModalizeRef = useRef(null)
        const categoriesModalizeRef = useRef(null)
        const sousCategoriesModalizeRef = useRef(null)
        const sousSousCategoriesModalizeRef = useRef(null)
        const unitesModalizeRef = useRef(null)

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
                                var url = "/resto/menu/repas"
                                const repa = await fetchApi(url)
                                setRepas(repa.result)
                                // console.log(repa.result)
                        } catch (error) {
                                console.log(error)
                        } finally {
                                // setFirstLoadingMenus(false)
                        }
                })()
        }, []))

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
                                // setFirstLoadingMenus(false)
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
                                // setFirstLoadingMenus(false)
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
                                // setFirstLoadingMenus(false)
                        }
                })()
        }, []))

        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                var url = "/resto/menu/unites"
                                const unites = await fetchApi(url)
                                setUnites(unites.result)
                                console.log(unites.result)
                        } catch (error) {
                                console.log(error)
                        } finally {
                                // setFirstLoadingMenus(false)
                        }
                })()
        }, []))

        const RepasModalize = () => {
                return (
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
                                                        repasModalizeRef.current.close()
                                                }} key={index.toString()}>
                                                        <View style={styles.modalItem} >
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
                                                        categoriesModalizeRef.current.close()
                                                }} key={index.toString()}>
                                                        <View style={styles.modalItem} >
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
                                {sousCategorie.map((sousCateg, index) => {
                                        return (
                                                <TouchableNativeFeedback onPress={() => {
                                                        sousCategoriesModalizeRef.current.close()
                                                }} key={index.toString()}>
                                                        <View style={styles.modalItem} >
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
                                                        sousSousCategoriesModalizeRef.current.close()
                                                }} key={index.toString()} >
                                                        <View style={styles.modalItem} >
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
                                                                unitesModalizeRef.current.close()
                                                        }} key={index.toString()} >
                                                        <View style={styles.modalItem} >
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
                                <Text style={styles.title}>Nouveau Menu</Text>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Nom du repas</Text>
                                        <TouchableOpacity style={styles.selectedLabelContainer}
                                                onPress={() => {
                                                        setIsOpen(true)
                                                        repasModalizeRef.current?.open()
                                                }}
                                        >
                                                <Text style={styles.selectedLabel} >
                                                        Aucun Nom du repas selectionné
                                                </Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Categorie</Text>
                                        <TouchableOpacity style={styles.selectedLabelContainer}
                                                onPress={() => {
                                                        setIsOpen(true)
                                                        categoriesModalizeRef.current?.open()
                                                }}
                                        >
                                                <Text style={styles.selectedLabel} >
                                                        Aucune catégorie selectionné
                                                </Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Sous catégorie</Text>
                                        <TouchableOpacity style={styles.selectedLabelContainer}
                                                onPress={() => {
                                                        setIsOpen(true)
                                                        sousCategoriesModalizeRef.current?.open()
                                                }}
                                        >
                                                <Text style={styles.selectedLabel} >
                                                        Aucun sous-catégorie selectionné
                                                </Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Sous sous catégorie</Text>
                                        <TouchableOpacity style={styles.selectedLabelContainer}
                                                onPress={() => {
                                                        setIsOpen(true)
                                                        sousSousCategoriesModalizeRef.current?.open()
                                                }}
                                        >
                                                <Text style={styles.selectedLabel} >
                                                        Aucun sous-sous-catégorie selectionné
                                                </Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Nom du repas</Text>
                                        <TextInput
                                                // ref={descriptionRef}
                                                style={styles.input}
                                                // value={data.description}
                                                // onChangeText={e => handleChange("description", e)}
                                                // onFocus={() => setIsDescFocused(true)}
                                                placeholder="Décrire nom du repas"
                                                // onBlur={() => {
                                                //         setIsDescFocused(false)
                                                // }}
                                                multiline
                                        />
                                </View>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Description du repas</Text>
                                        <TextInput
                                                // ref={descriptionRef}
                                                style={styles.input}
                                                // value={data.description}
                                                // onChangeText={e => handleChange("description", e)}
                                                // onFocus={() => setIsDescFocused(true)}
                                                placeholder="Décrire leur description"
                                                // onBlur={() => {
                                                //         setIsDescFocused(false)
                                                // }}
                                                multiline
                                        />
                                </View>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Quantite</Text>
                                        <TextInput
                                                //  ref={amountRef}
                                                style={styles.input}
                                                //  value={data.quantite}
                                                //  onChangeText={e => handleChange("quantite", e)}
                                                //  onFocus={() => setIsAmountFocused(true)}
                                                placeholder="Combien de pièces à mettre en stock ?"
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
                                        <Text style={styles.selectLabel}>Description taille</Text>
                                        <TextInput
                                                // ref={descriptionRef}
                                                style={styles.input}
                                                // value={data.description}
                                                // onChangeText={e => handleChange("description", e)}
                                                // onFocus={() => setIsDescFocused(true)}
                                                placeholder="Décrire votre menu(facultatif)"
                                                // onBlur={() => {
                                                //         setIsDescFocused(false)
                                                // }}
                                                multiline
                                        />
                                </View>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Types des unites</Text>
                                        <TouchableOpacity style={styles.selectedLabelContainer}
                                                onPress={() => {
                                                        setIsOpen(true)
                                                        unitesModalizeRef.current?.open()
                                                }}
                                        >
                                                <Text style={styles.selectedLabel} >
                                                        Aucun unite selectionné
                                                </Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.selectControl}>
                                        <Text style={styles.selectLabel}>Montant</Text>
                                        <TextInput
                                                //  ref={amountRef}
                                                style={styles.input}
                                                //  value={data.quantite}
                                                //  onChangeText={e => handleChange("quantite", e)}
                                                //  onFocus={() => setIsAmountFocused(true)}
                                                placeholder="Combien d'argent"
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
                                        <Text style={styles.selectLabel}>Images du menu</Text>
                                        <View style={styles.images}>
                                                {/* <TouchableWithoutFeedback >
                                                        <Image style={[styles.addImager, index > 0 && { marginLeft: 10 }]} source={{ uri: image.uri }} />
                                                </TouchableWithoutFeedback> */}

                                                <TouchableWithoutFeedback >
                                                        <View style={styles.addImager}>
                                                                <Feather name="image" size={30} color="#777" />
                                                        </View>
                                                </TouchableWithoutFeedback>
                                        </View>
                                </View>

                                <TouchableOpacity style={styles.addBtn}>
                                        <Text style={styles.addBtnText}>Publier un menu</Text>
                                </TouchableOpacity>

                        </ScrollView>
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