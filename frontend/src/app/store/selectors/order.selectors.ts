import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../reducers/order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectAllOrders = createSelector(
  selectOrderState,
  (state) => state.orders
);

export const selectOrderForm = createSelector(
  selectOrderState,
  (state) => state.formState
);
