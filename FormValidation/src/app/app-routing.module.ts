import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Component/cart/cart.component';
import { FormComponent } from './Component/form/form.component';
import { HistoryComponent } from './Component/history/history.component';
import { LoginComponent } from './Component/login/login.component';
import { OrderStatusComponent } from './Component/order-status/order-status.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductdetailsComponent } from './Component/productdetails/productdetails.component';
import { ThankyouComponent } from './Component/thankyou/thankyou.component';
import { UpdateUserComponent } from './Component/update-user/update-user.component';

const routes: Routes = [
  {path:'',component: ProductComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: FormComponent},
  {path:'cart',component: CartComponent},
  {path:'product/:id', component: ProductdetailsComponent},
  {path:'thankyou',component: ThankyouComponent},
  {path:'history',component: HistoryComponent},
  {path:'orderstatus/:id', component: OrderStatusComponent},
  {path:'updateuser',component: UpdateUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
