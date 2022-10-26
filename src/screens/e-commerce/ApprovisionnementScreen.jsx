import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ApprovisionnementScreen(){
        const route = useRoute()
        const navigation = useNavigation()
        const {detail} = route.params
        console.log(detail)
        return(
                <View>
                        <Text>Approvionnement</Text>
                </View>
        )
}

const styles = StyleSheet.create({
        
})