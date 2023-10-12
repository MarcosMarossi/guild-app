import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/routes';
import { FarmerMarketProvider } from './src/store';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <FarmerMarketProvider>
        <PaperProvider>
          <StatusBar barStyle={"dark-content"} backgroundColor="transparent" translucent />
          <Routes />
        </PaperProvider>
      </FarmerMarketProvider>
    </>
  );
}
