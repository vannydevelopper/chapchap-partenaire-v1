import React, { useCallback, useState } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { DrawerActions, useFocusEffect, useNavigation, useNavigationBuilder, useRoute } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { COLORS } from '../../styles/COLORS';
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";

export default function AccueilSearchProduitScreen() {
        const navigation = useNavigation()
        const dispatch = useDispatch()

        const [allProduits, setAllProduits] = useState([])

        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                const produi = await fetchApi("/produit")
                                setAllProduits(produi.result)
                                // console.log(produi.result)
                        }
                        catch (error) {
                                console.log(error)
                        }
                })()
        }, []))
        return (
                <>
                        <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                        <View style={styles.container}>
                                <View style={styles.cardHeader}>
                                        <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                                <View style={styles.menuOpenerLine} />
                                                <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                        </TouchableOpacity>
                                        <View style={styles.imageContainer}>
                                                <Image source={require('../../../assets/images/chapchap.png')} style={styles.logo} />
                                        </View>
                                        <View style={{ marginTop: 25 }}>
                                                <Octicons name="bell" size={24} color={COLORS.primary} />
                                        </View>
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                                        <Text style={styles.title}>Le nouveau produit</Text>
                                </View>
                                <View style={styles.cardDescreption}>
                                        <ScrollView showsVerticalScrollIndicator={false} >
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                        <Text style={styles.title2} >Le nouveau produit</Text>
                                                        <Ionicons name="ios-search-sharp" size={24} color="black" />
                                                </View>
                                                <TouchableNativeFeedback onPress={() => navigation.navigate("ProduitFormulaireScreen", {product:false})}>
                                                        <View style={styles.cardComplet}>

                                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                        <View style={{ ...styles.cardIcon, alignItems: "center", justifyContent: "center" }}>
                                                                                <MaterialCommunityIcons name="plus" size={30} color="black" />
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1, marginLeft: 5 }}>
                                                                                <View>
                                                                                        <Text style={{ fontWeight: "bold" }}>Creation de nouveau produit</Text>
                                                                                </View>
                                                                                <AntDesign name="right" size={24} color="black" />

                                                                        </View>

                                                                </View>
                                                        </View>
                                                </TouchableNativeFeedback>

                                                {allProduits.map((produit, index) => {
                                                        return (
                                                                <TouchableOpacity style={styles.cardComplet} key={index} onPress={()=>navigation.navigate("ProduitFormulaireScreen",{product:produit})}>
                                                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                                <View style={styles.cardIcon1}>
                                                                                        {/* <MaterialIcons name="home" size={24} color="black" /> */}
                                                                                        <Image source={{uri: produit.produit.IMAGE_1}} style={styles.image}/>
                                                                                </View>
                                                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1, marginLeft: 5 }}>
                                                                                        <View>
                                                                                                <Text style={{ fontWeight: "bold" }}>{produit.produit.NOM}</Text>
                                                                                                <Text>{produit.produit.NOM_CATEGORIE}</Text>
                                                                                        </View>
                                                                                        <AntDesign name="right" size={24} color="black" />
                                                                                </View>
                                                                        </View>
                                                                </TouchableOpacity>
                                                        )
                                                })}

                                        </ScrollView>
                                </View>

                        </View>
                </>
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
                paddingHorizontal: 20,
                height: 88
        },
        menuOpener: {
                marginTop: 25
        },
        menuOpenerLine: {
                height: 3,
                width: 30,
                backgroundColor: COLORS.primary,
                marginTop: 5
        },
        logo: {
                resizeMode: 'center',
                height: "50%",
                width: "50%",
                marginTop: 25
        },
        imageContainer: {
                height: "100%",
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
        },
        cardDescreption: {
                padding: 15,
                backgroundColor: "#D3D3D3",
                marginTop: 20,
                flex: 1,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25
        },
        title: {
                fontWeight: 'bold',
                fontSize: 25,
                fontWeight: "bold",
                marginBottom: 12,
                color: COLORS.ecommercePrimaryColor,
                margin: 20,
                textAlign: "center"
        },
        title2: {
                fontWeight: 'bold',
                fontSize: 15,
                fontWeight: "bold",
                color: COLORS.ecommercePrimaryColor,
                margin: 10,
        },
        cardComplet: {
                padding: 15,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginTop: 10,
                borderWidth: 1,
                borderColor: "#777"
        },
        cardIcon: {
                width: 35,
                height: 35,
        },
        cardIcon1: {
                width: 35,
                height: 35,
                backgroundColor: "#DCDCDC",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
        },
        image: {
                height: "90%",
                width: "90%",
                resizeMode: 'contain',
                borderRadius:10
      },
})