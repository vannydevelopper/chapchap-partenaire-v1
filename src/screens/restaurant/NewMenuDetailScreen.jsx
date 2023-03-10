import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar, Modal } from "react-native"
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import Product from "../../components/ecommerce/main/Product";
import { Entypo } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { useRef } from "react";
import ProductImages from "../../components/restaurant/details/ProductImages"


export default function NewMenuDetailScreen() {
        const route = useRoute()
        const navigation = useNavigation()
        const { menus } = route.params
         

        var IMAGES = [
                menus.result.IMAGES_1 ? menus.result.IMAGES_1 : undefined,
                menus.result.IMAGES_2 ? menus.result.IMAGES_2 : undefined,
                menus.result.IMAGES_3 ? menus.result.IMAGES_3 : undefined,
        ]
        
        return (
                <>
                        <View style={{ marginTop: 0, flex: 1 }}>
                                <View style={styles.cardHeader}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                                <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <TouchableOpacity style={{ marginRight: 20 }}>
                                                        <Entypo name="dots-three-vertical" size={24} color="black" />
                                                </TouchableOpacity>
                                        </View>
                                </View>
                                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                        <ProductImages images={IMAGES} />
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10 }}>
                                                <View>
                                                        <TouchableOpacity style={styles.category} >
                                                                <Entypo name="shopping-cart" size={24} color={COLORS.primary} />
                                                                <Text style={styles.categoryName} numberOfLines={2}>{menus.result.categorie} .     </Text>
                                                                <Text style={styles.categoryName} numberOfLines={2}>{menus.result.repas}</Text>

                                                        </TouchableOpacity>
                                                        {/* <View style={styles.productNames}>
                                                                <Text style={styles.productName}>
                                                                        <Text numberOfLines={2} style={styles.productName}>{menus.result.NOM_MENU}</Text>
                                                                </Text>
                                                        </View> */}
                                                </View>
                                                <View style={styles.shareBtn}>
                                                        <AntDesign name="sharealt" size={20} color={COLORS.primary} />
                                                </View>
                                        </View>
                                       
                                        <View style={{ marginTop: 15,marginHorizontal:10 ,marginTop:40}} >
                                        <Text style={styles.txtDisplay}>
                                     {menus.result.DESCRIPTION}</Text>
                              </View>
                                </ScrollView>
                        </View>
                        <View style={styles.productFooter}>
                                 <Text style={styles.productPrice}>{menus.result.PRIX} Fbu</Text> 
                                <TouchableOpacity style={[styles.addCartBtn]} >
                                        <>
                                                <View>
                                                        <Ionicons name="cart" size={24} color="#fff" />
                                                </View>
                                                <Text style={styles.addCartBtnTitle}>
                                                        Booster
                                                </Text>
                                        </>
                                </TouchableOpacity>
                        </View>
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
        category: {
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
        },
        categoryName: {
                fontWeight: "bold",
                fontSize: 13,
                color: COLORS.primary,
                marginLeft: 5
        },
        productNames: {
                marginTop: 5
        },
        txtDisplay: {
                color: '#191970',
                fontSize: 15,
                fontWeight: 'bold',
                opacity: 0.4
      },
        productName: {
                fontWeight: "bold",
                fontSize: 18,
                color: COLORS.ecommercePrimaryColor
        },
        cardMenu: {
                width: 120,
                height: 120,
                backgroundColor: '#F1F1F1',
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                margin: 10
        },
        card: {
                flexDirection: "row",
                flexWrap: 'wrap',
                justifyContent: "center"

        },
        productFooter: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
        },
        productPrice: {
                fontWeight: "bold",
                fontSize: 22
        },
        addCartBtn: {
                borderRadius: 30,
                backgroundColor: COLORS.ecommerceOrange,
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center"
        },
        addCartBtnTitle: {
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold'
        },
})