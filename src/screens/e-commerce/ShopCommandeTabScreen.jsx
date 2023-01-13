import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ShopCommandeTabScreen() {
          return (
                    <View style={styles.container}>
                              <Text style={styles.title}>Commande</Text>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    height: 1000
          },
          title: {
                    fontSize: 30
          }
})