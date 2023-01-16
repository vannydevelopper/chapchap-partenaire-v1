import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Keyboard, TextInput } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { COLORS } from '../../../styles/COLORS'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import { useRef } from 'react'
import { useCallback } from 'react'
import { useFormErrorsHandle } from '../../../hooks/useFormErrorsHandle'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Portal } from 'react-native-portalize'
import { AntDesign } from '@expo/vector-icons'; 


const LIMIT_OPTIONS = 5
/**
 * Modal qui affiche la modification d'un élément de l'inventaire
 * @author Dukizwe Darcie <darcy@mediabox.bi>
 * @date 16/01/2021
 * @param {*} param0 
 * @returns 
 */
export default function EditInventoryItemModalize({ editInventoryModalizeRef, onVariantSubmit, onVariantDelete, inventory, isOpen, setIsOpen }) {
          const [price, setPrice] = useState(inventory.price.toString())
          const [quantity, setQuantity] = useState(inventory.quantity.toString())
          const optionRef = useRef()
          const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle({ price, quantity }, {
                    price: {
                              required: true,
                              length: [1, 11],
                              number: true
                    },
                    quantity: {
                              required: true,
                              length: [1, 11],
                              number: true
                    },
          }, {
                    price: {
                              required: "Ce champ est obligatoire",
                              length: "Prix invalide",
                              number: "Prix invalide",
                    },
                    quantity: {
                              required: "Ce champ est obligatoire",
                              length: "Quantité invalide",
                              number: "Quantité invalide"
                    },
          })
          const submitVariant = () => {
                    onVariantSubmit(inventory.id, price, quantity)
                    editInventoryModalizeRef.current.close()
          }

          const isValid = () => {
                    return price.trim() != '' && parseInt(price) > 0 && quantity.trim() != '' && parseInt(quantity) > 0
          }
          return (
                    <Portal>
                              <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                        <Modalize
                                                  ref={editInventoryModalizeRef}
                                                  adjustToContentHeight
                                                  handlePosition='inside'
                                                  scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
                                                  onClose={() => Keyboard.dismiss()}
                                                  onClosed={() => {
                                                            setIsOpen(false)
                                                  }}
                                        >
                                                  <View style={styles.modalContainer}>
                                                            <Text style={styles.modalTitle}>
                                                                      {inventory.items.map((option, index) => {
                                                                                return (
                                                                                          <Text style={styles.inventoryOption} key={index}>
                                                                                                    {index > 0 && ' - '}{ option.name }
                                                                                          </Text>
                                                                                )
                                                                      })}
                                                            </Text>
                                                            <View style={styles.modalItem} >
                                                                      <View style={styles.inputCard}>
                                                                                <OutlinedTextField
                                                                                          label={"Prix"}
                                                                                          fontSize={13}
                                                                                          value={price}
                                                                                          onChangeText={(newValue) => setPrice(newValue)}
                                                                                          onBlur={() => checkFieldData('price')}
                                                                                          error={hasError('price') ? getError('price') : ''}
                                                                                          lineWidth={0.5}
                                                                                          activeLineWidth={0.5}
                                                                                          baseColor={COLORS.smallBrown}
                                                                                          tintColor={COLORS.primary}
                                                                                          returnKeyType="next"
                                                                                          containerStyle={{ flex: 1, marginTop: 15, }}
                                                                                          onSubmitEditing={() => optionRef.current.focus()}
                                                                                          blurOnSubmit={false}
                                                                                          keyboardType="decimal-pad"
                                                                                />
                                                                                <OutlinedTextField
                                                                                          label={"Quantité"}
                                                                                          fontSize={13}
                                                                                          value={quantity}
                                                                                          onChangeText={(newValue) => setQuantity(newValue)}
                                                                                          onBlur={() => checkFieldData('quantity')}
                                                                                          error={hasError('quantity') ? getError('quantity') : ''}
                                                                                          lineWidth={0.5}
                                                                                          activeLineWidth={0.5}
                                                                                          baseColor={COLORS.smallBrown}
                                                                                          tintColor={COLORS.primary}
                                                                                          returnKeyType="default"
                                                                                          containerStyle={{ flex: 1, marginTop: 15 }}
                                                                                          ref={optionRef}
                                                                                          keyboardType="decimal-pad"
                                                                                />
                                                                                <View style={styles.formActions}>
                                                                                          <TouchableOpacity style={{ flex: 1, marginRight: 10 }} onPress={() => {
                                                                                                    onVariantDelete(inventory.id)
                                                                                                    editInventoryModalizeRef.current.close()
                                                                                          }} >
                                                                                                    <View style={[styles.deleteBtn]}>
                                                                                                              <Text style={[styles.buttonText, { color: '#000' }]} >Supprimer</Text>
                                                                                                    </View>
                                                                                          </TouchableOpacity>
                                                                                          <TouchableOpacity style={{ flex: 1, marginLeft: 10 }} onPress={submitVariant} disabled={!isValid()}>
                                                                                                    <View style={[styles.buttonModal, { opacity: !isValid() ? 0.5 : 1 }]}>
                                                                                                              <Text style={styles.buttonText} >Enregistrer</Text>
                                                                                                    </View>
                                                                                          </TouchableOpacity>
                                                                                </View>
                                                                      </View>
                                                            </View>
                                                  </View>
                                        </Modalize>
                              </GestureHandlerRootView>
                    </Portal>
          )
}

const styles = StyleSheet.create({
          modalContainer: {
                    padding: 10
          },
          modalTitle: {
                    padding: 10,
                    fontWeight: "bold",
                    flexDirection: 'row',
                    alignItems: "center"
          },
          buttonModal: {
                    borderColor: '#777',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    paddingVertical: 15,
                    padding: 10,
                    marginTop: 10,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    flex: 1
          },
          deleteBtn: {
                    borderColor: '#777',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    paddingVertical: 15,
                    padding: 10,
                    marginTop: 10,
                    flex: 1
          },
          buttonText: {
                    textAlign: "center",
                    color: '#FFF',
                    fontWeight: "bold",
          },
          cardVariante: {
                    backgroundColor: '#ddd',
                    borderRadius: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    margin: 2
          },
          options: {
                    flexDirection: "row",
                    alignItems: 'center',
                    alignContent: 'center',
                    flexWrap: "wrap"
          },
          emptyOptionFeedback: {
                    fontSize: 11,
                    color: '#777'
          },
          formActions: {
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between"
          },
})