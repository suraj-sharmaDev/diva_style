import React, { Component } from 'react';
import { Container } from 'native-base';
import CodePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import {configureStore, persistor} from './store/store';
import AuthNavigator from "./navigation/AuthNavigator";
import GeneralStatusBar from "./components/GeneralStatusBar";
import Colors from './constants/Colors';

class App extends Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return(
      <Container>
        <GeneralStatusBar backgroundColor={Colors.greenColor} translucent={true} barStyle="light-content"/>
        <Provider store = { configureStore }>
          <PersistGate loading={null} persistor={persistor}>
            <AuthNavigator />
          </PersistGate>        
        </Provider>
      </Container>
    );
  }
}

let updateOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

App = CodePush(updateOptions)(App);

export default App;