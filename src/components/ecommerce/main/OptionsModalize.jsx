import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity, Alert } from "react-native";
import { Modalize } from 'react-native-modalize'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome5, AntDesign, FontAwesome } from '@expo/vector-icons'

export default function OptionsModalize({ optionModalizeRef }) {
        const onDeleteProducts = () => {
                optionModalizeRef.current.close()
                Alert.alert(
                        "Suppression du produit",
                        "Suppression du produit"

                        [
                                {
                                        text:"NON",
                                        style: "Cancel"
                                },
                                {
                                        text:"OUI",
                                         onPress: async () => {
                                               console.log("supprimer")
                                        }
                                }
                        ]
                )
        }

        const onEditProduct = () =>{
                optionModalizeRef.current.close()
        }
        return (
                <Modalize
                        ref={optionModalizeRef}
                        adjustToContentHeight
                        // modalHeight={280}
                        handlePosition='inside'
                        scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
                >
                        <View style={styles.modalContainer}>
                                <View >
                                        <View style={styles.modalAction}>
                                                <View style={styles.actionLabels}>
                                                        <Text style={styles.modalActionText}>
                                                                Modification du Produit
                                                        </Text>
                                                </View>
                                                <TouchableOpacity style={styles.actionIcon} onPress={onEditProduct}>
                                                        <Feather name="edit-3" size={24} color="black" />
                                                </TouchableOpacity>
                                        </View>
                                </View>
                                <View >
                                        <View style={styles.modalAction}>
                                                <View style={styles.actionLabels}>
                                                        <Text style={styles.modalActionText}>
                                                                Suppression d'un produit
                                                        </Text>
                                                </View>
                                                <TouchableOpacity style={styles.actionIcon} onPress={onDeleteProducts}>
                                                        <Feather name="trash" size={24} color="red" />
                                                </TouchableOpacity>
                                        </View>
                                </View>
                        </View>
                </Modalize>

        )
}

const styles = StyleSheet.create({
        modalContainer: {
                padding: 10
        },
        modalAction: {
                flexDirection: "row",
                alignItems: "center",
                // padding: 10,
                paddingVertical: 10,
                justifyContent: "space-between"

        },
        actionIcon: {
                width: 40,
                height: 40,
                justifyContent: "center",
                backgroundColor:"#ddd",
                borderRadius:50,
                alignItems:"center"
        },
        actionLabels: {
                marginLeft: 10
        },
        modalActionText: {
                fontWeight: "bold"
        },
        modalActionDescription: {
                color: '#777',
                fontSize: 12
        },
})