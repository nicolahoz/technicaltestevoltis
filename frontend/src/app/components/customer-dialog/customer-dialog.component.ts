import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { CustomerRequest } from 'src/app/models/customer.model';
import { selectCustomerForm } from 'src/app/store/selectors/customer.selectors';
import * as CustomerActions from '../../store/actions/customer.actions';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html'
})
export class CustomerDialogComponent implements OnInit, AfterViewInit {
  formState$!: Observable<FormGroupState<CustomerRequest>>;

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChildren('streetInput') streetInputs!: QueryList<ElementRef>;

  constructor(private store: Store, public ref: DynamicDialogRef) { }

  ngOnInit() {
    this.formState$ = this.store.select(selectCustomerForm);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nameInput?.nativeElement?.focus();
    }, 100);
  }

  trackById(index: number, item: any) {
    return item && item.id ? item.id : index;
  }

  addAddress() {
    this.store.dispatch(CustomerActions.addCustomerAddress({ value: { street: '', city: '', zipCode: '' } }));

    setTimeout(() => {
      const arr = this.streetInputs.toArray();
      const last = arr[arr.length - 1];
      if (last && last.nativeElement) {
        last.nativeElement.focus();
      }
    }, 50);
  }

  removeAddress(index: number) {
    this.store.dispatch(CustomerActions.removeCustomerAddress({ index }));
  }

  save(formValue: CustomerRequest) {
    console.log(formValue)
    this.ref.close(formValue);
  }

  cancel() {
    this.ref.close();
  }
}
