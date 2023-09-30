import axios, { AxiosResponse } from "axios";
import api from "../services";
import { FairRequest, Fair, Locality } from "../ts/interfaces/fair-interfaces";
import { LoginRequest, LoginResponse } from "../ts/interfaces/user-interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function handleCustomer(fair: FairRequest): Promise<AxiosResponse<Fair, any>> {
    return api.post<Fair>('/customers', {
        name: fair.name.trim(),
        email: fair.email.trim(),
        whatsapp: fair.whatsapp,
        customerPassword: fair.password.trim(),
        idsProduct: fair.idsProduct,
        idsFair: fair.idsFair
    });
}

export function authentication(data: LoginRequest): Promise<AxiosResponse<LoginResponse, any>> {
    return api.post<LoginResponse>('/auth', {
        email: data.email,
        customerPassword: data.password,
    });
}

export async function handleFair(data: Locality): Promise<AxiosResponse<Fair, any>> {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address},${data.city},${data.uf}&key=AIzaSyCxtyT9bRUZ9K6JsBnT9c78HdngipWr5TI`);
    const completeAddress = response.data.results[0].formatted_address;
    const { lat, lng } = response.data.results[0].geometry.location;

    return api.post<Fair>('/fairs', {
        siteName: data.siteName.trim(),
        description: data.description.trim(),
        address: completeAddress,
        latitude: lat,
        longitude: lng,
        city: data.city.trim(),
        uf: data.uf.trim(),
        dayWeek: data.dayWeek.trim(),
    });
}

export function getFairById(param: string): Promise<AxiosResponse<Fair, any>> {
    return api.get<Fair>(`fairs/${param}`);
}

export function findAllFairs(): Promise<AxiosResponse<Fair[], any>> {
    return api.get<Fair[]>('/fairs');
}

export async function associate(selectedItems: string[]) {
    return api.post('/customers/newfair', 
    {
        customerId: Number(await AsyncStorage.getItem('@storage_Id')),
        idsFair: selectedItems.map(value => ({
            idFair: value,
        }))
    },
    {
        headers: {
            'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
        }
    });
}
