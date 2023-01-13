import React from 'react'
import { ScrollView, StyleSheet, Image, View, Text, TouchableNativeFeedback, ActivityIndicator } from 'react-native'
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';

export default function EmptyServiceFeeback() {
          const [loadingServices, services] = useFetch('/services')
          const navigation = useNavigation()

          const handleServicePress = service =>  {
                    navigation.navigate('InscriptionPartenaireScreen', {
                              id_service: service.ID_SERVICE,
                              service: {
                                        ...service,
                                        id_service: service.ID_SERVICE
                              }
                    })
          }
          return (<ScrollView style={styles.emptyWrapper} showsVerticalScrollIndicator={false}>
                    <View style={styles.emptyFeebacksContainer}>
                              <View style={styles.emptyImageWrapper}>
                                        <Image source={require('../../../assets/images/no_data.png')} style={styles.emptyDataImage} />
                              </View>
                              <Text style={styles.emptyFeedbackTitle}>
                                        Aucun service trouvé
                              </Text>
                              <Text style={styles.emptyFeedbackDescription}>
                                        Vous n'avez aucun service enregistré pour le moment. Vos services s'afficheront ici à la prochaine
                              </Text>
                    </View>
                    {loadingServices ? <View style={{ marginTop: 20 }}>
                              <ActivityIndicator size={"large"} color='#777' />
                    </View>:
                    <View style={styles.availableServicesContainer}>
                              <View style={styles.availableHeader}>
                                        <Text style={styles.availableTitle}>
                                                  Services disponibles
                                        </Text>
                                        {false && <TouchableNativeFeedback>
                                                  <View style={styles.searchBtn}>
                                                            <AntDesign name="search1" size={24} color="#fff" />
                                                  </View>
                                        </TouchableNativeFeedback>}
                              </View>
                              <View style={styles.availableServices}>
                                        {services.result.map((service, index) => {
                                                  return (
                                                            <TouchableNativeFeedback key={service.ID_SERVICE} onPress={() => handleServicePress(service)}>
                                                                      <View style={styles.evService}>
                                                                                <View style={styles.evServiceImageContainer}>
                                                                                          <Image source={{ uri: service.IMAGE }} style={styles.evServiceImage} />
                                                                                </View>
                                                                                <Text style={styles.evServiceName}>
                                                                                          { service.NOM }
                                                                                </Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                  )
                                        })}
                              </View>
                    </View>}
          </ScrollView>
          )
}

const styles = StyleSheet.create({
          emptyWrapper: {
          },
          emptyFeebacksContainer: {
                    marginVertical: 10
          },
          emptyImageWrapper: {
                    height: 150,
                    width: '50%',
                    alignSelf: "center"
          },
          emptyDataImage: {
                    resizeMode: "contain",
                    width: '100%',
                    height: '100%'
          },
          emptyFeedbackTitle: {
                    color: '#000',
                    fontWeight: "bold",
                    textAlign: "center"
          },
          emptyFeedbackDescription: {
                    color: '#777',
                    fontSize: 13,
                    textAlign: "center",
                    maxWidth: "80%",
                    marginTop: 10,
                    lineHeight: 20,
                    alignSelf: "center"
          },
          availableServicesContainer: {
                    flex: 1,
                    backgroundColor: '#171717',
                    padding: 10,
          },
          availableHeader: {
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 20
          },
          availableTitle: {
                    color: '#FFF',
                    fontSize: 17,
                    fontWeight: "bold",
                    opacity: 0.9
          },
          evService: {
                    height: 100,
                    borderRadius: 15,
                    backgroundColor: '#2e2d2d',
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: 10,
          },
          evServiceImageContainer: {
                    height: '100%',
                    width: '30%'
          },
          evServiceImage: {
                    width: '100%',
                    height: '100%',
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15
          },
          evServiceName: {
                    color: '#FFF',
                    fontSize: 17,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    marginLeft: 15
          }
})