import { createAction, props } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { AddressRequest } from 'src/app/models/address.model';
import { OrderItemRequest } from 'src/app/models/order-item.model';
import { OrderRequest, OrderResponse } from 'src/app/models/order.model';
import { OrderFormValue } from '../reducers/order.reducer';

export const loadOrders = createAction('[Order] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: OrderResponse[] }>()
);
export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: any }>()
);


export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: OrderRequest }>()
);
export const addOrderSuccess = createAction(
  '[Order] Add Order Success',
  props<{ order: OrderResponse }>()
);
export const addOrderFailure = createAction(
  '[Order] Add Order Failure',
  props<{ error: any }>()
);


export const updateOrder = createAction(
  '[Order] Update Order',
  props<{ order: OrderRequest, id: number }>()
);
export const updateOrderSuccess = createAction(
  '[Order] Update Order Success',
  props<{ order: OrderResponse }>()
);
export const updateOrderFailure = createAction(
  '[Order] Update Order Failure',
  props<{ error: any }>()
);


export const deleteOrder = createAction(
  '[Order] Delete Order',
  props<{ id: number }>()
);
export const deleteOrderSuccess = createAction(
  '[Order] Delete Order Success',
  props<{ id: number }>()
);
export const deleteOrderFailure = createAction(
  '[Order] Delete Order Failure',
  props<{ error: any }>()
);


export const addOrderItem = createAction(
  '[Order] Add Order Item',
  props<{ value?: OrderItemRequest }>()
);
export const removeOrderItem = createAction(
  '[Order] Remove Order Item',
  props<{ index: number }>()
);

export const updateOrderItem = createAction(
  '[Order] Update Order Item',
  props<{ index: number; productId: number; quantity: number; subtotal: number }>()
);



export const initOrderForm = createAction('[Order] Init Order Form', props<{ order: OrderRequest }>());