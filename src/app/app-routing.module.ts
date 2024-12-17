import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartComponent } from './cart/cart/cart.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home/home.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisFormComponent } from './login/regis-form/regis-form.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'servants', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'products/:productId', component: ProductDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisFormComponent },
  { path: 'user', component: UserComponent },
  // { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
