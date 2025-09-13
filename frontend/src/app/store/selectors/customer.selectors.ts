import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from '../reducers/customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

export const selectAllCustomers = createSelector(
  selectCustomerState,
  (state) => state.customers
);

export const selectCustomerForm = createSelector(
  selectCustomerState,
  (state) => state.formState
);
