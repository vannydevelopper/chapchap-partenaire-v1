import React, { useCallback, useState } from "react";
import {
          Text, StyleSheet, View, ScrollView, ImageBackground, Dimensions,
          Image,
          FlatList,
          useWindowDimensions
} from "react-native";
import { Feather, FontAwesome, EvilIcons, AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import Carousel from "../../components/app/Carousel";
import ServicesCategories from "../../components/app/ServicesCategories";
import { COLORS } from "../../styles/COLORS";

export default function HomeScreen() {
          return (
                    <>
                    <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                    <View style={styles.imgBackground}>
                              <View style={styles.cardHeader}>
                                        <View style={styles.menuOpener}>
                                                  <View style={styles.menuOpenerLine} />
                                                  <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                  <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                        </View>
                                        <View style={styles.imageContainer}>
                                                  <Image source={require('../../../assets/images/chapchap.png')} style={styles.logo} />
                                        </View>
                                        <View style={{ marginTop: 25 }}>
                                                  <AntDesign name="search1" size={24} color={COLORS.primary}  />
                                        </View>
                              </View>
                              <Carousel />
                              <ServicesCategories />
                    </View>
                    </>
          )
}
const styles = StyleSheet.create({
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    height: 88
          },
          imageContainer: {
                    height: "100%",
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          logo: {
                    resizeMode: 'center',
                    height: "50%",
                    width: "50%",
                    marginTop: 25
          },
          menuOpener: {
                    marginTop: 25
          },
          menuOpenerLine: {
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.primary,
                    marginTop: 5
          },
          imgBackground: {
                    flex: 1,
                    width: '100%',
                    height: "100%"
          }
})