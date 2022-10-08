// import React from "react"
// import { Image, StyleSheet, View, Text, ScrollView } from "react-native"
// import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
// import fetchApi from "../../helpers/fetchApi";
// import { useState, useEffect } from "react";
// import moment from "moment/moment";

// export default function CommandeEmiseScreen() {
//     const [commandes, setCommandes] = useState([])
//     moment.updateLocale('fr', {
//         calendar: {
//             sameDay: "[Aujourd'hui]",
//             lastDay: '[Hier]',
//             nextDay: 'DD-M-YYYY',
//             lastWeek: 'DD-M-YYYY',
//             sameElse: 'DD-M-YYYY',
//         },
//     })
//     const fecthCommandes = async () => {
//         try {
//             const response = await fetchApi(`/commandes/partenaire`, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })
//             setCommandes(response.result)
//             console.log(response.result)
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
//         fecthCommandes()
//     }, [])
//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <View style={styles.header}>
//                     <Ionicons name="ios-arrow-back-outline" size={35} color="black" style={{ marginTop: 0 }} />
//                     <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
//                     <Feather name="menu" size={24} color="black" />
//                 </View>
//                 <Text style={styles.text}>Commandes emises</Text>
//                 <View style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                 }}>
//                     <View style={{ ...styles.carre, backgroundColor: "#EE7526" }}>
//                         <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", }}>Livrées</Text>
//                     </View>
//                     <View style={{ ...styles.carre, backgroundColor: "#FCEADE" }}>
//                         <Text style={{ color: "#EE7526", textAlign: "center", fontWeight: "bold", }}>En attente</Text>
//                     </View>
//                 </View>


//                 {commandes.map((commande, index) => {

//                  return (
//                         <View style={{
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                         }} key={index}>
//                             <View style={styles.cardAchat}>
//                                 <Image source={{ uri: commande.IMAGE_1 }} style={styles.productImage} />
//                             </View>

//                             <View style={{ marginTop: 20, marginHorizontal: 0 }}>

//                                 <Text style={styles.textRobe}>
//                                     Commande : {commande.CODE_UNIQUE} 
//                                 </Text>
//                                 <Text style={styles.date}>
//                                     {moment(commande.DATE_COMMANDE).format('DD-M-YYYY HH:mm')}   {commande.NOM} produit{commande.ITEMS > 1 && 's'}
//                                 </Text>

//                                 <View style={{ flexDirection: "row", marginTop: 15 }}>
//                                     <View style={styles.cardOK}><Entypo name="check" size={6} color="white" /></View>
//                                     <View style={{ marginLeft: 7 }}>
//                                         <Text style={styles.textCommande}>{commande.DESCRIPTION}</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                             <View style={{ marginTop: 20, marginHorizontal: 0 }}>
//                                 <Text style={styles.montant}>{commande.SOMME.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text>
//                             </View>
//                         </View>
//                     )
//                 })}




//             </View>
//         </ScrollView>

//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         marginHorizontal: 20
//     },
//     header: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginTop: 60,

//     },
//     image: {
//         marginTop: -30
//     },
//     text: {
//         fontWeight: "bold",
//         fontSize: 18,
//         color: "#242F68",
//         marginVertical: 20
//     },
//     carre: {
//         borderRadius: 10,
//         padding: 13,
//         width: 150
//     },
//     cardAchat: {
//         marginTop: 20,
//         width: 75,
//         height: 75,
//         borderWidth: 1,
//         borderColor: "#BCBFD1",
//         borderRadius: 5,
//         justifyContent: "center",
//         alignItems: "center"

//     },
//     cardOK: {
//         width: 10,
//         height: 10,
//         backgroundColor: '#55C869',
//         borderRadius: 9,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 3
//     },
//     textCommande: {
//         color: "#55C869",
//         fontSize: 9,
//         fontWeight: "bold",
//     },
//     textRobe: {
//         color: "#3e4778",
//         fontSize: 12,
//         fontWeight: "bold",
//     },
//     date: {
//         color: "#B9BDCA",
//         fontSize: 11,
//         fontWeight: "bold",
//     }
//     ,
//     productImage: {
//         width: "100%",
//         height: "100%",
//         resizeMode: "contain",
//         borderRadius: 10
//     },

//     montant: {
//         color: "#EE7526",
//         fontSize: 12,
//         fontWeight: "bold",
//     },
//     ligne: {
//         borderTopWidth: 1,
//         marginTop: 10,
//         borderTopColor: '#B9BDCA',
//     },
// })