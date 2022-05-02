import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './Component/addproduct/addproduct.component';
import { CoustmberComponent } from './Component/coustmber/coustmber.component';
import { LoginComponent } from './Component/login/login.component';
import { OrderStatusComponent } from './Component/order-status/order-status.component';
import { RegisterComponent } from './Component/register/register.component';
import { RemoveproductComponent } from './Component/removeproduct/removeproduct.component';
import { UpdateproductComponent } from './Component/updateproduct/updateproduct.component';

const routes: Routes = [
  {path:'',component: AddproductComponent},
  {path:'remove',component: RemoveproductComponent},
  {path:'update',component: UpdateproductComponent},
  {path:'register',component: RegisterComponent},
  {path:'login',component: LoginComponent},
  {path:'orderstatus',component: OrderStatusComponent},
  {path:'customerinfo',component: CoustmberComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
