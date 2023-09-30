export interface CustomerTO {
    name: string,
    email: string,
    whatsapp: string,
    listProduct: string
}

export interface LoginRequest {
    email: string,
    password: string;
}

export interface LoginResponse {
    token: string,
    type: string,
    id: number,
}