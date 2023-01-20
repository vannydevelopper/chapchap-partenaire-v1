import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CradProduitCommande from "../../components/ecommerce/main/CradProduitCommande";

export default function SearchLivreurScreen() {
        const route = useRoute()
        const { commande } = route.params
        console.log(commande)
        return (
                <CradProduitCommande />
        )
}

const styles = StyleSheet.create({

})