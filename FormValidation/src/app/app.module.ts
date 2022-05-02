import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './Component/form/form.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { RegisterService } from './Service/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoginComponent } from './Component/login/login.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './Component/cart/cart.component';
import { HeaderComponent } from './Component/header/header.component';
import { ProductComponent } from './Component/product/product.component';
import { FilterPipe } from './Shared/filter.pipe';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ProductdetalisComponent } from './productdetalis/productdetalis.component';
import { ProductdetailsComponent } from './Component/productdetails/productdetails.component';
import { ThankyouComponent } from './Component/thankyou/thankyou.component';
import { HistoryComponent } from './Component/history/history.component';
import { OrderStatusComponent } from './Component/order-status/order-status.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { UpdateUserComponent } from './Component/update-user/update-user.component';

const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    CartComponent,
    HeaderComponent,
    ProductComponent,
    FilterPipe,
    // ProductdetalisComponent,
    ProductdetailsComponent,
    ThankyouComponent,
    HistoryComponent,
    OrderStatusComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    Ng2TelInputModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatSelectModule,
    ToastrModule.forRoot({  
      closeButton: true,  
        
    } ),
    SocketIoModule.forRoot(config), 
    MatStepperModule,
    MatListModule
    // MatMomentDateModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
