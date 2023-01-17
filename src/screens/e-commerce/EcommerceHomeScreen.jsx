import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import EcommerceTabs from "../../routes/EcommmerceTabs";
import ShopHeader from "../../components/ecommerce/home/ShopHeader";

export default function EcommerceHomeScreen() {
          const navigation = useNavigation()
          const route = useRoute()
          const { shop } = route.params
          navigation.setOptions({ title: shop.NOM_ORGANISATION })
          return (
                    <View style={styles.container}>
                              <EcommerceTabs shop={shop} />
                    </View>
          )
}
const styles = StyleSheet.create({
          container: {
                    flex: 1,
          },
})