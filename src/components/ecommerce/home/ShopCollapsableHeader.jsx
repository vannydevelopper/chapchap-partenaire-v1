import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { COLORS } from '../../../styles/COLORS'
import { EvilIcons } from '@expo/vector-icons';

export const HEADER_HEIGHT = 260;
export default function ShopCollapsableHeader({ shop }) {
          return (
                    <View style={styles.header}>
                              <TouchableWithoutFeedback key={1} onPress={() => {
                                        setImageIndex(1)
                                        setShowImageModal(true)
                              }}>
                                        <View style={styles.coverImageContainer}>
                                                  < Image source={{ uri: shop.BACKGROUND_IMAGE }} style={styles.imagePrincipal} />
                                        </View>
                              </TouchableWithoutFeedback>
                              <View style={styles.shopHeader}>
                                        <View style={styles.logoContainer}>
                                                  <Image source={{ uri: shop.LOGO }} style={styles.logo} />
                                        </View>
                                        <View style={styles.shopActions}>
                                                  <TouchableNativeFeedback>
                                                            <View style={styles.mainActionBtn}>
                                                                      <Text style={styles.mainActionText}>
                                                                                Promote
                                                                      </Text>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <TouchableNativeFeedback>
                                                            <View style={styles.headerActionBtn}>
                                                                      <EvilIcons name="share-google" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                              </View>
                              <View style={styles.shopInfos}>
                                        <View>
                                                  <Text style={styles.shopName}>
                                                            {shop.NOM_ORGANISATION}
                                                  </Text>
                                                  <Text style={styles.topCategory}>Electronique</Text>
                                        </View>
                                        <TouchableWithoutFeedback>
                                                  <View style={styles.topFollowers}>
                                                            <View style={styles.followers}>
                                                                      <View style={styles.follower}>
                                                                                <Image source={require('../../../../assets/images/delivery.jpg')} style={styles.followerImage} />
                                                                      </View>
                                                                      <View style={[styles.follower, { marginLeft: -10}]}>
                                                                                <Image source={require('../../../../assets/images/delivery.jpg')} style={styles.followerImage} />
                                                                      </View>
                                                                      <View style={[styles.follower, { marginLeft: -10}]}>
                                                                                <Image source={require('../../../../assets/images/delivery.jpg')} style={styles.followerImage} />
                                                                      </View>
                                                            </View>
                                                            <Text style={styles.followerCount}>
                                                                      25 suivis
                                                            </Text>
                                                  </View>
                                        </TouchableWithoutFeedback>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          header: {
                    height: HEADER_HEIGHT
          },
          coverImageContainer: {
                    height: 120
          },
          imagePrincipal:
          {
                    width: '100%',
                    height: "100%",
                    resizeMode: "cover"
          },
          shopHeader: {
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    marginTop: -30
          },
          logoContainer: {
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#F1F1F1'
          },
          logo: {
                    width: '80%',
                    height: '80%',
                    borderRadius: 100
          },
          shopActions: {
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: 20,
                    height: 45
          },
          mainActionBtn: {
                    borderRadius: 8,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    minWidth: 120,
                    height: '100%',
                    justifyContent: "center"
          },
          mainActionText: {
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: "bold"
          },
          headerActionBtn: {
                    backgroundColor: '#F1F1F1',
                    padding: 13,
                    borderRadius: 8,
                    marginLeft: 10,
                    height: '100%',
                    justifyContent: "center"
          },
          shopInfos: {
                    paddingHorizontal: 10,
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between"
          },
          shopName: {
                    fontSize: 18,
                    fontWeight: "bold"
          },
          topCategory: {
                    color: '#777'      
          },
          shopSubtitle: {
                    color: '#777',
                    fontSize: 12,
                    lineHeight: 19
          },
          topFollowers: {
                    alignSelf: "flex-start",
                    marginVertical: 5
          },
          followers: {
                    flexDirection: 'row',
                    alignItems: "center",
          },
          follower: {
                    width: 35,
                    height: 35,
                    borderRadius: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#F1F1F1'
          },
          followerImage: {
                    width: "80%",
                    height: "80%",
                    borderRadius: 25
          },
          followerCount: {
                    textAlign: "center",
                    fontWeight: "bold"
          }
})