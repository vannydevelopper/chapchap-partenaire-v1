
import 'react-native-gesture-handler';
import AppContainer from './src/AppContainer';
import { Provider } from 'react-redux';
import { store } from './src/store'
import { Host } from 'react-native-portalize';
import InscriptionPartenaireScreen from './src/screens/welcome/InscriptionPartenaireScreen';
import HomeScreen from './src/screens/welcome/HomeScreen';
import CommandeEmiseScreen from './src/screens/e-commerce/CommandeEmiseScreen';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(["flexWrap: `wrap``"]);
export default function App() {
          return (
                    <Provider store={store}>
                              <Host>
                                        <AppContainer />
                                        {/* <InscriptionPartenaireScreen/> */}
                                        {/* <HomeScreen/> */}
                                        {/* <CommandeEmiseScreen/> */}
                              </Host>
                    </Provider>
          )
}
