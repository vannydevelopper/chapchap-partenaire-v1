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
 * Modal qui affiche la modification d'une nouvelle variante
 * @author Dukizwe Darcie <darcy@mediabox.bi>
 * @date 16/01/2021
 * @param {*} param0 
 * @returns 
 */
export default function EditVariantModalize({ editVariantModalizeRef, onVariantSubmit, onVariantDelete, variant, isOpen, setIsOpen }) {
          const [variantName, setVariantName] = useState('')
          const [optionName, setOptionName] = useState('')
          const [options, setOptions] = useState([])
          const optionRef = useRef()
          const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle({ variantName, optionName }, {
                    variantName: {
                              required: true,
                              length: [1, 20]
                    },
                    optionName: {
                              required: true,
                              length: [1, 20]
                    },
          }, {
                    variantName: {
                              required: "Ce champ est obligatoire",
                              length: "Nom de la variante invalide"
                    },
                    optionName: {
                              required: "Ce champ est obligatoire",
                              length: "Option de la variante invalide"
                    },
          })
          const submitVariant = () => {
                    onVariantSubmit(variant.id, variantName, options)
                    editVariantModalizeRef.current.close()
          }

          const removeOption = useCallback(id => {
                    const newOptions = options.filter(o => o.id != id)
                    setOptions(newOptions)
          }, [options])

          const submitOption = useCallback(() => {
                    if (options.length >= LIMIT_OPTIONS || optionName.trim() == '') return false
                    setError('optionName', '')
                    setOptions(t => [...t, {
                              name: optionName,
                              id: `${optionName.toUpperCase()[0]}_${Date.now()}`
                    }])
                    setOptionName('')
          }, [optionName, options])

          useEffect(() => {
                    if (variant) {
                              setVariantName(variant.variantName)
                              setOptions(variant.options)
                    }
          }, [])
          return (
                    <Portal>
                              <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                        <Modalize
                                                  ref={editVariantModalizeRef}
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
                                                                      Modifier la variante
                                                            </Text>
                                                            <View style={styles.modalItem} >
                                                                      <View style={styles.inputCard}>
                                                                                <OutlinedTextField
                                                                                          label={"Nom"}
                                                                                          placeholder="Ex: couleur, taille"
                                                                                          fontSize={13}
                                                                                          value={variantName}
                                                                                          onChangeText={(newValue) => setVariantName(newValue)}
                                                                                          onBlur={() => checkFieldData('variantName')}
                                                                                          error={hasError('variantName') ? getError('variantName') : ''}
                                                                                          lineWidth={0.5}
                                                                                          activeLineWidth={0.5}
                                                                                          baseColor={COLORS.smallBrown}
                                                                                          tintColor={COLORS.primary}
                                                                                          returnKeyType="next"
                                                                                          containerStyle={{ flex: 1, marginTop: 15, }}
                                                                                          onSubmitEditing={() => optionRef.current.focus()}
                                                                                          blurOnSubmit={false}
                                                                                />
                                                                                <OutlinedTextField
                                                                                          label={"Les options"}
                                                                                          placeholder="Ex: jaune, rouge, XL, M"
                                                                                          fontSize={13}
                                                                                          value={optionName}
                                                                                          onChangeText={(newValue) => setOptionName(newValue)}
                                                                                          onBlur={() => checkFieldData('optionName')}
                                                                                          // error={hasError('optionName') ? getError('optionName') : ''}
                                                                                          lineWidth={0.5}
                                                                                          activeLineWidth={0.5}
                                                                                          baseColor={COLORS.smallBrown}
                                                                                          tintColor={COLORS.primary}
                                                                                          onSubmitEditing={() => submitOption()}
                                                                                          blurOnSubmit={false}
                                                                                          returnKeyType="default"
                                                                                          containerStyle={{ flex: 1, marginTop: 15 }}
                                                                                          ref={optionRef}
                                                                                />
                                                                                {options.length > 0 ? <View style={styles.options}>
                                                                                          {options.map((option, index) => {
                                                                                                    return (
                                                                                                              <TouchableOpacity style={styles.cardVariante} key={option.id} onPress={() => removeOption(option.id)}>
                                                                                                                        <Text>{option.name}</Text>
                                                                                                                        {/* <AntDesign name="close" size={15} color="red" style={{ position: 'absolute', top: -5, right: -2, fontWeight: 'bold' }} /> */}
                                                                                                              </TouchableOpacity>
                                                                                                    )
                                                                                          })
                                                                                          }
                                                                                </View> : <Text style={styles.emptyOptionFeedback}>Cliquer sur <Text style={{ fontWeight: "bold" }}>Entrer</Text> pour ajouter une option</Text>}
                                                                                <View style={styles.formActions}>
                                                                                          <TouchableOpacity style={{ flex: 1, marginRight: 10 }} onPress={() => onVariantDelete(variant.id)} >
                                                                                                    <View style={[styles.deleteBtn]}>
                                                                                                              <Text style={[styles.buttonText, { color: '#000' }]} >Supprimer</Text>
                                                                                                    </View>
                                                                                          </TouchableOpacity>
                                                                                          <TouchableOpacity style={{ flex: 1, marginLeft: 10 }} onPress={submitVariant} disabled={variantName.trim() == '' || options.length == 0}>
                                                                                                    <View style={[styles.buttonModal, { opacity: variantName.trim() == '' || options.length == 0 ? 0.5 : 1 }]}>
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
                    textAlign: 'center',
                    padding: 10,
                    fontWeight: "bold"
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