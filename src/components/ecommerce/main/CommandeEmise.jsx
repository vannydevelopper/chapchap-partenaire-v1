import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { Feather, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS'
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
moment.updateLocale('fr', {
        calendar: {
                sameDay: "[Aujourd'hui]",
                lastDay: '[Hier]',
                nextDay: 'DD-M-YYYY',
                lastWeek: 'DD-M-YYYY',
                sameElse: 'DD-M-YYYY',
        },
})

/**
 * composant pour afficher les commandes par rapport du partenaire connecete
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 19/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function CommandeEmise({ commande, index }) {
        const navigation = useNavigation()
        const getStatusColor = idStatus => {
                if (idStatus == 3) {
                        return COLORS.ecommercePrimaryColor
                }
                if (idStatus == 4) {
                        return COLORS.primary
                }
                return '#B9BDCA'
        }
        return (
                <TouchableOpacity onPress={()=>navigation.push("SearchLivreurScreen", {commande:commande, index:index})}>
                        <View style={styles.container}>
                                <View style={styles.commande}>
                                        <View style={styles.cardAchat}>
                                                <Image source={{ uri: commande.details[0]?.IMAGE_1 }} style={styles.productImage} />
                                        </View>
                                        <View style={{ marginLeft: 15, flex: 1 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <View>
                                                                <Text style={styles.textRobe}>
                                                                        Commande : {commande.CODE_UNIQUE}
                                                                </Text>
                                                                <Text style={styles.date}>
                                                                        {moment(commande.DATE_COMMANDE).calendar()} {moment(commande.DATE_COMMANDE).format('HH:mm')}   {commande.ITEMS} produit{commande.ITEMS > 1 && 's'}
                                                                </Text>
                                                        </View>
                                                       {commande.TOTAL ?  <Text style={styles.montant}>
                                                                {commande.TOTAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu
                                                        </Text>: null}
                                                </View>
                                                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                                                        {commande.ID_STATUT == 4 ? <AntDesign name="checkcircle" size={10} color={COLORS.primary} /> :
                                                                <Entypo name="circle" size={10} color={getStatusColor(commande.ID_STATUT)} />}
                                                        <View style={{ marginLeft: 7 }}>
                                                                <Text style={[styles.textCommande, { color: getStatusColor(commande.ID_STATUT) }]}>
                                                                        {commande.NEXT_STATUS}
                                                                </Text>
                                                        </View>
                                                </View>
                                        </View>
                                </View>
                        </View>
                </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                // backgroundColor: "red"
        },
        commande: {
                flexDirection: "row",
                marginTop: 20,
                alignItems: "center",
                padding: 10,
        },
        cardAchat: {
                width: 75,
                height: 75,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center"

        },
        productImage: {
                width: "100%",
                height: "100%",
                resizeMode: "contain",
                borderRadius: 10
        },
        textRobe: {
                color: "#3e4778",
                fontSize: 12,
                fontWeight: "bold",
        },
        date: {
                color: "#B9BDCA",
                fontSize: 11,
                fontWeight: "bold",
        },
        montant: {
                color: "#EE7526",
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "right",
        },
        textCommande: {
                color: "#55C869",
                fontSize: 10,
                fontWeight: "bold",
        },
})