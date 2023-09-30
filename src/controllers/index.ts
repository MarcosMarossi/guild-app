import axios, { AxiosResponse } from "axios";
import api from "../services";
import { FairRequest, FairTO, Locality } from "../ts/interfaces/fair-interfaces";
import { LoginRequest as LoginRequest, LoginResponse as LoginResponse } from "../ts/interfaces/user-interfaces";

export function handleCustomer(fair: FairRequest): Promise<AxiosResponse<FairTO, any>> {
    return api.post<FairTO>('/customers', {
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

export async function handleFair(data: Locality) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address},${data.city},${data.uf}&key=AIzaSyCxtyT9bRUZ9K6JsBnT9c78HdngipWr5TI`);
    
    const completeAddress = response.data.results[0].formatted_address;
    const { lat, lng } = response.data.results[0].geometry.location;

    return api.post<FairTO>('/fairs', {
        siteName: data.siteName.trim(),
        description: data.description.trim(),
        address: completeAddress,
        latitude: lat,
        longitude: lng,
        city: data.city.trim(),
        uf: data.uf.trim(),
        dayWeek: data.dayWeek.trim(),
    })
}