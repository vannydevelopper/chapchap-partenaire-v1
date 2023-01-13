import { DrawerActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import {  Octicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/COLORS';

export default function Header() {
          const navigation = useNavigation()
          return (
                    <View style={styles.cardHeader}>
                              <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                        <View style={styles.menuOpenerLine} />
                                        <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                        <View style={[styles.menuOpenerLine, { width: 25 }]} />
                              </TouchableOpacity>
                              <View style={styles.imageContainer}>
                                        <Image source={require('../../../assets/images/chapchap.png')} style={styles.logo} />
                              </View>
                              <View style={{ marginTop: 25 }}>
                                        <Octicons name="bell" size={24} color={COLORS.primary} />
                              </View>
                    </View>
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
})