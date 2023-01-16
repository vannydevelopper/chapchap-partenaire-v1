import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback } from "react-native";
import { SimpleLineIcons, AntDesign, Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import { useRef } from "react";
import EditVariantModalize from "./EditVariantModalize";
import { Portal } from "react-native-portalize";

export default function Variant({ variant, handleVariantEdit, handleVariantDelete }) {
          const editVariantModalizeRef = useRef()
          const [isOpen, setIsOpen] = useState(false)
          return (
                    <>
                    <View>
                              <TouchableNativeFeedback onPress={() => {
                                        setIsOpen(true)
                                        editVariantModalizeRef.current.open()
                              }}>
                                        <View style={styles.variantBtn}>
                                                  <Text style={styles.variantText}>{ variant.variantName }</Text>
                                                  <Entypo name="edit" size={20} color="#777" />
                                        </View>
                              </TouchableNativeFeedback>
                    </View>
                    <EditVariantModalize
                              editVariantModalizeRef={editVariantModalizeRef}
                              variant={variant}
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              onVariantSubmit={handleVariantEdit}
                              onVariantDelete={handleVariantDelete}
                    />
                    </>
          )
}

const styles = StyleSheet.create({
          variantBtn: {
                    borderColor: '#777',
                    borderBottomWidth: 0.5,
                    padding: 10,
                    overflow: "hidden",
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 5
          },
          variantText: {
                    color: '#777'
          },
})