import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrderActions from '../actions/order.actions';
import { OrderService } from 'src/app/pages/order/order.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class OrderEffects {

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      mergeMap(() => this.OrderService.getOrders()
        .pipe(
          map(orders => OrderActions.loadOrdersSuccess({ orders })),
          catchError(error => of(OrderActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.addOrder),
      mergeMap(({order }) =>
        this.OrderService.addOrder(order).pipe(
          map(order => OrderActions.addOrderSuccess({order})),
          catchError(error => of(OrderActions.addOrderFailure({ error })))
        )
      )
    )
  );

  addOrderSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.addOrderSuccess),
        tap(() => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Orden agregada' }))
      ),
      { dispatch: false }
    );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      mergeMap(({ order, id }) =>
        this.OrderService.updateOrder(order, id).pipe(
          map(order => OrderActions.updateOrderSuccess({order})),
          catchError(error => of(OrderActions.updateOrderFailure({ error })))
        )
      )
    )
  );

  updateOrderSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.updateOrderSuccess),
        tap(() => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Orden actualizada' }))
      ),
      { dispatch: false }
    );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.deleteOrder),
      mergeMap(({ id }) =>
        this.OrderService.deleteOrder(id).pipe(
          map(() => OrderActions.deleteOrderSuccess({ id })),
          catchError(error => of(OrderActions.deleteOrderFailure({ error })))
        )
      )
    )
  );

  deleteOrderSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.deleteOrderSuccess),
        tap(() => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Orden eliminada' }))
      ),
      { dispatch: false }
    );

  constructor(private actions$: Actions, private OrderService: OrderService, private messageService: MessageService) {}
}
