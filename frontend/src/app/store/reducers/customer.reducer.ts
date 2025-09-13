import { createReducer, on, Action } from '@ngrx/store';
import * as customerActions from '../actions/customer.actions';
import {
  addArrayControl,
  createFormGroupState,
  formArrayReducer,
  formGroupReducer,
  FormGroupState,
  removeArrayControl,
  updateGroup,
  validate
} from 'ngrx-forms';
import { required, pattern } from 'ngrx-forms/validation';
import { CustomerRequest, CustomerResponse } from 'src/app/models/customer.model';
import { AddressRequest } from 'src/app/models/address.model';

export interface CustomerFormValue extends CustomerRequest {}
export interface CustomerState {
  customers: CustomerResponse[];
  formState: FormGroupState<CustomerFormValue>;
}

export const FORM_ID = 'customerForm';

export const initialState: CustomerState = {
  customers: [],
  formState: createFormGroupState<CustomerFormValue>(FORM_ID, {
    name: '',
    email: '',
    phone: '',
    addresses: [] as AddressRequest[]
  }),
};

const _customerReducer = createReducer(
  initialState,

  on(customerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
  })),

  on(customerActions.addCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers, customer]
  })),

  on(customerActions.updateCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: state.customers.map(p => (p.id === customer.id ? customer : p)),
  })),

  on(customerActions.deleteCustomerSuccess, (state, { id }) => ({
    ...state,
    customers: state.customers.filter(p => p.id !== id),
  })),

  on(customerActions.addCustomerAddress, (state) => ({
    ...state,
    formState: updateGroup<CustomerFormValue>(state.formState, {
      addresses: addArrayControl({ street: '', city: '', zipCode: '' })
    }),
  })),

  on(customerActions.removeCustomerAddress, (state, { index }) => ({
    ...state,
    formState: updateGroup<CustomerFormValue>(state.formState, {
      addresses: removeArrayControl(index)
    }),
  })),

  on(customerActions.initCustomerForm, (state, { customer }) => ({
    ...state,
    formState: createFormGroupState<CustomerFormValue>(FORM_ID, customer),
  })),
);

export function customerReducer(state: CustomerState | undefined, action: Action) {
  const intermediate = _customerReducer(state, action);

  let formState = formGroupReducer(intermediate.formState, action);

  formState = updateGroup<CustomerFormValue>(formState, {
    name: validate(required),
    email: validate(pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), required),
    phone: validate(pattern(/^[0-9]+$/), required),
  });

  formState = {
    ...formState,
    controls: {
      ...formState.controls,
      addresses: formArrayReducer(formState.controls.addresses, action),
    },
  };

  return {
    ...intermediate,
    formState,
  };
}
