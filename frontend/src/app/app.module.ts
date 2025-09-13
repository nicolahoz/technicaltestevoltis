import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule, ConfirmPopup } from 'primeng/confirmpopup';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductEffects } from './store/effects/products.effects';
import { productReducer } from './store/reducers/product.reducer';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerDialogComponent } from './components/customer-dialog/customer-dialog.component';
import { customerReducer } from './store/reducers/customer.reducer';
import { CustomerEffects } from './store/effects/customers.effects';
import { OrderEffects } from './store/effects/orders.effects';
import { OrderReducer } from './store/reducers/order.reducer';
import { OrderComponent } from './pages/order/order.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDialogComponent,
    CustomerComponent,
    CustomerDialogComponent,
    OrderComponent,
    OrderDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AvatarModule,
    RouterModule.forRoot(appRoutes),
    SidebarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgrxFormsModule,
    StoreModule.forRoot({ product: productReducer, customer: customerReducer, order: OrderReducer }),
    EffectsModule.forRoot([ProductEffects, CustomerEffects, OrderEffects]),
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    InputNumberModule,
    DialogModule,
    HttpClientModule,
    MenuModule,
    MegaMenuModule,
    MenubarModule,
    ConfirmDialogModule,
    ToastModule,
    ConfirmPopupModule,
    CardModule,
    FormsModule,
    DropdownModule
  ],
  providers: [DialogService, ConfirmationService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
