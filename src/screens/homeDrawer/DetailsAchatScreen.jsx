import React ,{useState}from "react"
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native"
import { Ionicons,AntDesign } from '@expo/vector-icons';
export default function DetailAchatScreen() {
    const [nombre, setNombre] = useState(0);
    const addNumber = async () => {

        if (nombre != '') 
        { 
            setNombre(nbr => parseInt(nbr) + 1)

        }
        else {
            setNombre(1) 

        }
    }
   
    const mouveNumber = async () => {

        if (nombre != '') 
        { 
            setNombre(nbr => parseInt(nbr) - 1)

        }
        else {
            setNombre(0) 

        }
    }
    return (
        <View style={{ marginLeft: 30,marginTop:50 , marginHorizontal:20}}>
            <Ionicons name="ios-arrow-back-outline" size={35} color="black" style={{ marginTop: 0 }} />
            <View style={{ width: '100%', marginTop: 10 }}>
                <Image source={require('../../../assets/images/pexels-pixabay-271624.jpg')} style={{ ...styles.imagePrincipal }} />
            </View>
            <View style={{ marginTop: 30 }} >
                <Text style={styles.text} numberOfLines={2}>Chemise jean  à  manches courtes</Text>
            </View>
            <View   >
                <Text style={styles.textFbu}>FBu 45.000</Text>
            </View>
            <View  >
                <Text style={styles.txtDisplay}>SSLR est connu par  la qualité,la simplicité et la délicatesse des vetements.</Text>
            </View>
            <View >
                <Text style={styles.txtDispla}>Vendu par:<Text style={{ color: '#F19152' }}>Arakaza Fashion Shop</Text></Text>
            </View>
            <View>
                <Text style={{ fontSize: 14, color: '#191970', opacity: 0.4 }}>Taille</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
                    <View style={styles.carre}>
                        <Text style={{ color: '#242F68', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>XS</Text>
                    </View>
                    <View style={styles.carre1}>
                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>S</Text>

                    </View>
                    <View style={styles.carre}>
                        <Text style={{ color: '#242F68', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>M</Text>
                    </View>
                    <View style={styles.carre}>
                        <Text style={{ color: '#242F68', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>L</Text>

                    </View>
                    <View style={styles.carre}>
                        <Text style={{ color: '#242F68', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>ML</Text>

                    </View>
                </View>
            </View>
            <View >
                <Text style={styles.txtDispla}>Nombres des pieces</Text>
            </View>
            <View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-around', }}>

                        <TouchableOpacity 
                        onPress={mouveNumber}
                        style={styles.carre1}>
                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>-</Text>

                        </TouchableOpacity>
                        <View style={styles.carre2}>
                            <TextInput
                                disabled={nombre == ''}

                                keyboardType="phone-pad"
                                defaultValue="0"
                                onChangeText={(nb) => setNombre(nb)}
                                value={nombre.toString()}
                                style={{ textAlign: 'center' }}></TextInput>

                        </View>

                        <TouchableOpacity onPress={addNumber} style={styles.carre1}>
                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>+</Text>

                        </TouchableOpacity>

                    </View>
                </View>
            <View>
                <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop:40}}>
                    
                    <View style={styles.carre}>
                    <AntDesign name="sharealt" size={20} color="black" />
                    </View>
                    <View style={styles.carre}>
                    <AntDesign name="shoppingcart" size={20} color="black" />

                    </View>
                    <View style={styles.carre3}>
                        <Text style={{textAlign:'center', color: 'white',}}>Ajouter au panier</Text>
                    </View>
                    
                   
                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    imagePrincipal:
    {
        width: '60%',
        height: 150,
        alignSelf: 'center',
        borderRadius: 10
    },
    text: {
        color: '#646B95',
        fontSize: 20
    },
    textFbu: {
        color: 'red',
        fontSize: 15
    },
    carre1: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#242F68',
        borderRadius: 10,
        // marginTop: 1,
    },
    carre2: {
        padding: 15,
        height: 50,
        width: 200,
        borderWidth:2,
        borderColor:'#D8D8D8',
        borderRadius: 10,
        // marginTop: 1,
    },
    carre3: {
        padding: 10,
        height: 50,
        width: 200,
        backgroundColor:'#EE7526',
        borderWidth:2,
        borderColor:'#D8D8D8',
        borderRadius: 10,
        // marginTop: 1,
    },
    carre: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 10,
        // marginTop: 1,
    },
    txtDisplay: {
        color: '#191970',
        fontSize: 15,
        fontWeight: 'bold',
        opacity: 0.4
    },
    txtDispla: {
        color: '#646B94',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 30

    },
})
