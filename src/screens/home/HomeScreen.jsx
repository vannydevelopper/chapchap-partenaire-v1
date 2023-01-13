import React, { useCallback, useState } from "react";
import {
          Text, StyleSheet, View, ScrollView, ImageBackground, Dimensions,
          Image,
          FlatList,
          useWindowDimensions,
          TouchableOpacity
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../styles/COLORS";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import ServicesPartenaire from "../../components/app/ServicesPartenaire";
import Header from "../../components/app/Header";

export default function HomeScreen() {
          const navigation = useNavigation()
          const route = useRoute()
          return (
                    <>
                              <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                              <View style={styles.imgBackground}>
                                        <ServicesPartenaire />
                              </View>
                    </>
          )
}
const styles = StyleSheet.create({
          imgBackground: {
                    flex: 1,
                    width: '100%',
                    height: "100%"
          }
})