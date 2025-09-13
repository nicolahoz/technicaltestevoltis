import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormArrayState, FormGroupState, setValue, updateArray, updateGroup } from 'ngrx-forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, take } from 'rxjs';
import { OrderRequest } from 'src/app/models/order.model';
import { selectOrderForm } from 'src/app/store/selectors/order.selectors';
import * as OrderActions from '../../store/actions/order.actions';
import { CustomerResponse } from 'src/app/models/customer.model';
import { selectAllCustomers } from 'src/app/store/selectors/customer.selectors';
import { CustomerService } from 'src/app/pages/customer/customer.service';
import { ProductService } from 'src/app/pages/product/product.service';
import { ProductResponse } from 'src/app/models/product.model';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { OrderItemRequest } from 'src/app/models/order-item.model';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html'
})
export class OrderDialogComponent implements OnInit, AfterViewInit {
  formState$!: Observable<FormGroupState<OrderRequest>>;

  customers: CustomerResponse[] = []
  products: ProductResponse[] = []

  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(private store: Store, public ref: DynamicDialogRef, private customerService: CustomerService, private productService: ProductService) { }

  ngOnInit() {
    this.formState$ = this.store.select(selectOrderForm);
    this.customerService.getCustomers().subscribe(res => {
      this.customers = res
    })

    this.productService.getProducts().subscribe(res => {
      this.products = res
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nameInput?.nativeElement?.focus();
    }, 100);
  }

  trackById(index: number, item: any) {
    return item && item.id ? item.id : index;
  }

  addItem() {
    this.store.dispatch(OrderActions.addOrderItem({ value: { productId: 0, quantity: 1, subtotal: 0 } }));
  }

  removeItem(index: number) {
    this.store.dispatch(OrderActions.removeOrderItem({ index }));
  }

  save(formValue: OrderRequest) {
    const mappedReq: OrderRequest = {
      ...formValue,
      items: formValue.items.map(i => {
        const p = this.products.find(p => p.id == i.productId);
        return {
          ...i,
          subtotal: p ? Number(p.price) * Number(i.quantity) : 0
        };
      })
    };

    this.ref.close(mappedReq);
  }

  cancel() {
    this.ref.close();
  }

  updateSubtotal(productId: number, quantity: any, index: number) {
    setTimeout(() => {
      const product = this.products.find(p => p.id === productId);
      if (!product) return;
      const subtotal = Number(product.price) * Number(quantity);

      this.store.dispatch(OrderActions.updateOrderItem({
        index,
        productId,
        quantity,
        subtotal
      }));
    });
  }
}
