import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export default function NewMenuDetailScreen(){
        const route = useRoute()
        const {product} = route.params
        console.log(product)
        return(
                <View>
                        <Text>bonjour</Text>
                </View>
        )
}