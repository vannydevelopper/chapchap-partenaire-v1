import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableWithoutFeedback, Button, TouchableOpacity, ImageBackground, TouchableNativeFeedback, TextInput, StatusBar, ActivityIndicator, } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useForm } from '../../hooks/useForm';
import { Modalize } from 'react-native-modalize';
import useFetch from "../../hooks/useFetch";
import { DrawerActions, useFocusEffect, useNavigation, useNavigationBuilder, useRoute } from '@react-navigation/native';
import fetchApi from '../../helpers/fetchApi';
import { MaterialCommunityIcons, Octicons, Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../styles/COLORS';
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as Location from 'expo-location'
import Loading from '../../components/app/Loading';
import { useFormErrorsHandle } from '../../hooks/useFormErrorsHandle';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelector';

export default function InscriptionPartenaireScreen() {
          const route = useRoute()
          const navigation = useNavigation()
          const dispatch = useDispatch()
          const [services, setService] = useState([])
          const [loadingTypes, partenairetypes] = useFetch('/partenaire/type')
          const [location, setLocation] = useState(null)
          const servicesModalizeRef = useRef(null)
          const partenairetypesModalizeRef = useRef(null)
          const serviceRef = useRef(null)
          const [ServiceSelect, setServiceSelect] = useState(null)
          const [selectedTypePartenaire, setSelectedTypePartenaire] = useState(null)

          const [logoImage, setLogoImage] = useState(null)
          const [backgroundImage, setBackgroundImage] = useState(null)
          const [isLoading, setIsLoading] = useState(false)
          const [loading, setLoading] = useState(false);
          const { id_service, service } = route.params
          const user = useSelector(userSelector)
          const form = new FormData()
          const [data, handleChange, setValue] = useForm({
                    ServiceSelect: null,
                    typepartenaireselect: null,
                    organisation: "",
                    email: user.result.EMAIL,
                    telephone: "",
                    nif: "",
                    adresse: "",
          })

          const { checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                    organisation: {
                              required: true,
                              length: [1, 200]
                    },
                    adresse: {
                              required: true,
                              length: [1, 200]
                    },
                    nif: {
                              required: true,
                              length: [1, 30]
                    },
                    email: {
                              required: true,
                              email: true
                    },
                    telephone: {
                              required: true,
                              length: [1, 15]
                    },
          }, {
                    email: {
                              required: "L'email est obligatoire",
                              email: "Email invalide"
                    },
                    telephone: {
                              required: "Le numéro de téléphone est obligatoire",
                              length: "Numéro de téléphone invalide"
                    },
                    organisation: {
                              required: "Le nom du service est obligatoire",
                              length: "Nom du service invalide"
                    },
                    adresse: {
                              required: "L'adresse est obligatoire",
                              length:"Adresse incorrecte"
                    },
                    nif: {
                              required: "Le NIF est obligatoire",
                              length:"NIF incorrect"
                    },
          })

          const isValid = useCallback(() => {
                    const basicValidation = selectedTypePartenaire != null && data.email != "" && data.telephone != "" && logoImage != null && logoImage != null && backgroundImage != null
                    // if (selectedTypePartenaire && selectedTypePartenaire?.ID_PARTENAIRE_TYPE == 2) {
                    //           return basicValidation && data.organisation != "" && data.adresse != "" && data.nif != ""
                    // }
                    return basicValidation && isValidate()
          }, [data, logoImage, selectedTypePartenaire, backgroundImage, isValidate])

          const sendData = async () => {
                    try {
                              setLoading(true)
                              form.append('ID_TYPE_PARTENAIRE', selectedTypePartenaire.ID_PARTENAIRE_TYPE)
                              if (data.organisation) {
                                        console.log("org")
                                        form.append('NOM_ORGANISATION', data.organisation)
                              }
                              else {
                                        console.log("user")

                                        form.append('NOM_ORGANISATION', user.result.NOM)
                              }

                              form.append('TELEPHONE', data.telephone)
                              form.append('NIF', data.nif)
                              form.append('EMAIL', data.email)
                              form.append('ADRESSE_COMPLETE', data.adresse)
                              form.append('LONGITUDE', location.coords.longitude)
                              form.append('LATITUDE', location.coords.latitude)
                              form.append('ID_SERVICE', id_service)

                              if (logoImage) {
                                        const manipResult = await manipulateAsync(
                                                  logoImage.uri,
                                                  [
                                                            { resize: { width: 500 } }
                                                  ],
                                                  { compress: 0.8, format: SaveFormat.JPEG }
                                        );
                                        let localUri = manipResult.uri;
                                        let filename = localUri.split('/').pop();
                                        let match = /\.(\w+)$/.exec(filename);
                                        let type = match ? `image/${match[1]}` : `image`;
                                        form.append('LOGO', {
                                                  uri: localUri, name: filename, type
                                        })

                              }

                              if (backgroundImage) {
                                        const manipResult = await manipulateAsync(
                                                  backgroundImage.uri,
                                                  [
                                                            { resize: { width: 500 } }
                                                  ],
                                                  { compress: 0.7, format: SaveFormat.JPEG }
                                        );
                                        let localUri = manipResult.uri;
                                        let filename = localUri.split('/').pop();
                                        let match = /\.(\w+)$/.exec(filename);
                                        let type = match ? `image/${match[1]}` : `image`;
                                        form.append('BACKGROUND_IMAGE', {
                                                  uri: localUri, name: filename, type
                                        })
                              }
                              const res = await fetchApi("/partenaire/Ajouter", {
                                        method: "POST",
                                        body: form
                              })
                              navigation.navigate('HomeScreen')
                    }
                    catch (error) {
                              console.log(error)
                    } finally {
                              setLoading(false)
                    }

          }
          const onServiceSelect = (service) => {
                    setServiceSelect(service)
                    servicesModalizeRef.current.close()
          }
          const onTypePartenaireSelect = (partenairetype) => {
                    setSelectedTypePartenaire(partenairetype)
                    partenairetypesModalizeRef.current.close()
          }

          useEffect(() => {
                    (async () => {
                              try {


                                        const response = await fetchApi('/service', {
                                                  method: "GET",
                                                  headers: { "Content-Type": "application/json" },
                                        })
                                        setService(response.result)
                              } catch (error) {
                                        console.log(error)
                              }
                    })()
          }, [])

          const onLogoSelect = async () => {
                    const photo = await ImagePicker.launchImageLibraryAsync({
                              mediaTypes: ImagePicker.MediaTypeOptions.Images,
                              allowsMultipleSelection: true
                    })
                    if (photo.cancelled) {
                              return false
                    }
                    setLogoImage(photo)
          }
          const onBackgroundSelect = async () => {
                    const image = await ImagePicker.launchImageLibraryAsync({
                              mediaTypes: ImagePicker.MediaTypeOptions.Images,
                              allowsMultipleSelection: true
                    })
                    if (image.cancelled) {
                              return false
                    }
                    setBackgroundImage(image)
          }


          const askLocationPermission = async () => {
                    let {
                              status: locationStatus,
                    } = await Location.requestForegroundPermissionsAsync()
                    if (locationStatus !== 'granted') {
                              console.log('Permission to access location was denied')
                              setLocation(false)
                              return
                    }
                    var locatio = await Location.getCurrentPositionAsync({})
                    setLocation(locatio)
          }
          useEffect(() => {
                    askLocationPermission()
          }, [])
          useEffect(() => {
                    if(partenairetypes.result) {
                              const organisationType = partenairetypes.result.find(t => t.ID_PARTENAIRE_TYPE == 2)
                              setSelectedTypePartenaire(organisationType)
                    }
          }, [partenairetypes])
          if (location === false) {
                    return (
                              <View
                                        style={{
                                                  alignContent: 'center',
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                  flex: 1,
                                        }}
                              >
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, opacity: 0.8 }}>
                                                  Pas d'accès à la localisation
                                        </Text>
                                        <Text
                                                  style={{
                                                            textAlign: 'center',
                                                            color: '#0a5744',
                                                            marginTop: 10,
                                                            paddingHorizontal: 10,
                                                  }}
                                        >
                                                  L'application a besoin de votre localisation pour fonctionner
                                        </Text>
                                        <TouchableNativeFeedback
                                                  background={TouchableNativeFeedback.Ripple('#ddd')}
                                                  useForeground={true}
                                                  onPress={() => askLocationPermission()}
                                        >
                                                  <View
                                                            style={{
                                                                      backgroundColor: '#fff',
                                                                      borderRadius: 10,
                                                                      padding: 10,
                                                                      marginTop: 20,
                                                            }}
                                                  >
                                                            <Text>Autoriser l'accès</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                    )
          }


          return (
                    <>
                              {loading && <Loading />}
                              {/* <StatusBar hidden /> */}
                              <View style={styles.container}>
                                        <View style={styles.header}>
                                                  <View style={styles.headerActions}>
                                                            <TouchableNativeFeedback
                                                                      accessibilityRole="button"
                                                                      background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                                                                      onPress={() => navigation.goBack()}
                                                            >
                                                                      <View style={{ padding: 10 }}>
                                                                                <AntDesign name="close" size={24} color="#FFF" />
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                  </View>
                                                  <View style={styles.headerTitle}>
                                                            <Text style={styles.title}>{service.NOM}</Text>
                                                  </View>
                                        </View>
                                        {loadingTypes ? <View style={{ marginTop: -15, flex: 1, justifyContent: "center", alignItems: "center", borderTopRightRadius: 15, borderTopLeftRadius: 15, backgroundColor: '#fff' }}>
                                                  <ActivityIndicator color={"#777"} size="large" />
                                        </View> :
                                        <ScrollView keyboardShouldPersistTaps="handled" style={styles.scroll} contentInset={{ top: StatusBar.currentHeight }} contentOffset={{ y: -StatusBar.currentHeight }}>
                                                  <View style={styles.inputs}>
                                                            {false && <View style={{ marginTop: 10, marginBottom: 5 }}>
                                                                      <TouchableOpacity style={styles.modalCard}
                                                                                onPress={() => partenairetypesModalizeRef.current.open()}
                                                                                disabled={service.id_service == 2}
                                                                      >
                                                                                <View style={[service.id_service == 2 && { opacity: 0.5 }]}>
                                                                                          <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                                    Le type de partenaire
                                                                                          </Text>
                                                                                          {selectedTypePartenaire && <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                                    {selectedTypePartenaire.DESCRIPTION}
                                                                                          </Text>}
                                                                                </View>
                                                                                <Entypo name="chevron-small-down" size={24} color="#777" />
                                                                      </TouchableOpacity>
                                                            </View>}
                                                            {selectedTypePartenaire != null && selectedTypePartenaire.ID_PARTENAIRE_TYPE == 2 && <View style={[styles.inputCard, { }]}>
                                                                      <OutlinedTextField
                                                                                label={service.id_service == 2 ? "Nom du restaurant" : "Nom du boutique"}
                                                                                fontSize={14}
                                                                                value={data.organisation}
                                                                                onChangeText={(newValue) => handleChange('organisation', newValue)}
                                                                                onBlur={() => checkFieldData('organisation')}
                                                                                error={hasError('organisation') ? getError('organisation') : ''}
                                                                                lineWidth={0.5}
                                                                                activeLineWidth={0.5}
                                                                                baseColor={COLORS.smallBrown}
                                                                                tintColor={COLORS.primary}
                                                                      />
                                                            </View>}
                                                            {selectedTypePartenaire != null && selectedTypePartenaire.ID_PARTENAIRE_TYPE == 2 && <View style={styles.inputCard}>
                                                                      <OutlinedTextField
                                                                                label="Adresse Complète"
                                                                                fontSize={14}
                                                                                value={data.adresse}
                                                                                onChangeText={(newValue) => handleChange('adresse', newValue)}
                                                                                onBlur={() => checkFieldData('adresse')}
                                                                                error={hasError('adresse') ? getError('adresse') : ''}
                                                                                lineWidth={0.5}
                                                                                activeLineWidth={0.5}
                                                                                baseColor={COLORS.smallBrown}
                                                                                tintColor={COLORS.primary}
                                                                      />
                                                            </View>}
                                                            <View style={styles.inputCard}>
                                                                      <OutlinedTextField
                                                                                label="Email"
                                                                                fontSize={14}
                                                                                value={data.email}
                                                                                onChangeText={(newValue) => handleChange('email', newValue)}
                                                                                onBlur={() => checkFieldData('email')}
                                                                                error={hasError('email') ? getError('email') : ''}
                                                                                keyboardType='email-address'
                                                                                lineWidth={0.5}
                                                                                activeLineWidth={0.5}
                                                                                baseColor={COLORS.smallBrown}
                                                                                tintColor={COLORS.primary}
                                                                      />
                                                            </View>
                                                            <View style={styles.inputCard}>
                                                                      <OutlinedTextField
                                                                                label="Numéro de téléphone"
                                                                                fontSize={14}
                                                                                value={data.telephone}
                                                                                onChangeText={(newValue) => handleChange('telephone', newValue)}
                                                                                onBlur={() => checkFieldData('telephone')}
                                                                                error={hasError('telephone') ? getError('telephone') : ''}
                                                                                keyboardType='number-pad'
                                                                                lineWidth={0.5}
                                                                                activeLineWidth={0.5}
                                                                                baseColor={COLORS.smallBrown}
                                                                                tintColor={COLORS.primary}
                                                                      />
                                                            </View>
                                                            {selectedTypePartenaire != null && selectedTypePartenaire.ID_PARTENAIRE_TYPE == 2 && <View style={styles.inputCard}>
                                                                      <OutlinedTextField
                                                                                label="NIF"
                                                                                fontSize={14}
                                                                                value={data.nif}
                                                                                onChangeText={(newValue) => handleChange('nif', newValue)}
                                                                                onBlur={() => checkFieldData('nif')}
                                                                                error={hasError('nif') ? getError('nif') : ''}
                                                                                lineWidth={0.5}
                                                                                activeLineWidth={0.5}
                                                                                baseColor={COLORS.smallBrown}
                                                                                tintColor={COLORS.primary}
                                                                      />
                                                            </View>}
                                                            <View style={[styles.addImageContainer, { }]}>
                                                                      <TouchableWithoutFeedback onPress={onLogoSelect}>
                                                                                <View style={[styles.addImageItem]}>
                                                                                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                                                    <Feather name="image" size={24} color="#777" />
                                                                                                    <Text style={styles.addImageLabel}>
                                                                                                              {service.id_service == 2 ? "Logo de votre restaurant" : "Logo de votre boutique"}
                                                                                                    </Text>
                                                                                          </View>
                                                                                          {logoImage && <Image source={{ uri: logoImage.uri }} style={{ width: "100%", height: 200, marginTop: 10, borderRadius: 5 }} />}
                                                                                </View>
                                                                      </TouchableWithoutFeedback>
                                                                      <TouchableWithoutFeedback onPress={onBackgroundSelect}>
                                                                                <View style={[styles.addImageItem, { marginTop: 20  }]}>
                                                                                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                                                    <Feather name="image" size={24} color="#777" />
                                                                                                    <Text style={styles.addImageLabel}>Image de fond</Text>
                                                                                          </View>
                                                                                          {backgroundImage && <Image source={{ uri: backgroundImage.uri }} style={{ width: "100%", height: 200, marginTop: 10, borderRadius: 5 }} />}
                                                                                </View>
                                                                      </TouchableWithoutFeedback>
                                                            </View>
                                                            <View style={styles.navigation}>
                                                                      <TouchableOpacity onPress={sendData} disabled={!isValid()}>
                                                                                <View style={[styles.nextBtn, !isValid() && { opacity: 0.5 }]}>
                                                                                          <Text style={[styles.navigationBtnText]}>
                                                                                                    Envoyer
                                                                                          </Text>
                                                                                </View>
                                                                      </TouchableOpacity>
                                                            </View>
                                                  </View>
                                        </ScrollView>}
                              </View>
                              <Modalize ref={servicesModalizeRef} adjustToContentHeight handlePosition='inside'>
                                        <>
                                                  <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Type de Service</Text>
                                                  </View>
                                                  <View>
                                                            {services.map((service, index) => {
                                                                      return (
                                                                                <TouchableOpacity key={index} onPress={() => onServiceSelect(service)}>
                                                                                          <View style={styles.modalItem} >
                                                                                                    {ServiceSelect?.ID_SERVICE == service.ID_SERVICE ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                                              <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                                                    <Text>{service.NOM}</Text>
                                                                                          </View>
                                                                                </TouchableOpacity>
                                                                      )

                                                            })

                                                            }
                                                  </View>
                                        </>
                              </Modalize>

                              <Modalize ref={partenairetypesModalizeRef} adjustToContentHeight handlePosition='inside'>
                                        <>
                                                  <View>
                                                            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                                                      <Text style={{ fontSize: 17, fontWeight: "bold" }}>Type de partenaire</Text>
                                                            </View>
                                                            {partenairetypes.result ? partenairetypes.result.map((partenairetype, index) => {
                                                                      return (
                                                                                <TouchableOpacity key={index} onPress={() => onTypePartenaireSelect(partenairetype)}>
                                                                                          <View style={styles.modalItem} >
                                                                                                    {selectedTypePartenaire?.ID_PARTENAIRE_TYPE == partenairetype.ID_PARTENAIRE_TYPE ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                                              <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                                                    <Text style={{ marginLeft: 10 }}>{partenairetype.DESCRIPTION}</Text>
                                                                                          </View>
                                                                                </TouchableOpacity>
                                                                      )
                                                            }) : null}
                                                  </View>
                                        </>
                              </Modalize>

                    </>

          )

}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    marginTop: StatusBar.currentHeight
          },
          scroll: {
                    marginTop: -15,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
          },
          inputs:  {
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    marginTop: 10
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    height: 88
          },
          menuOpener: {
                    marginTop: 25
          },
          menuOpenerLine: {
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.primary,
                    marginTop: 5
          },
          logo: {
                    resizeMode: 'center',
                    height: "50%",
                    width: "50%",
                    marginTop: 25
          },
          imageContainer: {
                    height: "100%",
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          image: {
                    marginTop: 30,
                    alignSelf: "center",
          },
          header: {
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    minHeight: 160
          },
          title: {
                    fontWeight: 'bold',
                    fontSize: 25,
                    fontWeight: "bold",
                    color: '#FFF',
                    textAlign: "center"
          },
          headerActions: {
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
          },
          headerTitle: {
                    flex: 1,
                    alignItems: "center",
          },
          button: {
                    marginTop: 10,
                    borderRadius: 8,
                    paddingVertical: 14,
                    paddingHorizontal: 10,
                    backgroundColor: COLORS.primaryPicker,
                    marginHorizontal: 20
          },
          description: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#1D8585"
          },
          buttonText: {
                    color: "#fff",
                    fontWeight: "bold",
                    // textTransform:"uppercase",
                    fontSize: 16,
                    textAlign: "center"
          },
          inputCard: {
                    marginHorizontal: 20,
                    marginTop: 15,
          },
          ButtonCard: {
                    marginHorizontal: 20,
                    marginTop: 10,
                    backgroundColor: COLORS.primaryPicker,

          },
          addImage: {
                    width: 120,
                    height: 120,
                    borderRadius: 5,
                    margin: 10,
                    marginHorizontal: 20,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    borderColor: '#777',
                    backgroundColor: '#f1f1f1',
                    // borderWidth: 1,
                    //alignSelf: 'center'
          },
          image: {

                    fontWeight: 'bold',
                    fontSize: 14,
                    color: 'black',
                    fontWeight: 'bold',
                    //  marginTop: 10, 
                    textAlign: "center",
                    alignSelf: 'center'

          },

          modalItem: {
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          openModalizeLabel: {
                    color: '#555',
                    fontSize: 14,
          },
          CardModal: {
                    flex: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginHorizontal: 20

          },
          addImageContainer: {
                    paddingHorizontal: 20
          },
          addImageItem: {
                    borderWidth: 0.5,
                    borderColor: COLORS.smallBrown,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    marginTop: 15
          },
          addImageLabel: {
                    fontWeight: "bold",
                    marginLeft: 5,
                    opacity: 0.8
          },
          button: {
                    marginTop: 10,
                    borderRadius: 8,
                    paddingVertical: 14,
                    paddingHorizontal: 10,
                    backgroundColor: "#1D8585",
                    marginHorizontal: 20
          },
          buttonText: {
                    color: "#fff",
                    fontWeight: "bold",
                    // textTransform:"uppercase",
                    fontSize: 16,
                    textAlign: "center"
          },
          modalCard: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 20,
                    backgroundColor: "#fff",
                    padding: 13,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: "#aaa"
          },
          selectControl: {
                    paddingHorizontal: 20,
                    marginTop: 10
          },
          selectLabel: {
                    fontWeight: "bold",
                    marginLeft: 5
          },
          images: {
                    flexDirection: "row"
          },
          addImager: {
                    width: 160,
                    height: 100,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5
          },
          navigation: {
                    paddingHorizontal: 20,
                    marginTop: 10
          },
          nextBtn: {
                    paddingVertical: 20,
                    overflow: "hidden",
                    backgroundColor: COLORS.primaryPicker,
                    borderRadius: 8,
                    marginBottom: 10
          },
          navigationBtnText: {
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#FFF"
          },
          cancelBtn: {
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#ddd',
                    overflow: "hidden"
          },
          inputText: {
                    color: '#777'
          }
})
