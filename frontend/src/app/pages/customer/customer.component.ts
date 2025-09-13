import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Observable } from 'rxjs';
import { CustomerRequest, CustomerResponse } from 'src/app/models/customer.model';
import * as CustomerActions from '../../store/actions/customer.actions';
import { selectAllCustomers } from '../../store/selectors/customer.selectors';
import { CustomerDialogComponent } from 'src/app/components/customer-dialog/customer-dialog.component';
import { Actions, ofType } from '@ngrx/effects';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    providers: [DialogService]
})
export class CustomerComponent implements OnInit {
    customers$!: Observable<CustomerResponse[]>;

    constructor(private actions$: Actions, private messageService: MessageService, private store: Store, private dialogService: DialogService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.store.dispatch(CustomerActions.loadCustomers());
        this.customers$ = this.store.select(selectAllCustomers).pipe(
            map(Customers => Customers ?? [])
        );
    }

    openDialog(customer?: CustomerResponse) {
        this.store.dispatch(CustomerActions.initCustomerForm({ customer: customer || { name: '', email: '', phone: '', addresses: [] } }));

        const ref = this.dialogService.open(CustomerDialogComponent, {
            header: customer ? 'Editar cliente' : 'Crear cliente',
            width: 'auto',
        });

        ref.onClose.subscribe((result: CustomerRequest) => {
            if (result) {
                if (customer) {
                    this.store.dispatch(CustomerActions.updateCustomer({ customer: result, id: customer.id }));
                } else {
                    this.store.dispatch(CustomerActions.addCustomer({ customer: result }));
                }
            }
        });
    }

    deleteCustomer(id: number, event: Event) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: '¿Desea borrar este registro?',
            icon: 'pi pi-info-circle',            
            rejectLabel: 'Cancelar',
            acceptLabel: 'Borrar',
            rejectButtonStyleClass: 'p-button-secondary',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.store.dispatch(CustomerActions.deleteCustomer({ id }));
            },
            reject: () => {

            }
        });

    }
}
