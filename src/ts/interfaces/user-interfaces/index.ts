export interface CustomerTO {
    name: string,
    email: string,
    whatsapp: string,
    listProduct: string
}

export interface LoginResponseTO {
    token: string,
    type: string,
    id: number,
}