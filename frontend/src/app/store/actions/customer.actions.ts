import { createAction, props } from '@ngrx/store';
import { AddressRequest } from 'src/app/models/address.model';
import { CustomerRequest, CustomerResponse } from 'src/app/models/customer.model';

export const loadCustomers = createAction('[Customer] Load Customers');
export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ customers: CustomerResponse[] }>()
);
export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: any }>()
);


export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{ customer: CustomerRequest }>()
);
export const addCustomerSuccess = createAction(
  '[Customer] Add Customer Success',
  props<{ customer: CustomerResponse }>()
);
export const addCustomerFailure = createAction(
  '[Customer] Add Customer Failure',
  props<{ error: any }>()
);


export const updateCustomer = createAction(
  '[Customer] Update Customer',
  props<{ customer: CustomerRequest, id: number }>()
);
export const updateCustomerSuccess = createAction(
  '[Customer] Update Customer Success',
  props<{ customer: CustomerResponse }>()
);
export const updateCustomerFailure = createAction(
  '[Customer] Update Customer Failure',
  props<{ error: any }>()
);


export const deleteCustomer = createAction(
  '[Customer] Delete Customer',
  props<{ id: number }>()
);
export const deleteCustomerSuccess = createAction(
  '[Customer] Delete Customer Success',
  props<{ id: number }>()
);
export const deleteCustomerFailure = createAction(
  '[Customer] Delete Customer Failure',
  props<{ error: any }>()
);


export const addCustomerAddress = createAction(
  '[Customer] Add Customer Address',
  props<{ value?: AddressRequest }>()
);
export const removeCustomerAddress = createAction(
  '[Customer] Remove Customer Address',
  props<{ index: number }>()
);



export const initCustomerForm = createAction('[Customer] Init Customer Form', props<{ customer: CustomerRequest }>());