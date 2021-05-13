import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SalesInformationComponent } from './main/sales-information/sales-information.component';
import { OrdersComponent } from './main/orders/orders.component';
import { ProductsComponent } from './main/products/products.component';
import { CustomersComponent } from './main/customers/customers.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    MatIconModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SalesInformationComponent,
    OrdersComponent,
    ProductsComponent,
    CustomersComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
