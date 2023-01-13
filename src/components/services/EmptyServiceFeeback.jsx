import React from 'react'
import { ScrollView, StyleSheet, Image, View, Text, TouchableNativeFeedback, ActivityIndicator } from 'react-native'
import AvailableServices from './AvailableServices'

export default function EmptyServiceFeeback() {
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
                    <AvailableServices />
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
})