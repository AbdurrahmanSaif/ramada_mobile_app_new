import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';
import theme from './src/config/theme';
import RootStack from './src/containers/RootStack';
import colorPalette from './src/helpers/colorPalette';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
// import LoadingScreen from './src/components/Common/Loading';
// import SplashScreen from './src/components/Common/SplashScreen';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar backgroundColor={colorPalette.secondary} />
          <NavigationContainer
            theme={{
              colors: {
                background: 'white',
              },
            }}>
            <RootStack />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then(response => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};
