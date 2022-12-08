import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, runOnJS, withSpring } from 'react-native-reanimated'
import ImageView from "react-native-image-viewing";
import { Ionicons, AntDesign, Feather, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import fetchApi from '../../../helpers/fetchApi'



export default function ProductImages({ product,images }) {
    console.log(images)
    const IMAGES = images.filter(img => img)
    const { width } = useWindowDimensions()
    const [activendex, setActiveIndex] = useState(0)

    const [imageIndex, setImageIndex] = useState(0)
    const [productImage, setProcuctImage] = useState(null)
    const [imageUpdate, setImgeUpdate] = useState(null)

    const [showImageModal, setShowImageModal] = useState(false)
    const PAGINATION_WIDTH = (IMAGES.length * 50) + IMAGES.length * 10
    const uploadModaliseRef = useRef()

    const onPageChange = page => {
        setActiveIndex(page)
    }
    const onSelectPhoto = (image,index) => {
        uploadModaliseRef.current.open()
        // console.log(image)
    }
    const onImporterPhoto = async (image,index) => {
        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        })
        if (photo.cancelled) {
            return false
        }
        setProcuctImage(photo)
        try {
            const form = new FormData()
            if (productImage) {
                const manipResult = await manipulateAsync(
                    productImage.uri,
                    [
                        { resize: { width: 500 } }
                    ],
                    { compress: 0.8, format: SaveFormat.JPEG }
                );
                let localUri = manipResult.uri;
                let filename = localUri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                form.append('IMAGE', {
                    uri: localUri, name: filename, type
                })
                const imagepdate = await fetchApi(`/products/${product.produit.ID_PRODUIT}/${index}`, {
                    method: "PUT",
                    body: form
                })
                setImgeUpdate(imagepdate)
            }
           
        }
        catch (error) {
            console.log(error)
        }
    }
    const translationX = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler((event) => {
        'worklet';
        const page = parseInt(event.contentOffset.x / (width - 40))
        runOnJS(onPageChange)(page)
        translationX.value = withSpring(((event.contentOffset.x * PAGINATION_WIDTH) / (width * IMAGES.length)))
    }, [width]);
    const translationStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: translationX.value }]
    }))
    const marginLeft = useCallback(() => ({
        marginLeft: activendex > 0 ? (activendex == IMAGES.length - 1 ? 10 : 5 / activendex) : 0
    }), [activendex])
    return (
        <View style={styles.container}>
            <Animated.ScrollView
                style={styles.images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
            // onScrollEndDrag={(e) => setActiveIndex(parseInt(e.nativeEvent.contentOffset.x / (width - 40)))}
            >
                {IMAGES.map((image, index) => {
                    return (<>
                        <TouchableOpacity style={[styles.imageContainer, { width }]} key={index} onPress={() => {
                            setImageIndex(index)
                            setShowImageModal(true)
                        }}>
                            <Image source={{ uri: image }} style={styles.productImage} />
                            <TouchableOpacity onPress={()=>onImporterPhoto(image,index)} style={styles.uploadImages}>
                                <Feather name="image" size={24} color={COLORS.ecommercePrimaryColor} />
                            </TouchableOpacity>
                        </TouchableOpacity>

                    </>
                    )
                })}
            </Animated.ScrollView>
            {IMAGES.length > 1 ? <View style={[styles.pagination, { width: PAGINATION_WIDTH }]}>
                <Animated.View style={[styles.paginationDot, styles.selectedDot, translationStyles, marginLeft()]} />
                {IMAGES.map((_, index) => {
                    return (
                        <View style={[styles.paginationDot]} key={index} />
                    )
                })}
            </View> : null}
            {showImageModal &&
                <ImageView
                    images={IMAGES.map(img => ({ uri: img }))}
                    imageIndex={imageIndex}
                    visible={showImageModal}
                    onRequestClose={() => setShowImageModal(false)}
                    swipeToCloseEnabled
                    keyExtractor={(_, index) => index.toString()}
                />
            }
            <Portal>
                <Modalize ref={uploadModaliseRef} handlePosition="inside" modalHeight={100} snapPoint={250}>
                    <View style={styles.modalContent}>
                        <TouchableNativeFeedback >
                            {/* <TouchableNativeFeedback onPress={() => onImporterPhoto()}> */}
                            <View style={styles.modalAction}>
                                <View style={styles.actionIcon}>
                                    <AntDesign name="folderopen" size={24} color="black" />
                                </View>
                                <View style={styles.actionLabels}>
                                    <Text style={styles.modalActionText}>
                                        Importer une photo
                                    </Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </Modalize>
            </Portal>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1',
        // paddingBottom: 60,
        height: 200
    },
    modalContent: {
        marginTop: 20
    },
    modalAction: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingVertical: 15
    },
    modalActionText: {
        fontWeight: "bold"
    },
    pagination: {
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: 10,
        justifyContent: "space-between"
    },
    paginationDot: {
        height: 3,
        width: 50,
        backgroundColor: '#ddd',
        borderRadius: 10,
    },
    selectedDot: {
        backgroundColor: '#000',
        position: "absolute",
        left: 0,
        zIndex: 1
    },
    images: {
    },
    imageContainer: {
        height: "100%",
    },
    uploadImages: {
        width: 50,
        height: 50,
        backgroundColor: "#D7D9E4",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
        position: 'absolute',
        left: "80%",
        marginTop: 120,
        justifyContent: "center",
        alignItems: "center"
    },
    productImage: {
        width: '95%',
        height: '100%',
        minHeight: 150,
        maxHeight: 200,
        alignSelf: 'center',
        resizeMode: "center",
        borderRadius: 10
    },
})