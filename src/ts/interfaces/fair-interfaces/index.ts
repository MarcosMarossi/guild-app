import { CustomerTO } from "../user-interfaces";

export interface FairTO {
    siteName: string;
    description: string;
    address: string;
    city: string;
    uf: string;
    dayWeek: string;
    latitude: number;
    longitude: number;
    id?: number;
}

export interface DetailTO {
    siteName: string;
    description: string;
    address: string;
    city: string;
    uf: string;
    dayWeek: string;
    latitude: number;
    longitude: number;
    id?: number;
    customers: CustomerTO[];
}