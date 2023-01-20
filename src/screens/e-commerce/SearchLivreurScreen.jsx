import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import CradProduitCommande from "../../components/ecommerce/main/CradProduitCommande";
import LottieView from 'lottie-react-native';
import { COLORS } from "../../styles/COLORS"
import { FontAwesome, AntDesign, Ionicons, Zocial } from '@expo/vector-icons';
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment/moment";
import fetchApi from "../../helpers/fetchApi";

export default function SearchLivreurScreen() {
        const route = useRoute()
        const navigation = useNavigation()
        const { commande, index } = route.params
        const [status, setStatus] = useState([])
        const [loadingStatus, setLoadingStatus] = useState(true)
        const [currentStatus, setCurrentStatus] = useState(null)
        const [peddingStatus, setPeddingStatus] = useState(null)
        moment.updateLocale('fr', {
                calendar: {
                        sameDay: "[Aujourd'hui]",
                        lastDay: '[Hier]',
                        nextDay: 'DD-M-YYYY',
                        lastWeek: 'DD-M-YYYY',
                        sameElse: 'DD-M-YYYY',
                },
        })

        useEffect(() => {
                (async () => {
                        try {
                                const stts = await fetchApi(`/commandes/status/${commande.ID_COMMANDE}`, {
                                        cacheData: false,
                                        checkInCacheFirst: false
                                })
                                const current = stts.result.find(st => st.ID_STATUT == commande.ID_STATUT)
                                const pedding = stts.result.find(st => st.ID_STATUT == current.NEXT_ID_STATUT)
                                setCurrentStatus(current)
                                setPeddingStatus(pedding)
                                setStatus(stts.result)
                                console.log(stts.result)
                        } catch (error) {
                                console.log(error)
                        } finally {
                                setLoadingStatus(false)
                        }
                })()
        }, [])

        return (
                <View style={{ flex: 1 }}>
                        <View style={styles.header}>
                               {currentStatus ? <Text style={styles.titlePrincipal}>
                                        {currentStatus.NEXT_STATUS}
                                </Text>:null}
                                {(currentStatus && currentStatus.ID_STATUT == 4) ? <LottieView style={{ width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/check.json')} autoPlay loop={false} /> :
                                        <LottieView style={{ width: 100, height: 100, alignSelf: "center" }} source={require('../../../assets/lotties/loading.json')} autoPlay loop={true} />}
                        </View>
                        <CradProduitCommande commande={commande} index={index} />
                        <View style={styles.cardStatus}>
                                <View style={styles.importantInfos}>
                                        <View style={styles.importantInfo}>
                                                <Text style={[styles.importantInfoValue]}>{commande.CODE_UNIQUE}</Text>
                                                <Text style={styles.importantInfoTitle}>
                                                        Code de la commande
                                                </Text>
                                        </View>
                                        <View style={styles.importantInfo}>
                                                <Text style={[styles.importantInfoValue, { textAlign: "right" }]}>10:46</Text>
                                                <Text style={[styles.importantInfoTitle, { textAlign: "right" }]}>
                                                        Heure
                                                </Text>
                                        </View>
                                </View>
                                <Text style={[styles.titlePrincipal, { textAlign: "left", marginTop: 10, fontSize: 18, marginBottom: 5 }]}>
                                        Status de livraisons
                                </Text>
                                <View style={styles.statusContainer}>
                                        <View>
                                                {!loadingStatus && status.filter(t => t.ID_STATUT != 1).map((status, index) => {
                                                        return (
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25 }} key={index}>
                                                                           <View style={{ flexDirection: "row" }}>
                                                                                <View style={styles.cardIcon}>
                                                                                        <Zocial name="statusnet" size={24} color="#777" />
                                                                                </View>
                                                                                <View style={{ marginLeft: 10 }}>
                                                                                        <Text style={styles.statutTitle} numberOfLines={1}>
                                                                                                {status.DESCRIPTION}
                                                                                        </Text>
                                                                                        <Text style={styles.dateStatus}>
                                                                                                {status.DATE_INSERTION ? `${moment(status.DATE_INSERTION).calendar()} à ${moment(status.DATE_INSERTION).format('HH:mm')}` : '-'}
                                                                                        </Text>
                                                                                </View>
                                                                        </View>
                                                                </View>
                                                        )
                                                })}
                                        </View>
                                        <View style={styles.statusCheckes}>
                                                {!loadingStatus && status.filter(t => t.ID_STATUT != 2).map((status, index) => {
                                                        return (
                                                                <TouchableOpacity style={[styles.statutVue, !status.completed && status.ID_STATUT != peddingStatus.ID_STATUT && { backgroundColor: '#ddd', elevation: 0 }]} key={index}>
                                                                        {status.completed && <AntDesign name="check" size={15} color="white" />}
                                                                </TouchableOpacity>
                                                        )
                                                })}
                                                <View style={styles.progressIndicator} />
                                        </View>
                                </View>
                                <View style={styles.navigation}>
                                        <TouchableNativeFeedback useForeground onPress={() => {
                                                navigation.goBack()
                                        }}>
                                                <View style={styles.cancelBtn}>
                                                        <Ionicons name="close" size={30} color="#777" />
                                                </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback useForeground >
                                                <View style={[styles.nextBtn]}>
                                                        <Text style={[styles.navigationBtnText]}>
                                                                Voir la commande
                                                        </Text>
                                                </View>
                                        </TouchableNativeFeedback>
                                </View>
                        </View>
                </View>

        )
}

const styles = StyleSheet.create({
        header: {
                marginVertical: 30
        },
        titlePrincipal: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: "bold",
                fontSize: 22,
                // lineHeight: 33,
                textAlign: "center"
        },
        cardStatus: {
                padding: 10,
                backgroundColor: "#F1F1F1",
                width: "100%",
                paddingHorizontal: 20,
                position: "absolute",
                bottom: 0,
                paddingTop: 10,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                flex: 1
        },
        importantInfos: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
        },
        importantInfoValue: {
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.ecommercePrimaryColor
        },
        importantInfoTitle: {
                color: '#777'
        },
        statusContainer: {
                flexDirection: "row",
                justifyContent: "space-between"
        },
        cardIcon: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: COLORS.handleColor,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
        },
        statutTitle: {
                fontSize: 15,
                fontWeight: "bold",
                color: "#000"
        },
        dateStatus: {
                fontSize: 13,
                color: "#777"
        },
        statusCheckes: {
                justifyContent: "space-around"
        },
        statutVue: {
                width: 22,
                height: 22,
                backgroundColor: COLORS.ecommercePrimaryColor,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                elevation: 5,
                shadowColor: COLORS.ecommercePrimaryColor,
                marginTop: -30
        },
        progressIndicator: {
                position: 'absolute',
                width: 1,
                height: "70%",
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: '#c2baba',
                top: 0,
                alignSelf: "center",
                zIndex: -1,
                marginTop: 15
        },
        cancelBtn: {
                width: 60,
                height: 60,
                borderRadius: 100,
                borderColor: '#ddd',
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#ddd',
                overflow: "hidden"
        },
        nextBtn: {
                paddingVertical: 20,
                minWidth: 200,
                overflow: "hidden",
                backgroundColor: COLORS.ecommerceOrange,
                borderRadius: 30,
                marginLeft: 10
        },
        navigationBtnText: {
                textAlign: "center",
                fontWeight: "bold",
                color: "#FFF"
        },
        navigation: {
                flexDirection: "row",
                justifyContent: 'center',
                paddingHorizontal: 40,
                marginVertical: 25,
                marginBottom: 10
        },
})