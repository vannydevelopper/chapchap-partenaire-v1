import React, { useRef } from 'react'
import { Image, StyleSheet,ImageBackground, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign,Fontisto, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import fetchApi from '../../../helpers/fetchApi';

export default function Menu({ menu, index,partenaire, totalLength, fixMargins = false ,onRemove }) {
    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    const PRODUCT_MARGIN = 10
    const PRODUCT_WIDTH = (width / 2) - 10
    const PRODUCT_HEIGHT = 270
    const additionStyles = {
        width: PRODUCT_WIDTH,
        height: PRODUCT_HEIGHT,
        // marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
        // marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
    }
    const detail = async (menu) => {
        const details = menu
        navigation.navigate("MenuDetailScreen", { detail: menu,partenaire:partenaire })
}

    return (
        <View key={index} style={[styles.product, additionStyles, fixMargins && { marginTop: 10 }]}>
            <TouchableOpacity  onPress={() => detail(menu)} style={styles.imageCard}>
                {/* <Image source={{ uri: menu.IMAGE }} style={styles.image} />
                 */}
                 <ImageBackground source={{ uri: menu.IMAGE }} style={[styles.serviceBackgound]} marginLeft={5} marginTop={2} mag borderRadius={20}  imageStyle={{ opacity: 0.8 }}>
                <View style={{ marginTop: 50, marginRight: 0 }}>
                    <Text style={styles.productName1}>{menu.repas}</Text>
                </View>
            </ImageBackground>
            </TouchableOpacity>
            <View style={{ flexDirection: "row",marginLeft:"2%" }}>
        <TouchableOpacity>
          <View style={styles.cardLike}>
            <AntDesign name="like2" size={24} color="#F29558" />
            {menu.NbreCommande&&<View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>{menu.NbreCommande.nbr}</Text>
            </View> }
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cartBtn}>
          <Fontisto name="shopping-basket" size={24} color="#F29558" />
            {menu.NbreLike&&
                <View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>{menu.NbreLike.nbr}</Text>
            </View>} 
        </TouchableOpacity>
      </View>
            {menu.PRIX ? <Text style={{ color: "#F29558", fontWeight: "bold" }}>{menu.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
          
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
        width: "96%",
        height: "96%",
         justifyContent: 'center',
    },
    product: {
        // maxWidth: 300,
        // maxHeight:200,
        // marginHorizontal: 10,
        // elevation:15,
        // backgroundColor:'white',
        // borderRadius:10,
        // padding:5,
        // marginBottom:'2%'
        maxWidth: 240,
        maxHeight:200,
    
        marginHorizontal: 5,
        backgroundColor: 'white',
        elevation: 15,
        borderRadius: 10,
        padding: 5,
        marginTop:"2%"
    },
    imageCard: {
        borderRadius: 8,
        height: "60%",
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
        width: 35,
        height: 35,
        backgroundColor: "#FBD5DA",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    cartBtn: {
        marginTop: 10,
        width: 35,
        height: 35,
        backgroundColor: "#FBD5DA",
        borderRadius: 10,
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