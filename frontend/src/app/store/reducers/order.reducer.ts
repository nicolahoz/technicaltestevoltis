import { createReducer, on, Action } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';
import {
  addArrayControl,
  createFormGroupState,
  formArrayReducer,
  FormArrayState,
  formGroupReducer,
  FormGroupState,
  removeArrayControl,
  setValue,
  updateGroup,
  validate
} from 'ngrx-forms';
import { required, pattern, greaterThan, number } from 'ngrx-forms/validation';
import { OrderRequest, OrderResponse } from 'src/app/models/order.model';
import { AddressRequest } from 'src/app/models/address.model';
import { OrderItemRequest } from 'src/app/models/order-item.model';

export interface OrderFormValue extends OrderRequest { }
export interface OrderState {
  orders: OrderResponse[];
  formState: FormGroupState<OrderFormValue>;
}

export const FORM_ID = 'orderForm';

export const initialState: OrderState = {
  orders: [],
  formState: createFormGroupState<OrderFormValue>(FORM_ID, {
    customerId: 0,
    items: [] as OrderItemRequest[]
  }),
};

const _OrderReducer = createReducer(
  initialState,

  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
  })),

  on(OrderActions.addOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order]
  })),

  on(OrderActions.updateOrderSuccess, (state, { order }) => ({
    ...state,
    orders: state.orders.map(p => (p.id === order.id ? order : p)),
  })),

  on(OrderActions.deleteOrderSuccess, (state, { id }) => ({
    ...state,
    orders: state.orders.filter(p => p.id !== id),
  })),

  on(OrderActions.addOrderItem, (state) => ({
    ...state,
    formState: updateGroup<OrderFormValue>(state.formState, {
      items: addArrayControl({ productId: 0, quantity: 1, subtotal: 0 })
    }),
  })),

  on(OrderActions.removeOrderItem, (state, { index }) => ({
    ...state,
    formState: updateGroup<OrderFormValue>(state.formState, {
      items: removeArrayControl(index)
    }),
  })),

  on(OrderActions.initOrderForm, (state, { order }) => ({
    ...state,
    formState: createFormGroupState<OrderFormValue>(FORM_ID, order),
  })),

  on(OrderActions.updateOrderItem, (state, { index, productId, quantity, subtotal }) => {
    const items = state.formState.controls.items;
    const updatedControls = items.controls.map((c, i) =>
      i === index
        ? updateGroup<OrderItemRequest>(c, {
          productId: setValue(productId),
          quantity: setValue(quantity),
          subtotal: setValue(subtotal)
        })
        : c
    );

    const updatedItems: FormArrayState<OrderItemRequest> = {
      ...items,
      controls: updatedControls
    };

    return {
      ...state,
      formState: updateGroup<OrderFormValue>(state.formState, {
        items: () => updatedItems
      })
    };
  })
);

export function OrderReducer(state: OrderState | undefined, action: Action) {
  const intermediate = _OrderReducer(state, action);

  let formState = formGroupReducer(intermediate.formState, action);

  formState = updateGroup<OrderFormValue>(formState, {
    customerId: validate(required)
  });


  formState = {
    ...formState,
    controls: {
      ...formState.controls,
      items: formArrayReducer(formState.controls.items, action),
    },
  };

  return {
    ...intermediate,
    formState,
  };
}


