import { AddressRequest, AddressResponse } from "./address.model"
import { OrderResponse } from "./order.model"

export interface CustomerRequest {
    name: string
    email: string
    phone: string
    addresses: AddressRequest[]   
}

export interface CustomerResponse extends CustomerRequest {
    id: number
    addresses: AddressResponse[]
    orders: OrderResponse[]
}