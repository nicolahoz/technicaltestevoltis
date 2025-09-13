import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CustomerActions from '../actions/customer.actions';
import { CustomerService } from 'src/app/pages/customer/customer.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class CustomerEffects {

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(() => this.customerService.getCustomers()
        .pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error })))
        )
      )
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      mergeMap(({ customer }) =>
        this.customerService.addCustomer(customer).pipe(
          map(customer => CustomerActions.addCustomerSuccess({customer})),
          catchError(error => of(CustomerActions.addCustomerFailure({ error })))
        )
      )
    )
  );

  addCustomerSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CustomerActions.addCustomerSuccess),
        tap(() => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente agregado' }))
      ),
      { dispatch: false }
    );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      mergeMap(({ customer, id }) =>
        this.customerService.updateCustomer(customer, id).pipe(
          map(customer => CustomerActions.updateCustomerSuccess({customer})),
          catchError(error => of(CustomerActions.updateCustomerFailure({ error })))
        )
      )
    )
  );

  updateCustomerSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CustomerActions.updateCustomerSuccess),
        tap(() => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado' }))
      ),
      { dispatch: false }
    );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      mergeMap(({ id }) =>
        this.customerService.deleteCustomer(id).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ id })),
          catchError(error => of(CustomerActions.deleteCustomerFailure({ error })))
        )
      )
    )
  );

  deleteCustomerSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CustomerActions.deleteCustomerSuccess),
        tap(() => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente eliminado' }))
      ),
      { dispatch: false }
    );

  constructor(private actions$: Actions, private customerService: CustomerService, private messageService: MessageService) {}
}
