import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export default function NewMenuDetailScreen(){
        const route = useRoute()
        const navigation = useNavigation()
        const {menus} = route.params
        console.log(menus.result.IMAGES_1)

        // var IMAGES = [
        //         menus.produit_partenaire.IMAGE_1 ? product.produit_partenaire.IMAGE_1 : undefined,
        //         product.produit_partenaire.IMAGE_2 ? product.produit_partenaire.IMAGE_2 : undefined,
        //         product.produit_partenaire.IMAGE_3 ? product.produit_partenaire.IMAGE_3 : undefined,
        // ]
        return(
                <View>
                        <Text>bonjour</Text>
                </View>
        )
}