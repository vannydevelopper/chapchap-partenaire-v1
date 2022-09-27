
import 'react-native-gesture-handler';
import AppContainer from './src/AppContainer';
import { Provider } from 'react-redux';
import { store } from './src/store'
import { Host } from 'react-native-portalize';


export default function App() {
          return (
                    <Provider store={store}>
                              <Host>
                                        <AppContainer />
                              </Host>
                    </Provider>
          )
}
