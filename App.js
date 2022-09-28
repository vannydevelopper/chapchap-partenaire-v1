
import 'react-native-gesture-handler';
import AppContainer from './src/AppContainer';
import { Provider } from 'react-redux';
import { store } from './src/store'
import { Host } from 'react-native-portalize';
import InscriptionPartenaireScreen from './src/screens/welcome/InscriptionPartenaireScreen';


export default function App() {
          return (
                    <Provider store={store}>
                              <Host>
                                        {/* <AppContainer /> */}
                                        <InscriptionPartenaireScreen/>
                              </Host>
                    </Provider>
          )
}
