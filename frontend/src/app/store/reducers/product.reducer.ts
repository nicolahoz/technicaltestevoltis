import { createReducer, on, Action } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { createFormGroupState, formGroupReducer, FormGroupState, updateGroup, validate } from 'ngrx-forms';
import { ProductRequest, ProductResponse } from 'src/app/models/product.model';
import { pattern, required } from 'ngrx-forms/validation';

export interface ProductFormValue extends ProductRequest { }
export interface ProductState {
  products: ProductResponse[];
  formState: FormGroupState<ProductFormValue>;
}

export const FORM_ID = 'productForm';

export const initialState: ProductState = {
  products: [],
  formState: createFormGroupState<ProductFormValue>(FORM_ID, {
    name: '',
    price: 0,
  }),
};

const _productReducer = createReducer(
  initialState,

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),

  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),

  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map(p => (p.id === product.id ? product : p)),
  })),

  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.id !== id),
  })),

  on(ProductActions.initProductForm, (state, { product }) => ({
    ...state,
    formState: createFormGroupState<ProductFormValue>(FORM_ID, product),
  })),
);

export function productReducer(state: ProductState | undefined, action: Action) {
  const intermediate = _productReducer(state, action);
  let formState = formGroupReducer(intermediate.formState, action);

  formState = updateGroup<ProductFormValue>(formState, {
      name: validate(required)
    });
  return {
    ...intermediate,
    formState,
  };
}
