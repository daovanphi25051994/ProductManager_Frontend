import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SalesInformationComponent } from './main/sales-information/sales-information.component';
import { OrdersComponent } from './main/orders/orders.component';
import { ProductsComponent } from './main/products/products.component';
import { CustomersComponent } from './main/customers/customers.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CreateCustomerComponent } from './main/customers/them-moi/them-moi.component';
import { CreateProductComponent } from './main/products/them-moi/them-moi.component';
import { CreateOrderComponent } from './main/orders/create-order/create-order.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    SharedModule,
    ToastrModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SalesInformationComponent,
    OrdersComponent,
    ProductsComponent,
    CustomersComponent,
    CreateCustomerComponent,
    CreateProductComponent,
    CreateOrderComponent

  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
