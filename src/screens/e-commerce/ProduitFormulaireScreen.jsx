import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import useFetch from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { COLORS } from "../../styles/COLORS";
import { SimpleLineIcons, AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";


export default function ProduitFormulaireScreen() {
        return (
                <>
                        <View style={styles.container}>
                                <View style={styles.cardHeader}>
                                        <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                                <View style={styles.menuOpenerLine} />
                                                <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                        </TouchableOpacity>
                                        <View style={styles.imageContainer}>
                                                <Image source={require('../../../assets/images/chapchap.png')} style={styles.logo} />
                                        </View>
                                        <View style={{ marginTop: 25 }}>
                                                <Octicons name="bell" size={24} color={COLORS.primary} />
                                        </View>
                                </View>
                                <Text style={styles.title}>Nouveau</Text>
                                <ScrollView keyboardShouldPersistTaps="handled" style={{ marginBottom: 20 }}>
                                        <View>
                                                <View style={{ marginTop: 10 }}>
                                                        <TouchableOpacity style={styles.modalCard}>
                                                                <View >
                                                                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                Le type de partenaire
                                                                        </Text>
                                                                        <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                hhhsggss
                                                                        </Text>
                                                                </View>
                                                                <AntDesign name="caretdown" size={20} color="#777" />
                                                        </TouchableOpacity>
                                                </View>

                                                <View style={{ marginTop: 10 }}>
                                                        <TouchableOpacity style={styles.modalCard}>
                                                                <View >
                                                                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                Nom du produit
                                                                        </Text>
                                                                        <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                hhhsggss
                                                                        </Text>
                                                                </View>
                                                                <AntDesign name="caretdown" size={20} color="#777" />
                                                        </TouchableOpacity>
                                                </View>

                                                <View style={{ marginTop: 10 }}>
                                                        <TouchableOpacity style={styles.modalCard}>
                                                                <View >
                                                                        <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                Taille
                                                                        </Text>
                                                                        <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                hhhsggss
                                                                        </Text>
                                                                </View>
                                                                <AntDesign name="caretdown" size={20} color="#777" />
                                                        </TouchableOpacity>
                                                </View>

                                                <View style={styles.inputCard}>
                                                        <OutlinedTextField
                                                                label={"Quantite Total"}
                                                                fontSize={14}
                                                                // value={data.organisation}
                                                                // onChangeText={(newValue) => handleChange('organisation', newValue)}
                                                                // onBlur={() => checkFieldData('organisation')}
                                                                // error={hasError('organisation') ? getError('organisation') : ''}
                                                                lineWidth={0.5}
                                                                activeLineWidth={0.5}
                                                                baseColor={COLORS.smallBrown}
                                                                tintColor={COLORS.primary}
                                                        />
                                                </View>


                                        </View>
                                </ScrollView>
                        </View>
                </>
        )
}
const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        cardHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                height: 88
        },
        menuOpener: {
                marginTop: 25
        },
        menuOpenerLine: {
                height: 3,
                width: 30,
                backgroundColor: COLORS.primary,
                marginTop: 5
        },
        logo: {
                resizeMode: 'center',
                height: "50%",
                width: "50%",
                marginTop: 25
        },
        imageContainer: {
                height: "100%",
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
        },
        title: {
                fontWeight: 'bold',
                fontSize: 25,
                fontWeight: "bold",
                marginBottom: 12,
                color: COLORS.ecommercePrimaryColor,
                margin: 20
        },
        modalCard: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
                backgroundColor: "#fff",
                padding: 13,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "#ddd"
        },
        inputText: {
                color: '#777'
        },
        inputCard: {
                marginHorizontal: 20,
                marginTop: 10,

        },
})