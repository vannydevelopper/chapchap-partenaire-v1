import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Keyboard, TextInput } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { COLORS } from '../../../styles/COLORS'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import { useRef } from 'react'
import { useCallback } from 'react'
import { useFormErrorsHandle } from '../../../hooks/useFormErrorsHandle'

const LIMIT_OPTIONS = 5
/**
 * Modal qui affiche l'ajout d'une nouvelle variante
 * @author Dukizwe Darcie <darcy@mediabox.bi>
 * @date 16/01/2021
 * @param {*} param0 
 * @returns 
 */
export default function NewVariantModalize({ variantModalizeRef, onVariantSubmit }) {
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
                    onVariantSubmit(variantName, options)
                    setOptions([])
                    setVariantName('')
                    variantModalizeRef.current.close()
          }

          const removeOption = useCallback(id => {
                    const newOptions = options.filter(o => o.id != id)
                    setOptions(newOptions)
          }, [options])

          const submitOption = useCallback(() => {
                    if(options.length >= LIMIT_OPTIONS || optionName.trim() == '') return false
                    setError('optionName', '')
                    setOptions(t => [...t, {
                              name: optionName,
                              id: `${optionName.toUpperCase()[0]}_${Date.now()}`
                    }])
                    setOptionName('')
          }, [optionName, options])
          return (
                    <Modalize
                              ref={variantModalizeRef}
                              adjustToContentHeight
                              handlePosition='inside'
                              scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
                              onClose={() => Keyboard.dismiss()}>
                              <View style={styles.modalContainer}>
                                        <Text style={styles.modalTitle}>
                                                  Nouvelle variante
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
                                                                      autoFocus
                                                                      returnKeyType="next"
                                                                      containerStyle={{ flex: 1, marginTop: 15,   }}
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
                                                                                                    </TouchableOpacity>
                                                                                          )
                                                                                })
                                                                      }
                                                            </View> : <Text style={styles.emptyOptionFeedback}>Cliquer sur <Text style={{ fontWeight: "bold"}}>Entrer</Text> pour ajouter une option</Text>}
                                                            <TouchableOpacity onPress={submitVariant} disabled={variantName.trim() == '' || options.length == 0}>
                                                                      <View style={[styles.buttonModal, { opacity: variantName.trim() == '' || options.length == 0 ? 0.5 : 1 }]}>
                                                                                <Text style={styles.buttonText} >Ajouter</Text>
                                                                      </View>
                                                            </TouchableOpacity>
                                                  </View>
                                        </View>
                              </View>
                    </Modalize>
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
                    borderRadius: 5,
                    paddingVertical: 15,
                    padding: 10,
                    marginTop: 10,
                    backgroundColor: COLORS.ecommercePrimaryColor
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
          }
})