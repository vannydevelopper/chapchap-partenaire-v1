import React from "react"
import { Text, StyleSheet, View, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, FontAwesome, Entypo, Feather } from '@expo/vector-icons';

export default function DrawerScreen() {
    return (
        <>
            <View style={styles.card}>
                <AntDesign name="close" size={40} color="#1D8585" style={{ marginLeft: 280, marginTop: 40 }} />
                <Text style={{ textAlign: 'center', fontWeight: "bold", marginTop: 10 }}>NDAYISABA Claudine</Text>
            </View>
            <ScrollView>
                <TouchableOpacity>
                    <View style={{
                        padding: 20,
                        marginHorizontal: 20,
                        color: "#1D8585",
                        backgroundColor: '#87AFC7',
                        borderRadius: 10,
                        marginTop: 1,
                        flexDirection: "row",

                    }}>
                        <AntDesign name="home" size={27} color="#1D8585" />
                        <Text style={{ ...styles.text, color: "#1D8585" }}>Produits et  service</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.display}>
                    <AntDesign name="home" size={24} color="black" />
                    <Text style={styles.text}>commandes et  réservations</Text>
                </View>
                <View style={styles.display}>
                    <AntDesign name="home" size={24} color="black" />
                    <Text style={styles.text}>Wishlist</Text>
                </View>
                <View style={styles.display}>
                    <FontAwesome name="user-o" size={24} color="black" />
                    <Text style={styles.text}>Compte</Text>
                </View>

                <View style={styles.ligne}></View>
                <View style={styles.display}>
                    <Feather name="menu" size={24} color="black" />
                    <Text style={styles.text}>condition d'utilisation</Text>
                </View>
                <View style={styles.display}>
                    <AntDesign name="back" size={24} color="black" />
                    <Text style={styles.text}>politique de retour</Text>
                </View>
                <View style={styles.display}>
                    <AntDesign name="setting" size={24} color="black" />
                    <Text style={styles.text}>Parametre</Text>
                </View>
                <View style={styles.display}>
                    <AntDesign name="infocirlceo" size={24} color="black" />
                    <Text style={styles.text}>infos et assistance</Text>
                </View>
                <View style={styles.display}>
                    <MaterialIcons name="logout" size={20} color="black" />
                    <Text style={styles.text}>Deconnexion</Text>
                </View>
            </ScrollView>
        </>
    )

}
const styles = StyleSheet.create({
    card: {
        marginHorizontal: 10,
        marginVertical: 20
    },
    display: {
        padding: 20,
        marginHorizontal: 20,
        // backgroundColor: '#fff',
        // borderRadius: 10,
        // elevation: 8,
        // borderWidth: 2,
        // borderColor: '#fff',
        marginTop: 5,
        flexDirection: "row",
        // justifyContent: "",
        // alignContent: "center",
        // alignItems: "center"

    },
    displa: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "",
        alignContent: "center",
        alignItems: "center"

    },
    text: {
        marginLeft: 20,
        marginRight: 0
    },
    ligne: {
        borderTopWidth: 1,
        marginTop: 10,
        marginHorizontal: 20,
        borderTopColor: '#0a5744',
    },

})