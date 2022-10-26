import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableWithoutFeedback, Button, TouchableOpacity, ImageBackground, TouchableNativeFeedback, TextInput, } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useForm } from '../../hooks/useForm';
import { Modalize } from 'react-native-modalize';
import useFetch from "../../hooks/useFetch";
import { DrawerActions, useFocusEffect, useNavigation, useNavigationBuilder, useRoute } from '@react-navigation/native';
import fetchApi from '../../helpers/fetchApi';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserAction } from "../../store/actions/userActions"

import { COLORS } from '../../styles/COLORS';
// import {  useToast } from 'native-base';
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
          const [partenairetypes, setPartenairetype] = useState([])
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
          const { service } = route.params
          const user = useSelector(userSelector)

          const [data, handleChange, setValue] = useForm({
                    ServiceSelect: null,
                    typepartenaireselect: null,
                    organisation: "",
                    email: user.result.EMAIL,
                    telephone: "",
                    nif: "",
                    adresse: "",
          })

          console.log(data.typepartenaireselect)

          const isValid = useCallback(() => {
                    const basicValidation = selectedTypePartenaire !=null && data.email != "" && data.telephone != "" && logoImage != null
                    if(selectedTypePartenaire && selectedTypePartenaire?.ID_PARTENAIRE_TYPE == 2) {
                              return basicValidation && data.organisation != "" && data.adresse != "" && data.nif != ""
                    }
                    return basicValidation
          }, [data, logoImage, selectedTypePartenaire])
          const { checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                    email: {
                              required: true,
                              email: true
                    },
                    telephone: {
                              required: true,

                    },
          }, {
                    email: {
                              required: "L'email est obligatoire",
                              email: "Email invalide"
                    },
                    telephone: {
                              required: "Telephone est obligatoire"
                    },
          })
          const sendData = async () => {
                    try {
                              setLoading(true)
                              const form = new FormData()
                              form.append('ID_TYPE_PARTENAIRE', selectedTypePartenaire.ID_PARTENAIRE_TYPE)
                              form.append('NOM_ORGANISATION', data.organisation)
                              form.append('TELEPHONE', data.telephone)
                              form.append('NIF', data.nif)
                              form.append('EMAIL', data.email)
                              form.append('ADRESSE_COMPLETE', data.adresse)
                              // form.append('LONGITUDE', location.coords.longitude)
                              // form.append('LATITUDE', location.coords)
                              form.append('ID_SERVICE', selectedTypePartenaire.ID_PARTENAIRE_TYPE)

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
                        //       console.log(form)
                              const res = await fetchApi("/partenaire/Ajouter", {
                                        method: "POST",
                                        body: form
                              })
                              navigation.navigate('HomeScreen')
                              // navigation.navigate("EcommerceHomeScreen")
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
          //fetch partenaires types
          useEffect(() => {
                    (async () => {
                              try {
                                        const partenaire = await fetchApi('/partenaire/type', {
                                                  method: "GET",
                                                  headers: { "Content-Type": "application/json" },
                                        })
                                        setPartenairetype(partenaire.result)
                                        if(service.id_service == 2) {
                                                  setSelectedTypePartenaire(partenaire.result.find(s => s.ID_PARTENAIRE_TYPE == 2 ))
                                        }
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
                    if(photo.cancelled) {
                              return false
                    }
                    setLogoImage(photo)
          }
          const onBackgroundSelect = async () => {
                    const image = await ImagePicker.launchImageLibraryAsync({
                              mediaTypes: ImagePicker.MediaTypeOptions.Images,
                              allowsMultipleSelection: true
                    })
                    if(image.cancelled) {
                              return false
                    }
                    setBackgroundImage(image)
          }


          return (
                    <>
                              {loading && <Loading />}

                              <View style={styles.container}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                                            <View style={styles.menuOpenerLine} />
                                                            <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                            <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                                  </TouchableOpacity>
                                                  <View style={styles.imageContainer}>
                                                            <Image source={require('../../../assets/images/chapchap.png')} style={styles.logo} />
                                                  </View>
                                                  <View style={{ marginTop: 25 }}>
                                                            <Octicons name="bell" size={24} color={COLORS.primary} />
                                                  </View>
                                        </View>
                                        <Text style={styles.title}>{service.title}</Text>
                                        <ScrollView keyboardShouldPersistTaps="handled" style={{ marginBottom: 20 }}>
                                                  <View>
                                                            <View style={{ marginTop: 10 }}>
                                                                      <TouchableOpacity style={styles.modalCard}
                                                                                onPress={() => partenairetypesModalizeRef.current.open()}
                                                                                disabled={service.id_service == 2}
                                                                      >
                                                                                <View style={[ service.id_service == 2 && { opacity: 0.5} ]}>
                                                                                          <Text style={[styles.inputText, { fontSize: 13 }]}>
                                                                                                    Le type de partenaire
                                                                                          </Text>
                                                                                          {selectedTypePartenaire && <Text style={[styles.inputText, { color: '#000' }]}>
                                                                                                    {selectedTypePartenaire.DESCRIPTION}
                                                                                          </Text>}
                                                                                </View>
                                                                                <AntDesign name="caretdown" size={20} color="#777" />
                                                                      </TouchableOpacity>
                                                            </View>


                                                            {selectedTypePartenaire != null && selectedTypePartenaire.ID_PARTENAIRE_TYPE == 2 && <View style={styles.inputCard}>
                                                                      <OutlinedTextField
                                                                                label={service.id_service == 2 ? "Nom du restaurant" :"Nom de l'organisation"}
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
                                                            <View style={[styles.addImageContainer, { marginVertical: 30 }]}>
                                                                      <TouchableWithoutFeedback onPress={onLogoSelect}>
                                                                                <View style={[styles.addImageItem]}>
                                                                                          <View style={{ flexDirection: "row", alignItems: "center"}}>
                                                                                                    <Feather name="image" size={24} color="#777" />
                                                                                                    <Text style={styles.addImageLabel}>
                                                                                                              {service.id_service == 2 ? "Logo de votre restaurant": "Logo de votre boutique"}
                                                                                                    </Text>
                                                                                          </View>
                                                                                {logoImage &&  <Image source={{ uri: logoImage.uri }} style={{ width: "100%", height: 200, marginTop: 10, borderRadius: 5 }} />}
                                                                               </View>
                                                                      </TouchableWithoutFeedback>
                                                                      <TouchableWithoutFeedback onPress={onBackgroundSelect}>
                                                                                <View style={[styles.addImageItem, { marginTop: 10 }]}>
                                                                                          <View style={{ flexDirection: "row", alignItems: "center"}}>
                                                                                                    <Feather name="image" size={24} color="#777" />
                                                                                                    <Text style={styles.addImageLabel}>Image de fond</Text>
                                                                                          </View>
                                                                                {backgroundImage &&  <Image source={{ uri: backgroundImage.uri }} style={{ width: "100%", height: 200, marginTop: 10, borderRadius: 5 }} />}
                                                                               </View>
                                                                      </TouchableWithoutFeedback>
                                                            </View>

                                                            <TouchableOpacity onPress={sendData} disabled={!isValid()} >
                                                                      <View style={[styles.button, !isValid() && { opacity: 0.5 }]}>
                                                                                <Text style={styles.buttonText} >Envoyer</Text>
                                                                      </View>
                                                            </TouchableOpacity>
                                                  </View>
                                        </ScrollView>
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
                                                            {partenairetypes.map((partenairetype, index) => {
                                                                      return (
                                                                                <TouchableOpacity key={index} onPress={() => onTypePartenaireSelect(partenairetype)}>
                                                                                          <View style={styles.modalItem} >
                                                                                                    {selectedTypePartenaire?.ID_PARTENAIRE_TYPE == partenairetype.ID_PARTENAIRE_TYPE ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                                              <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                                                    <Text style={{ marginLeft: 10 }}>{partenairetype.DESCRIPTION}</Text>
                                                                                          </View>
                                                                                </TouchableOpacity>
                                                                      )
                                                            })}
                                                  </View>
                                        </>
                              </Modalize>

                    </>

          )

}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
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
          title: {
                    fontWeight: 'bold',
                    fontSize: 25,
                    fontWeight: "bold",
                    marginBottom: 12,
                    color: COLORS.ecommercePrimaryColor,
                    margin: 20
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
                    marginTop: 10,

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
                    paddingVertical: 15
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
                    borderColor: "#ddd"
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
          inputText: {
                    color: '#777'
          }
})
