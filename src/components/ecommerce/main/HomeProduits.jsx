import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView } from "react-native";
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../../styles/COLORS"
import Product from "./Product";

/**
 * Le composant qui afficher les produits par categorie selectionner
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 22/1/2023
 * @returns 
 */

export default function HomeProduits({ products, category, title = "Tous les produits" }) {
        return (
                <View style={styles.homeProducts}>
                        <TouchableNativeFeedback
                                accessibilityRole="button"
                                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                        // onPress={() => navigation.navigate('AllProductsScreen', {
                        //         category, shop
                        // })}
                        >
                                <View style={styles.productsHeader}>
                                        <Text style={styles.title}>{title}</Text>
                                        <MaterialIcons name="navigate-next" size={24} color="black" />
                                </View>
                        </TouchableNativeFeedback>
                        <ScrollView
                                style={styles.products}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 10 }}
                        >
                                {products.map((product, index) => {
                                        return (
                                                <Product
                                                        product={product}
                                                        index={index}
                                                        totalLength={products.length}
                                                        key={index}
                                                />
                                        )
                                })}
                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        homeProducts: {
        },
        productsHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
                paddingVertical: 10,
                // paddingHorizontal: 10
        },
        title: {
                color: COLORS.ecommercePrimaryColor,
                fontSize: 17,
                fontWeight: "bold"
        },
        products: {
                // paddingHorizontal: 10,
        }
})