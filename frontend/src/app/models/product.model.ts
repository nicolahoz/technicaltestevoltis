export interface ProductRequest {
    name: string
    price: number
}

export interface ProductResponse extends ProductRequest {
    id: number
}