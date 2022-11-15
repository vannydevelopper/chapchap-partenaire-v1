import React, { useRef, useState, useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, BackHandler, Animated, TouchableWithoutFeedback, View, Keyboard } from "react-native"
import { useForm } from "../../hooks/useForm"
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle"
import { COLORS } from "../../styles/COLORS"
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { FontAwesome, Fontisto, EvilIcons, Feather, Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useCallback } from "react"
import { useSelector } from "react-redux"
import fetchApi from '../../helpers/fetchApi'
import Loading from '../app/Loading'
export default function EcocashModalize({ service, partenaire, info, loadingForm, onFInish }) {
    const [loading, setLoading] = useState(false)
    const [data, handleChange] = useForm({
        tel: "",
    })
    const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
        tel: {
            required: true,
            length: [8, 8]
        }
    }, {
        tel: {
            required: "Le numéro de téléphone est obligatoire",
            length: "Numéro de téléphone invalide"
        },
    })

    const onPay = async () => {
        try {
            Keyboard.dismiss()
            setLoading(true)
            setErrors({})
            let isnum = /^\d+$/.test(data.tel);
            if (!isnum) {
                return setError("tel", ["Numéro de téléphone invalide"])
            }
                const commande = await fetchApi('/service/payement', {
                    method: "POST",
                    body: JSON.stringify({
                        NUMERO: data.tel,
                        ID_PARTENAIRE_SERVICE: partenaire.result.ID_PARTENAIRE_SERVICE,
                        ID_SERVICE: partenaire.result.ID_SERVICE,
                    }),
                    headers: { "Content-Type": "application/json" },
                })
                // onFInish(commande.result)
                navigation.navigate('HomeScreen')
        } catch (error) {
            console.log(error)
            if (error.httpStatus == "UNPROCESSABLE_ENTITY") {
                return setError("tel", [error.message])
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        loadingForm ? <ActivityIndicator
            animating
            size={"small"}
            color='#777'
            style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
        /> :
            <View style={styles.container}>
                {loading && <Loading />}
                <Image source={info.image} style={styles.image} />
                <OutlinedTextField
                    label="Numéro ecocash"
                    fontSize={14}
                    baseColor={COLORS.smallBrown}
                    tintColor={COLORS.primary}
                    lineWidth={0.5}
                    activeLineWidth={0.5}
                    errorColor={COLORS.error}
                    renderRightAccessory={() => <AntDesign name="phone" size={24} color={hasError('tel') ? COLORS.error : "#a2a2a2"} />}
                    value={data.tel}
                    onChangeText={(newValue) => handleChange('tel', newValue)}
                    onBlur={() => checkFieldData('tel')}
                    error={hasError('tel') ? getError('tel') : ''}
                    autoCompleteType='off'
                    returnKeyType="go"
                    keyboardType="number-pad"
                    containerStyle={{
                        marginTop: 10
                    }}
                />
                <TouchableOpacity style={[styles.payBtn, !isValidate() && { opacity: 0.5 }]} disabled={!isValidate()} onPress={onPay}>
                    <Text style={styles.payBtnTitle}>PAYER {service.prix}</Text> 
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    image: {
        height: 40,
        width: 100,
        alignSelf: "center"
    },
    orderPriceItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5
    },
    orderPriceItemTitle: {
        color: '#c4bebe',
        fontSize: 13,
        fontWeight: "bold"
    },
    orderTotal: {
        fontWeight: "bold",
        fontSize: 18
    },
    payBtn: {
        paddingVertical: 15,
        backgroundColor: COLORS.ecommerceOrange,
        borderRadius: 5,
        marginVertical: 10
    },
    payBtnTitle: {
        textAlign: "center",
        color: '#fff',
        fontWeight: "bold"
    },
})