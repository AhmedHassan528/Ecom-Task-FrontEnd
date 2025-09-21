import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './layout/Pages/product-details/product-details.component';
import { ProductCardComponent } from './layout/additions/product-card/product-card.component';
import { LoginComponent } from './layout/Pages/Auth/login/login.component';
import { SignUpComponent } from './layout/Pages/Auth/sign-up/sign-up.component';
import { ConfirmEmailComponent } from './layout/Pages/Auth/confirm-email/confirm-email.component';
import { ForgetPasswordComponent } from './layout/Pages/Auth/forget-password/forget-password.component';
import { ConfermforgetPAsswordComponent } from './layout/Pages/Auth/confermforget-password/confermforget-password.component';
import { AllUseresComponent } from './lay-out-Admin/all-useres/all-useres.component';
import { AllProductsAdminComponent } from './lay-out-Admin/all-products-admin/all-products-admin.component';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: 'products', component: ProductCardComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'ConfirmEmail', component: ConfirmEmailComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'reset-password/ConfirmEmail', component: ConfermforgetPAsswordComponent },
  { path: 'AllUsers', component: AllUseresComponent, canActivate: [AdminGuard] },
  { path: 'ProductsAdmin', component: AllProductsAdminComponent, canActivate: [AdminGuard] },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
