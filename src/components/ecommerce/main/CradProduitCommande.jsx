import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../styles/COLORS"
import LottieView from 'lottie-react-native';

/**
 * composant pour afficher les details des commandes afficher details avec statut
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 20/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function CradProduitCommande({ commande, index }) {
        return (
                <View style={styles.container}>
                        <TouchableOpacity style={styles.productImage}>
                                <Image source={{ uri: commande.details[0].IMAGE_1 }} style={styles.image} />
                        </TouchableOpacity>
                        <View style={styles.productDetails}>
                                <View style={styles.detailsHeader}>
                                        <View style={styles.productNames}>
                                                <Text numberOfLines={2} style={styles.productName}>{commande.details[0].NOM}</Text>
                                                <View>
                                                        <Text numberOfLines={2} style={styles.productName}>{commande.details[0].QUANTITE}</Text>
                                                </View>
                                        </View>
                                        {commande.details[0].PRIX ? <Text style={styles.unitPrice}>{commande.details[0].PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                                </View>
                                <View style={styles.detailsFooter}>
                                        <View></View>
                                        <View style={styles.cardTotal}>
                                                {commande.TOTAL ? <Text numberOfLines={1} style={styles.productPrice}>{commande.TOTAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                                        </View>

                                </View>
                        </View>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flexDirection: 'row',
                height: 100,
                // marginTop: 40,
                marginHorizontal: 10
        },
        productImage: {
                height: "100%",
                width: "30%",
                borderRadius: 10,
                backgroundColor: '#F1F1F1'
        },
        productDetails: {
                marginLeft: 10,
                justifyContent: 'space-between',
                flex: 1
        },
        productNames: {
                flexDirection: 'row',
                justifyContent: 'space-between'
        },
        productName: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        detailsFooter: {
                flexDirection: 'row',
                justifyContent: 'space-between',
        },
        cardTotal: {
                padding: 5,
                backgroundColor: "#ddd",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
        },
        image: {
                height: "100%",
                width: "100%",
                borderRadius: 10
        },
        unitPrice: {
                color: '#000',
                fontWeight: 'bold',
                fontSize: 12,
                color: '#777'
        },
       
})