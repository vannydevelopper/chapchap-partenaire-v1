import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View, TouchableNativeFeedback } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Product({ product, index, totalLength, fixMargins = false }) {
        const { width } = useWindowDimensions()
        const MAX_WIDTH = 200
        const PRODUCT_MARGIN = 10
        const SERVICE_WIDTH = (width / 2)
        const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
        const PRODUCT_HEIGHT = 360
        const additionStyles = {
                width: PRODUCT_WIDTH,
                maxHeight: PRODUCT_HEIGHT,
                marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
                marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
        }
        const navigation = useNavigation()
        const detail = async (detail) => {
                const details = detail
                navigation.navigate("ProductDetailScreen", { detail: product })
        }

        return (
                <>
                        {/* <View key={index} style={[styles.product, additionStyles]}>
                                <View style={styles.productHeader}>
                                        <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text>
                                        <Text numberOfLines={2} style={styles.productCategory}>
                                                  {product.produit.NOM}
                                        </Text>
                              </View>
                                <View style={styles.imageCard}>


                                        <TouchableOpacity onPress={() => detail(product)}>
                                                  <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.image} />
                                        </TouchableOpacity>
                              </View>
                                {product.produit_partenaire.PRIX ? <Text style={styles.price}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                                <View style={styles.details}>
                                        <View style={styles.detail}>
                                                  <Text style={styles.detailLabel}>Quantité total</Text>
                                                  <Text style={styles.detailValue}>{product.stock.QUANTITE_STOCKE}</Text>
                                        </View>
                                        <View style={styles.detail}>
                                                  <Text style={styles.detailLabel}>Vendus</Text>
                                                  <Text style={styles.detailValue}>{product.stock.QUANTITE_VENDUE}</Text>
                                        </View>
                                        <View style={styles.detail}>
                                                  <Text style={styles.detailLabel}>Restante</Text>
                                                  <Text style={[styles.detailValue, { fontSize: 18 }]}>{product.stock.QUANTITE_RESTANTE}</Text>
                                        </View>
                              </View>
                        </View> */}
                        <View style={{ flex: 1 }}>
                                <View style={styles.services}>
                                        <View style={[styles.serviceContainer, { width: SERVICE_WIDTH, height: SERVICE_WIDTH }]}>
                                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#C4C4C4")}>
                                                        <View style={[styles.service]}>
                                                                <ImageBackground style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                                                        <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 10 }} />
                                                                        <Text style={styles.nameTitle}>{product.produit.NOM}</Text>
                                                                        <View style={{flexDirection:"row", marginBottom:5}}>
                                                                                <Text style={{marginLeft:10, color:"#fff", fontWeight: 'bold', fontSize:16}}>Prix</Text>
                                                                                <Text style={{marginLeft:10, fontWeight: 'bold', fontSize:16}}>5000 fbu</Text>
                                                                        </View>
                                                                        <View style={styles.serviceIcon}>
                                                                                <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.serviceIconImage} />
                                                                                {/* <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.image} /> */}
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", }}>
                                                                                <Text style={styles.serviceName}>Quantite Total</Text>
                                                                                <Text style={{ fontWeight: "bold", marginLeft: 5 }}>50</Text>
                                                                        </View>
                                                                        <View style={{ marginTop: -40, flexDirection: "row" }}>
                                                                                <Text style={styles.serviceName1}>Vendus</Text>
                                                                                <Text style={{ fontWeight: "bold", marginLeft: 5 }}>20</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row" }}>
                                                                                <Text style={styles.serviceName1}>Restante</Text>
                                                                                <Text style={{ fontWeight: "bold", marginLeft: 5 }}>20</Text>
                                                                        </View>
                                                                </ImageBackground>
                                                        </View>
                                                </TouchableNativeFeedback>
                                        </View>
                                </View>
                        </View>
                </>
        )
}

const styles = StyleSheet.create({
        product: {
                maxWidth: 200,
                backgroundColor: '#F1F1F1',
                borderRadius: 5,
                marginTop: 10,
        },
        productHeader: {
                padding: 5
        },
        productName: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: "bold"
        },
        productCategory: {
                fontSize: 13,
                color: '#777',
                marginLeft: 5,
        },
        imageCard: {
                height: "40%",
                width: "100%"
        },
        image: {
                height: "100%",
                width: "100%",
                resizeMode: 'contain'
        },
        price: {
                color: '#F29558',
                fontWeight: "bold",
                padding: 5
        },
        details: {
                paddingHorizontal: 5
        },
        detail: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
        },
        detailLabel: {
                color: '#c4bebe',
                fontSize: 13,
                fontWeight: "bold"
        },
        detailValue: {
                fontWeight: "bold"
        },

        services: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
        },
        serviceContainer: {
                maxWidth: 300,
                justifyContent: 'center',
                alignItems: 'center'
        },
        service: {
                borderRadius: 10,
                width: "90%",
                // height: "85%",
                overflow: 'hidden',
                flex: 1
        },
        serviceBackgound: {
                width: "100%",
                height: "100%",
                justifyContent: 'space-between'
        },
        serviceIcon: {
                width: 70,
                height: 70,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginLeft: 42,
                marginTop: -5,
                justifyContent: 'center',
                alignItems: 'center'
        },
        serviceName: {
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
                marginBottom: 40,
                fontSize: 16,
                marginLeft: 10
        },
        nameTitle: {
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16
        },
        serviceName1: {
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 10
        },
        serviceIconImage: {
                width: 60,
                height: 60,
                borderRadius: 10,
        },
})