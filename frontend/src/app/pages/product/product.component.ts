import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllProducts } from '../../store/selectors/product.selectors';
import * as ProductActions from '../../store/actions/product.actions';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductRequest, ProductResponse } from 'src/app/models/product.model';
import { Actions, ofType } from '@ngrx/effects';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    providers: [DialogService]
})
export class ProductComponent implements OnInit {
    products$!: Observable<ProductResponse[]>;

    constructor(private actions$: Actions, private messageService: MessageService, private store: Store, private dialogService: DialogService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.store.dispatch(ProductActions.loadProducts());
        this.products$ = this.store.select(selectAllProducts).pipe(
            map(products => products ?? [])
        );
    }

    openDialog(product?: ProductResponse) {
        this.store.dispatch(ProductActions.initProductForm({ product: product || { id: Date.now(), name: '', price: 0 } }));

        const ref = this.dialogService.open(ProductDialogComponent, {
            header: product ? 'Editar Producto' : 'Crear Producto',
            width: '40vw'
        });

        ref.onClose.subscribe((result: ProductRequest) => {
            if (result) {
                if (product) {
                    this.store.dispatch(ProductActions.updateProduct({ product: result, id: product.id }));
                } else {
                    this.store.dispatch(ProductActions.addProduct({ product: result }));
                }
            }
        });
    }

    deleteProduct(id: number, event: Event) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: '¿Desea borrar este registro?',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancelar',
            acceptLabel: 'Borrar',
            rejectButtonStyleClass: 'p-button-secondary',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.store.dispatch(ProductActions.deleteProduct({ id }));
            },
            reject: () => {

            }
        });

    }
}
