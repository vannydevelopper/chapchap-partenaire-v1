import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CradProduitCommande(){
        return(
                <View style={styles.container}>
                        <TouchableOpacity style={styles.productImage}>

                        </TouchableOpacity>
                        <View style={styles.productDetails}>

                        </View>
                </View>
        )
}

const styles = StyleSheet.create({
        container:{
                flexDirection: 'row',
                height: 100,
                marginTop: 40
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
})