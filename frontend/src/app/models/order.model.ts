import { CustomerResponse } from "./customer.model"
import { OrderItemRequest, OrderItemResponse } from "./order-item.model"

export interface OrderRequest {
    customerId: number
    items: OrderItemRequest[]
}

export interface OrderResponse extends OrderRequest {
    id: number
    orderDate: Date
    items: OrderItemResponse[]
    customer: CustomerResponse
    total: number
}