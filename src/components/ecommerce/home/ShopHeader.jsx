import React from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback, StatusBar } from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

export default function ShopHeader(props) {
          const shopName = props.options.title
          const navigation = useNavigation()
          return (
                    <View style={styles.header}>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                                        onPress={() => navigation.goBack()}
                                        >
                                        <View style={styles.headerBtn}>
                                                  <Ionicons name="chevron-back" size={24} color="black" />
                                        </View>
                              </TouchableNativeFeedback>
                              <Text style={styles.shopName}>
                                        { shopName }
                              </Text>
                              <TouchableNativeFeedback>
                                        <View style={styles.headerBtn}>
                                                  <Feather name="more-horizontal" size={24} color="black" />
                                        </View>
                              </TouchableNativeFeedback>
                    </View>
          )
}

const styles = StyleSheet.create({
          header: {
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: StatusBar.currentHeight
          },
          headerBtn: {
                    padding: 10
          },
          shopName: {
                    fontWeight: "bold"
          }
})