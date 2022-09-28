import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useForm } from '../../hooks/useForm';

export default function InscriptionPartenaireScreen() {
    const organisationInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const telephoneInputRef = useRef(null)
    const nifInputRef = useRef(null)
    const logoInputRef = useRef(null)
    const backgroundimageInputRef = useRef(null)
    const [data, handleChange, setValue] = useForm({
        organisation: "",
        email: "",
        telephone: "",
        nif: "",
        logo: "",
        backgroundimage:""
})
    return (
        <>
            <ImageBackground source={require('../../../assets/images/g52.png')} style={styles.container}>
                <View style={{ backgroundColor: "#fff" }}>
                    <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                </View>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View>
                        <View style={styles.cardTitle}>
                            <Text style={styles.Title}>Compte Partenaire</Text>
                            <Text style={styles.description}> Chap Chap</Text>
                        </View>
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Nom organisation"
                                fontSize={14}

                            />
                        </View>
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Adresse email"
                                fontSize={14}

                            />
                        </View>
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Telephone"
                                fontSize={14}

                            />
                        </View>

                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Nif"
                                fontSize={14}

                            />
                        </View>
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Logo"
                                fontSize={14}

                            />
                        </View>
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Background Image"
                                fontSize={14}

                            />
                        </View>
                        <View style={styles.inputCard}>
                            <OutlinedTextField
                                label="Adresse Complete"
                                fontSize={14}

                            />
                        </View>

                    </View>
                </ScrollView>
            </ImageBackground>
        </>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        marginTop: 30,
        alignSelf: "center",
    },
    cardTitle: {
        flexDirection: "row",
        marginTop: 30,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    Title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    description: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1D8585"
    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 10
    },
})