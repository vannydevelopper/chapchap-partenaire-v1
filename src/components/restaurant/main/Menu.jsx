import React from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { useNavigation } from '@react-navigation/native';

export default function Menu({ product, index, totalLength, fixMargins = false }) {
    console.log(product)
    const { width } = useWindowDimensions()
    const navigation=useNavigation()
    const MAX_WIDTH = 200
    const PRODUCT_MARGIN = 10
    const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
    const PRODUCT_HEIGHT = 360
    const additionStyles = {
        width: PRODUCT_WIDTH,
        maxHeight: PRODUCT_HEIGHT,
        marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
        marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
    }
    const detail = async (detail) => {
        const details = detail
        navigation.navigate("MenuDetailScreen", { detail: product })
}
    return (
        <View key={index} style={[styles.product, additionStyles]}>
           <View style={styles.imageCard}>
            </View>
            <View style={styles.serviceIcon}>
                <TouchableNativeFeedback onPress={() => detail(product)}>
                    <Image source={{ uri: product.IMAGE }} style={styles.serviceIconImage} />

                </TouchableNativeFeedback>
            </View>
            <View style={styles.productHeader}>
                <Text numberOfLines={2} style={styles.productName}>{product.repas}</Text>
                <Text numberOfLines={2} style={styles.productCategory}>
                    {product.categorie}
                </Text>
            </View>
            {product.PRIX ? <Text style={styles.price}>{product.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}

        </View>
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
        padding: 5,
        marginTop:20
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
        width: 100,
        height: 50,
    },
    serviceIcon: {
        width: 100,
        height: 100,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginLeft: 30,
        // marginTop: -9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    serviceIconImage: {
        width: 140,
        height: 140,
        borderRadius: 10,
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
    }
})