import React, { useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
export default function Couleur({ color,onPressVariante, index, totalLength }) {
  

    return (

        <View key={index} style={styles.color} >
            <TouchableOpacity onPress={onPressVariante}>
                <View style={styles.cardColor}>
                    <Text style={{ ...styles.txt, marginTop: "6%" }}>{color.COULEUR}</Text>
                    <Text style={{ ...styles.txt, marginLeft: "-40%", marginTop: "6%" }}>{color.TAILLE}</Text>
                    <View style={styles.quantite}>
                        <View style={styles.qte}>
                            <Text style={styles.txtQte}>Quantite Restante </Text>
                            <Text style={styles.txt}>{color.QUANTITE_RESTANTE}</Text>
                        </View>
                        <View style={styles.qte}>
                            <Text style={styles.txtQte}>Quantite vendus</Text>
                            <Text style={styles.txt}>{color.QUANTITE_VENDUS}</Text>
                        </View>
                        <View style={styles.qte}>
                            <Text style={styles.txtQte}>Quantite Total</Text>
                            <Text style={styles.txt}>{color.QUANTITE_TOTAL}</Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    color: {

        marginHorizontal: 10,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: '2%',
        marginTop: "1%"
    },
    qte: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    cardColor: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txt: {
        opacity: 0.5, fontWeight: "bold",
    },
    txtQte: {
        fontSize: 8,
        marginRight: "5%",
        opacity: 0.5, fontWeight: "bold",
    },
    quantite: {
        marginLeft: "-30%"
    }

})