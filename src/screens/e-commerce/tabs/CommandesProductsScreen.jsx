import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableNativeFeedback } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import fetchApi from '../../../helpers/fetchApi';
import CommandeEmise from '../../../components/ecommerce/main/CommandeEmise';

/**
 * un composant pour afficher les commandes du partenaire
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 19/1/2023
 * @returns 
 */

export default function CommandesProductsScreen({ shop }) {

        const [commandes, setCommandes] = useState([])
        const [loading, setLoading] = useState(true)

        const renderProducts = ({ item: commande, index }) => {
                return (
                        <TouchableNativeFeedback>
                                <CommandeEmise
                                        commande={commande}
                                        index={index}
                                        totalLength={commandes.length}
                                />
                        </TouchableNativeFeedback>

                )
        }

        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                var url = `/commandes/partenaire/${shop.ID_PARTENAIRE_SERVICE}`
                                const commandes = await fetchApi(url)
                                setCommandes(commandes.result)
                        }
                        catch (error) {
                                console.log(error)
                        } finally {
                                setLoading(false)
                        }


                })()
        }, []))

        return (
                <>
                        {loading ?
                                <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={styles.container}>
                                                <View style={styles.loadingContainer}>
                                                        <ActivityIndicator size={"large"} color='#777' />
                                                </View>
                                        </View>
                                </Tabs.ScrollView> :
                                commandes.length == 0 ? <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={styles.container}>
                                                <View style={styles.emptyContainer}>
                                                        <Text style={styles.emptyFeedback}>
                                                                Aucune commande effectue dans votre boutique
                                                        </Text>
                                                </View>
                                        </View>
                                </Tabs.ScrollView> :
                                        <Tabs.FlatList
                                                data={commandes}
                                                renderItem={renderProducts}
                                        />
                        }
                </>

        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        emptyContainer: {
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30
        },
        emptyFeedback: {
                marginTop: 10,
                color: '#777',
                textAlign: "center",
                paddingHorizontal: 30
        },
        loadingContainer: {
                flex: 1,
                marginTop: 30
        },
})