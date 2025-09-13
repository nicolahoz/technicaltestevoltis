export interface AddressRequest {
    street: string
    city: string
    zipCode: string
}

export interface AddressResponse extends AddressRequest {
    id: number
}