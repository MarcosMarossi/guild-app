import axios, { AxiosResponse } from "axios";
import api from "../services";
import { FairRequest, Fair, Locality } from "../ts/interfaces/fair-interfaces";
import { CodeRequest, CodeResponse, LoginRequest, LoginResponse, RecoveryRequest, UpdateCustomerRequest } from "../ts/interfaces/user-interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../ts/interfaces/product-interfaces";
import { AssessmentRequest, AssessmentResponse } from "../ts/interfaces/assessments-interfaces";
import { ComplaintRequest } from "../ts/interfaces/complaint-interfaces";
import { GUILD_API_KEY, FEEDBACK_API_KEY, GOOGLE_KEY } from '@env';


export function handleCustomer(fair: FairRequest): Promise<AxiosResponse<Fair, any>> {
    return api.post<Fair>('/guild/customers', {
        name: fair.name.trim(),
        email: fair.email.trim(),
        whatsapp: fair.whatsapp,
        customerPassword: fair.password.trim(),
        idsProduct: fair.idsProduct,
        idsFair: fair.idsFair
    },
        {
            headers: {
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export function authentication(data: LoginRequest): Promise<AxiosResponse<LoginResponse, any>> {
    return api.post<LoginResponse>('/guild/auth', {
        email: data.email.trim(),
        customerPassword: data.password.trim(),
    },
        {
            headers: {
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export async function handleFair(data: Locality): Promise<AxiosResponse<Fair, any>> {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address},${data.city},${data.uf}&key=${GOOGLE_KEY}`);
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
    },
        {
            headers: {
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export function getFairById(param: string): Promise<AxiosResponse<Fair, any>> {
    return api.get<Fair>(`/guild/fairs/${param}`,
        {
            headers: {
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export function findAllFairs(): Promise<AxiosResponse<Fair[], any>> {
    return api.get<Fair[]>('/guild/fairs',
        {
            headers: {
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export async function fairAssociation(fairsItems: string[]): Promise<AxiosResponse<any, any>> {
    return api.post('/guild/customers/new-association',
        {
            customerId: Number(await AsyncStorage.getItem('@storage_Id')),
            idsFair: fairsItems.map(value => Number(value)),
        },
        {
            headers: {
                'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export async function productAssociation(productItems: string[]): Promise<AxiosResponse<any, any>> {
    return api.post('/guild/customers/new-association',
        {
            customerId: Number(await AsyncStorage.getItem('@storage_Id')),
            idsProduct: productItems.map(value => Number(value)),
        },
        {
            headers: {
                'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export async function searchFairs(searchQuery: string): Promise<AxiosResponse<Fair[], any>> {
    return await api.get<Fair[]>(`/guild/fairs/search?parameter=${searchQuery}`,
        {
            headers: {
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export async function getCustomerById() {
    const idUser: number = Number(await AsyncStorage.getItem('@storage_Id'));

    return api.get(`/guild/customers/${idUser}`, {
        headers: {
            'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
            'API_KEY': `${GUILD_API_KEY}`
        }
    });
}

export async function updateCustomer(data: UpdateCustomerRequest): Promise<void> {
    const idUser: number = Number(await AsyncStorage.getItem('@storage_Id'));

    return api.patch('/guild/customers', {
        id: idUser,
        email: data.email.trim(),
        name: data.name.trim(),
        whatsapp: data.whatsapp.trim(),
        password: data.password.trim(),
        customerNewPassword: data.newPassword.trim(),
    },
        {
            headers: {
                'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export function findAllProducts(): Promise<AxiosResponse<Product[], any>> {
    return api.get<Product[]>("/guild/products",
        {
            headers: {
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export function sendCustomerCode(data: CodeRequest): Promise<AxiosResponse<CodeResponse, any>> {
    return api.put<CodeResponse>("/guild/customers/send-code", data,
        {
            headers: {
                'API_KEY': GUILD_API_KEY
            }
        });
}

export function updateCustomerPassword(data: RecoveryRequest): Promise<void> {
    return api.put("/guild/customers", data,
        {
            headers: {
                'API_KEY': `${GUILD_API_KEY}`
            }
        });
}

export function handleAssessement(data: AssessmentRequest): Promise<void> {
    return api.post("/feedback/assessments", data,
        {
            headers: {
                'FEEDBACK_API_KEY': `${FEEDBACK_API_KEY}`,
            }
        });
}

export function findAssessmentByFairId(fairId: number): Promise<AxiosResponse<AssessmentResponse[], any>> {
    return api.get<AssessmentResponse[]>(`/feedback/assessments?idFair=${fairId}`,
        {
            headers: {
                'FEEDBACK_API_KEY': `${FEEDBACK_API_KEY}`,
            }
        });
}

export function handleComplaint(data: ComplaintRequest): Promise<void> {
    return api.post("/feedback/complaints", data,
        {
            headers: {
                'FEEDBACK_API_KEY': `${FEEDBACK_API_KEY}`,
            }
        });
}