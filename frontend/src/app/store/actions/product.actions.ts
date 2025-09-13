import { createAction, props } from '@ngrx/store';
import { ProductRequest, ProductResponse } from 'src/app/models/product.model';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: ProductResponse[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);


export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: ProductRequest }>()
);
export const addProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{product: ProductResponse}>()
);
export const addProductFailure = createAction(
  '[Product] Add Product Failure',
  props<{ error: any }>()
);


export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: ProductRequest, id: number }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{product: ProductResponse}>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: any }>()
);


export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>()
);
export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: any }>()
);



export const initProductForm = createAction('[Product] Init Product Form', props<{ product: ProductRequest }>());