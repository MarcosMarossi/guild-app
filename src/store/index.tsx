import React, { createContext, useContext, useState } from 'react';
import { FairRequest, Locality } from '../ts/interfaces/fair-interfaces';

interface IProps {
  fair: FairRequest;
  setFair: React.Dispatch<React.SetStateAction<FairRequest>>;
  locality: Locality;
  setLocality: React.Dispatch<React.SetStateAction<Locality>>;
}

const FarmerMarketContext = createContext({} as IProps);

export function FarmerMarketProvider({ children }: any) {
  const [fair, setFair] = useState<FairRequest>({} as FairRequest);
  const [locality, setLocality] = useState<Locality>({} as Locality);

  return (
    <FarmerMarketContext.Provider value={{ fair, setFair, locality, setLocality }}>
      {children}
    </FarmerMarketContext.Provider>
  );
}

export function useFarmerContext() {
  return useContext(FarmerMarketContext);
}