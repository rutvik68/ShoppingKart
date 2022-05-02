import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddproductComponent } from './Component/addproduct/addproduct.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ToastrModule } from 'ngx-toastr';
import { Ng2TelInputModule } from 'ng2-tel-input';
import {MatSelectModule} from '@angular/material/select';

import { RemoveproductComponent } from './Component/removeproduct/removeproduct.component';
import { UpdateproductComponent } from './Component/updateproduct/updateproduct.component';
import { RegisterComponent } from './Component/register/register.component';
import { LoginComponent } from './Component/login/login.component';
import { OrderStatusComponent } from './Component/order-status/order-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoustmberComponent } from './Component/coustmber/coustmber.component';



@NgModule({
  declarations: [
    AppComponent,
    AddproductComponent,
    RemoveproductComponent,
    UpdateproductComponent,
    RegisterComponent,
    LoginComponent,
    OrderStatusComponent,
    CoustmberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    ToastrModule.forRoot({  
      closeButton: true,  
        
    } ),
    Ng2TelInputModule,
    MatSelectModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
