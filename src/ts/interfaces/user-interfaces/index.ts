export interface Customer {
    name: string,
    email: string,
    whatsapp: string,
    listProduct: string
}

export interface UpdateCustomerRequest {
    email: string,
    name: string,
    whatsapp: string,
    password: string,
    newPassword: string,
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface LoginResponse {
    token: string,
    type: string,
    id: number,
}

export interface RecoveryRequest {
    password: string,
    code: number,
    whatsapp: string,
}

export interface CodeRequest {
    recipient: string,
    sender: string,
    accountSID: string,
    authToken: string,
}

export interface CodeResponse {
    sid: string,
    time: string
}