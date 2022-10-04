
import 'react-native-gesture-handler';
import AppContainer from './src/AppContainer';
import { Provider } from 'react-redux';
import { store } from './src/store'
import { Host } from 'react-native-portalize';
import InscriptionPartenaireScreen from './src/screens/welcome/InscriptionPartenaireScreen';
import HomeScreen from './src/screens/welcome/HomeScreen';


export default function App() {
          return (
                    <Provider store={store}>
                              <Host>
                                        <AppContainer />
                                        {/* <InscriptionPartenaireScreen/> */}
                                        {/* <HomeScreen/> */}
                              </Host>
                    </Provider>
          )
}
