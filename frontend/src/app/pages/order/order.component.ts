import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Observable } from 'rxjs';
import { OrderRequest, OrderResponse } from 'src/app/models/order.model';
import * as OrderActions from '../../store/actions/order.actions';
import { selectAllOrders } from '../../store/selectors/order.selectors';
import { OrderDialogComponent } from 'src/app/components/order-dialog/order-dialog.component';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
    orders$!: Observable<OrderResponse[]>;

    constructor(private store: Store, private dialogService: DialogService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.store.dispatch(OrderActions.loadOrders());
        this.orders$ = this.store.select(selectAllOrders).pipe(
            map(Orders => Orders ?? [])
        );
    }

    openDialog(order?: OrderResponse) {
        this.store.dispatch(OrderActions.initOrderForm({ order: order || { customerId: 0, items: [] } }));

        const ref = this.dialogService.open(OrderDialogComponent, {
            header: order ? 'Editar cliente' : 'Crear cliente',
            style: {'min-width': '60vw', 'min-height': '60vh'}
        });

        ref.onClose.subscribe((result: OrderRequest) => {
            if (result) {
                if (order) {
                    this.store.dispatch(OrderActions.updateOrder({ order: result, id: order.id }));
                } else {
                    this.store.dispatch(OrderActions.addOrder({ order: result }));
                }
            }
        });
    }

    deleteOrder(id: number, event: Event) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: '¿Desea borrar este registro?',
            icon: 'pi pi-info-circle',            
            rejectLabel: 'Cancelar',
            acceptLabel: 'Borrar',
            rejectButtonStyleClass: 'p-button-secondary',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.store.dispatch(OrderActions.deleteOrder({ id }));
            },
            reject: () => {

            }
        });

    }
}
