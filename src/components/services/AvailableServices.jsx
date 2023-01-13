import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableNativeFeedback, View, Text, ActivityIndicator, Image } from "react-native";
import useFetch from "../../hooks/useFetch";
import { AntDesign, EvilIcons } from '@expo/vector-icons';

export default function AvailableServices({ title = "Services disponibles" }) {
          const [loadingServices, services] = useFetch('/services')
          const navigation = useNavigation()

          const handleServicePress = service => {
                    navigation.navigate('InscriptionPartenaireScreen', {
                              id_service: service.ID_SERVICE,
                              service: {
                                        ...service,
                                        id_service: service.ID_SERVICE
                              }
                    })
          }
          return (
                    loadingServices ? <View style={{ marginTop: 20 }}>
                              <ActivityIndicator size={"large"} color='#777' />
                    </View> :
                              <View style={styles.availableServicesContainer}>
                                        <View style={styles.availableHeader}>
                                                  <Text style={styles.availableTitle}>
                                                            { title }
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
                                                                                                    {service.NOM}
                                                                                          </Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                              </View>
          )
}


const styles = StyleSheet.create({
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