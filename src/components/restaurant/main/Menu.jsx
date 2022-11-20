import React from 'react'
import { Image, StyleSheet, ImageBackground, Text, TouchableOpacity, TouchableNativeFeedback, useWindowDimensions, View } from 'react-native'
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
    // return (
    //     <View key={index} style={[styles.product, additionStyles]}>
    //        <View style={styles.imageCard}>
    //         </View>
    //         <View style={styles.serviceIcon}>
    //             <TouchableNativeFeedback onPress={() => detail(product)}>
    //                 <Image source={{ uri: product.IMAGE }} style={styles.serviceIconImage} />

    //             </TouchableNativeFeedback>
    //         </View>
    //         <View style={styles.productHeader}>
    //             <Text numberOfLines={2} style={styles.productName}>{product.repas}</Text>
    //             <Text numberOfLines={2} style={styles.productCategory}>
    //                 {product.categorie}
    //             </Text>
    //         </View>
    //         {product.PRIX ? <Text style={styles.price}>{product.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}

    //     </View>
    // )
    return (
        <View key={index} style={[styles.product, additionStyles, fixMargins && { marginTop: 10 }]}>
            <TouchableOpacity onPress={() => detail(product)} style={styles.imageCard}>
                {/* <Image source={{ uri: menu.IMAGE }} style={styles.image} />
                 */}
                 <ImageBackground source={{ uri: product.IMAGE }} style={[styles.serviceBackgound]} marginLeft={5} marginTop={2} mag borderRadius={20}  imageStyle={{ opacity: 0.8 }}>
                <View style={{ marginTop: 120, marginRight: 0 }}>
                    <Text style={styles.productName1}>{product.repas}</Text>
                </View>
            </ImageBackground>
            </TouchableOpacity>
            {product.PRIX ? <Text style={{ marginHorizontal:10, fontsize:10,fontWeight:"bold" ,  color: COLORS.ecommercePrimaryColor}}>{product.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
            
        </View>

    )
}

const styles = StyleSheet.create({
    productName1: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12
    }, 
    serviceBackgound: {
        width: "100%",
        height: "100%",
         justifyContent: 'center',
    },
    product: {
        maxWidth: 300,
        marginBottom:-40
        
    },
    imageCard: {
        borderRadius: 8,
        height: "70%",
        width: "100%"
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 8,
        resizeMode: 'contain'
    },
    cardLike: {
        marginTop: 10,
        width: 25,
        height: 25,
        backgroundColor: "#FBD5DA",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    cartBtn: {
        marginTop: 10,
        width: 25,
        height: 25,
        backgroundColor: "#FBD5DA",
        borderRadius:5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8
    },
    badge: {
        minWidth: 25,
        minHeight: 20,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: COLORS.ecommerceRed,
        position: 'absolute',
        top: -5,
        right: -10,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FFF',
        fontWeight: "bold"
    },
    productName: {
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "400",
        fontSize: 13
    }
})