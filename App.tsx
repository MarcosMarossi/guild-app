import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/routes';
import { FarmerMarketProvider } from './src/store';

export default function App() {
  return (
    <>
      <FarmerMarketProvider>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </FarmerMarketProvider>
    </>
  );
}
