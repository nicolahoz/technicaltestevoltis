import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { selectProductForm } from 'src/app/store/selectors/product.selectors';
import { ProductRequest } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html'
})
export class ProductDialogComponent implements OnInit, AfterViewInit  {
  formState$!: Observable<FormGroupState<ProductRequest>>;
  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(
    private store: Store,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.formState$ = this.store.select(selectProductForm);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nameInput.nativeElement.focus();
    }, 100)
  }

  save(formValue: ProductRequest) {
    this.ref.close(formValue);
  }

  cancel() {
    this.ref.close();
  }

  onPriceFocus(event: any) {
    const inputEl = event.target as HTMLInputElement;
    setTimeout(() => {
      inputEl.setSelectionRange(0,inputEl.value.length);
    }, 0);
  }
}

