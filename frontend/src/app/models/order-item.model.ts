import { ProductResponse } from "./product.model"

export interface OrderItemRequest {
    productId: number
    quantity: number
    subtotal: number
}

export interface OrderItemResponse extends OrderItemRequest {
    id: number
    product: ProductResponse
}