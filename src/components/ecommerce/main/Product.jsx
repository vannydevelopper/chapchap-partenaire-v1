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

                        <View key={index} style={[styles.product, additionStyles]}>
                                <ImageBackground style={[styles.serviceBackgound]} borderRadius={10} resizeMode='cover' imageStyle={{ opacity: 0.8 }}>
                                        <View style={{...styles.productHeader, marginHorizontal:10 }}>
                                                <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text>
                                                <Text numberOfLines={2} style={styles.productCategory}>
                                                        {product.produit.NOM}
                                                </Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5,alignItems:"center" }}>
                                                        <Text style={{ color:"#777", fontWeight: 'bold', fontSize: 14 }}>Prix</Text>
                                                       {product.produit_partenaire.PRIX ? <Text style={styles.price}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                                                </View>
                                        </View>
                                        <View style={styles.serviceIcon}>
                                                <TouchableOpacity onPress={() => detail(product)}>
                                                        <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.serviceIconImage} />
                                                </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: "row", }}>
                                                <Text style={styles.serviceName}>Quantite Total</Text>
                                                <Text style={{ fontWeight: "bold", color:"#777", marginLeft: 5 }}>{product.stock.QUANTITE_STOCKE}</Text>
                                        </View>
                                        <View style={{ marginTop: -40, flexDirection: "row" }}>
                                                <Text style={styles.serviceName1}>Vendus</Text>
                                                <Text style={{ fontWeight: "bold",color:"#777", marginLeft: 5 }}>{product.stock.QUANTITE_VENDUE}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.serviceName1}>Restante</Text>
                                                <Text style={{ fontWeight: "bold",color:"#777", marginLeft: 5 }}>20</Text>
                                        </View>
                                </ImageBackground>
                        </View>
                </>
        )
}

const styles = StyleSheet.create({
        product: {
                maxWidth: 200,
                // backgroundColor: '#F1F1F1',
                borderWidth:1,
                borderColor:"#000",
                borderRadius: 5,
                marginTop: 10,
        },
        productHeader: {
                // padding: 5
        },
        productName: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: "bold",
                
        },
        productCategory: {
                fontSize: 17,
                color: '#777',
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
                height: "80%",
                justifyContent: 'space-between'
        },
        serviceIcon: {
                width: 100,
                height: 100,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginLeft: 33,
                marginTop: -5,
                justifyContent: 'center',
                alignItems: 'center'
        },
        serviceName: {
                textAlign: 'center',
                color: '#777',
                fontWeight: 'bold',
                marginBottom: 40,
                fontSize: 14,
                marginHorizontal:10
        },
        nameTitle: {
                textAlign: 'center',
                color: '#777',
                fontWeight: 'bold',
                fontSize: 16
        },
        serviceName1: {
                textAlign: 'center',
                color: '#777',
                fontWeight: 'bold',
                fontSize: 14,
                marginHorizontal:10
        },
        serviceIconImage: {
                width: 90,
                height: 90,
                borderRadius: 10,
        },
})