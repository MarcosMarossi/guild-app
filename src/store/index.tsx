import React, { createContext, useContext, useState } from 'react';

interface IProps {
  fair: Fair;
  setFair: Function;
}

interface Fair {
  name: string;
  email: string;
  password: string;
  whatsapp: number;
  idsProduct: {
    idProduct: string;
  } [];
}

const FarmerMarketContext = createContext({} as IProps);

export function FarmerMarketProvider({ children }: any) {
  const [fair, setFair] = useState<Fair>({} as Fair);

  return (
    <FarmerMarketContext.Provider value={{ fair, setFair }}>
      {children}
    </FarmerMarketContext.Provider>
  );
}

export function useFarmerContext() {
  return useContext(FarmerMarketContext);
}