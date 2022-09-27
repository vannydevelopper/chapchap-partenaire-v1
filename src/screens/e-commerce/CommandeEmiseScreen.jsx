import React from "react"
import { Image, StyleSheet, View, Text, ScrollView } from "react-native"
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
export default function CommandeEmiseScreen() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="ios-arrow-back-outline" size={35} color="black" style={{ marginTop: 0 }} />
                    <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                    <Feather name="menu" size={24} color="black" />
                </View>
                <Text style={styles.text}>Commandes emises</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <View style={{ ...styles.carre, backgroundColor: "#EE7526" }}>
                        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", }}>Livrées</Text>
                    </View>
                    <View style={{ ...styles.carre, backgroundColor: "#FCEADE" }}>
                        <Text style={{ color: "#EE7526", textAlign: "center", fontWeight: "bold", }}>En attante</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <View style={styles.cardAchat}>
                        <Ionicons name="shirt-sharp" size={70} color="black" />
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 0 }}>
                        <Text style={styles.textRobe}>Robe noire Louis vutton</Text>
                        <Text style={styles.date}>14Nov.2022   2piecs</Text>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <View style={styles.cardOK}><Entypo name="check" size={6} color="white" /></View>
                            <View style={{ marginLeft: 7 }}>
                                <Text style={styles.textCommande}>Commande Livrée</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 0 }}>
                        <Text style={styles.montant}>85 000Fbu</Text>
                    </View>
                </View>
                <View style={styles.ligne}></View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <View style={styles.cardAchat}>
                        <Ionicons name="shirt-sharp" size={70} color="black" />
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 0 }}>
                        <Text style={styles.textRobe}>Robe noire Louis vutton</Text>
                        <Text style={styles.date}>14Nov.2022   2piecs</Text>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <View style={styles.cardOK}><Entypo name="check" size={6} color="white" /></View>
                            <View style={{ marginLeft: 7 }}>
                                <Text style={styles.textCommande}>Commande Livrée</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 0 }}>
                        <Text style={styles.montant}>85 000Fbu</Text>
                    </View>
                </View>
                <View style={styles.ligne}></View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <View style={styles.cardAchat}>
                        <Ionicons name="shirt-sharp" size={70} color="black" />
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 0 }}>
                        <Text style={styles.textRobe}>Robe noire Louis vutton</Text>
                        <Text style={styles.date}>14Nov.2022   2piecs</Text>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <View style={styles.cardOK}><Entypo name="check" size={6} color="white" /></View>
                            <View style={{ marginLeft: 7 }}>
                                <Text style={styles.textCommande}>Commande Livrée</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 0 }}>
                        <Text style={styles.montant}>85 000Fbu</Text>
                    </View>
                </View>

            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 60,

    },
    image: {
        marginTop: -30
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#242F68",
        marginVertical: 20
    },
    carre: {
        borderRadius: 10,
        padding: 13,
        width: 150
    },
    cardAchat: {
        marginTop: 20,
        width: 75,
        height: 75,
        borderWidth: 1,
        borderColor: "#BCBFD1",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"

    },
    cardOK: {
        width: 10,
        height: 10,
        backgroundColor: '#55C869',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3
    },
    textCommande: {
        color: "#55C869",
        fontSize: 9,
        fontWeight: "bold",
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
    }
    ,

    montant: {
        color: "#EE7526",
        fontSize: 12,
        fontWeight: "bold",
    },
    ligne: {
        borderTopWidth: 1,
        marginTop: 10,
        borderTopColor: '#B9BDCA',
    },
})