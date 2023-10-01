import axios, { AxiosResponse } from "axios";
import api from "../services";
import { FairRequest, Fair, Locality } from "../ts/interfaces/fair-interfaces";
import { LoginRequest, LoginResponse, UpdateCustomerRequest } from "../ts/interfaces/user-interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../ts/interfaces/product-interfaces";

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
        email: data.email.trim(),
        customerPassword: data.password.trim(),
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

export async function findCustomerById(): Promise<AxiosResponse<Fair[], any>> {
    const idUser: number = Number(await AsyncStorage.getItem('@storage_Id'));

    return api.get<Fair[]>(`/fairs/${idUser}`, {
        headers: {
            'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
        }
    })
}

export async function searchFairs(searchQuery: string): Promise<AxiosResponse<Fair[], any>> {
    return await api.get<Fair[]>(`/fairs/search?parameter=${searchQuery}`)
}

export async function getCustomerById() {
    const idUser: number = Number(await AsyncStorage.getItem('@storage_Id'));
    
    return api.get(`/customers/${idUser}`);
}

export async function updateCustomer(data: UpdateCustomerRequest): Promise<void> {
    return api.patch('/customers', {
        email: data.email.trim(),
        name: data.name.trim(),
        whatsapp: data.whatsapp.trim(),
        password: data.password.trim(),
        customerNewPassword: data.newPassword.trim(),
    },
        {
            headers: {
                'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
            }
        })
}

export function findAllProducts(): Promise<AxiosResponse<Product[], any>> {
    return api.get<Product[]>("/products");
}