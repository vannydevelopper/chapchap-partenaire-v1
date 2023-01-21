import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity, Alert } from "react-native";
import { Modalize } from 'react-native-modalize'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome5, AntDesign, FontAwesome } from '@expo/vector-icons'
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function OptionsModalize({ optionModalizeRef, isOpen, setIsOpen }) {
        const onDeleteBoutique = () => {
                optionModalizeRef.current.close()
                Alert.alert(
                        "Suppression de la boutique",
                        "Suppression de la boutique"

                        [
                        {
                                text: "NON",
                                style: "Cancel"
                        },
                        {
                                text: "OUI",
                                onPress: async () => {
                                        console.log("supprimer")
                                }
                        }
                        ]
                )
        }

        const onEditBoutique = () => {
                optionModalizeRef.current.close()
        }
        return (
                <>
                        <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                <Modalize
                                        ref={optionModalizeRef}
                                        adjustToContentHeight
                                        // modalHeight={280}
                                        handlePosition='inside'
                                        scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
                                        onClosed={() => {
                                                setIsOpen(false)
                                        }}
                                >
                                        <View style={styles.modalContainer}>
                                                <TouchableNativeFeedback>
                                                        <View style={styles.modalAction}>
                                                                <View style={styles.actionIcon} onPress={onEditBoutique}>
                                                                        <Feather name="edit-3" size={24} color="black" />
                                                                </View>
                                                                <View style={styles.actionLabels}>
                                                                        <Text style={styles.modalActionText}>
                                                                                Modification la boutique
                                                                        </Text>
                                                                </View>
                                                        </View>
                                                </TouchableNativeFeedback>
                                                <TouchableNativeFeedback>
                                                        <View style={styles.modalAction}>
                                                                <View style={styles.actionIcon} onPress={onDeleteBoutique}>
                                                                        <Feather name="trash" size={24} color="red" />
                                                                </View>
                                                                <View style={styles.actionLabels}>
                                                                        <Text style={styles.modalActionText}>
                                                                                Suppression la boutique
                                                                        </Text>
                                                                </View>

                                                        </View>
                                                </TouchableNativeFeedback>
                                        </View>
                                </Modalize>
                        </GestureHandlerRootView>
                </>

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
                backgroundColor: "#ddd",
                borderRadius: 50,
                alignItems: "center"
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