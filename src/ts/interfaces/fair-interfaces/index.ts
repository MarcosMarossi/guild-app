import { CustomerTO } from "../user-interfaces";

export interface Fair {
  siteName: string;
  description: string;
  address: string;
  city: string;
  uf: string;
  dayWeek: string;
  latitude: number;
  longitude: number;
  id?: number;
  customers?: CustomerTO[];
}

export interface FairRequest {
  name: string;
  email: string;
  password: string;
  whatsapp: number;
  idsProduct: {
    idProduct: string;
  }[];
  idsFair: {
    idFair: string;
  }[];
}

export interface Locality {
  siteName: string;
  description: string;
  address: string;
  city: string;
  uf: string;
  dayWeek: string;
}