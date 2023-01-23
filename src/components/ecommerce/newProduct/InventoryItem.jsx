import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback } from "react-native";
import { SimpleLineIcons, AntDesign, Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import EditInventoryItem from "./EditInventoryItemModalize";
import EditInventoryItemModalize from "./EditInventoryItemModalize";

export default function InventoryItem({ inventory, handleInventoryEdit, handleInventoryDelete, SERVICE }) {
          const editInventoryModalizeRef = useRef()
          const [isOpen, setIsOpen] = useState(false)
          return (
                    <>
                    <View>
                              <TouchableNativeFeedback onPress={() => {
                                        setIsOpen(true)
                                        editInventoryModalizeRef.current.open()
                              }}>
                                        <View style={styles.inventory}>
                                                  <View>
                                                            <View style={styles.inventoryOptions}>
                                                                      {inventory.items.map((option, index) => {
                                                                                return (
                                                                                          <Text style={styles.inventoryOption} key={index}>
                                                                                                    {index > 0 && ' - '}{ option.name }
                                                                                          </Text>
                                                                                )
                                                                      })}
                                                            </View>
                                                            <View style={styles.inventoryDetail}>
                                                                      <Text style={styles.inventoryTitle}>
                                                                                Prix:
                                                                      </Text>
                                                                      <Text style={styles.inventoryPrice}>
                                                                                {inventory.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU
                                                                      </Text>
                                                            </View>
                                                            <View style={styles.inventoryDetail}>
                                                                      <Text style={styles.inventoryTitle}>
                                                                                Quantité:
                                                                      </Text>
                                                                      <Text style={styles.inventoryPrice}>
                                                                                {inventory.quantity}
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.inventoryActions}>
                                                            <Entypo name="edit" size={20} color="#777" />
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                    </View>
                    <EditInventoryItemModalize
                              editInventoryModalizeRef={editInventoryModalizeRef}
                              inventory={inventory}
                              SERVICE={SERVICE}
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              onVariantSubmit={handleInventoryEdit}
                              onVariantDelete={handleInventoryDelete}
                    />
                    </>
          )
}

const styles = StyleSheet.create({
          inventory: {
                    borderColor: '#777',
                    borderBottomWidth: 0.5,
                    padding: 10,
                    overflow: "hidden",
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 5
          },
          inventoryOptions: {
                    flexDirection: 'row',
                    alignItems: "center",
          },
          inventoryActions: {
                    flexDirection: 'row',
                    alignItems: 'center'
          },
          inventoryTitle: {
                    color: '#777'
          },
          inventoryPrice: {
                    marginLeft: 10
          },
          inventoryDetail: {
                    flexDirection: 'row',
                    alignItems: 'center'
          }
})