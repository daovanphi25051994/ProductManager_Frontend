import { ProductsComponent } from './../../main/products/products.component';
import { OrdersComponent } from './../../main/orders/orders.component';
import { CustomersComponent } from './../../main/customers/customers.component';
import { SalesInformationComponent } from './../../main/sales-information/sales-information.component';
import { Routes } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
    { path: 'sales-information',      component: SalesInformationComponent },
    { path: 'orders',     component: OrdersComponent },
    { path: 'customers',   component: CustomersComponent },
    { path: 'products',     component: ProductsComponent },
];
