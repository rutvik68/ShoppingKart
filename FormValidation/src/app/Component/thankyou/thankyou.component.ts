import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  email1=''

  constructor(private cartservice : CartService,
    private service: RegisterService) { }

  ngOnInit(): void {
    this.service.Email.subscribe(email=> this.email1 = email)
    console.log(this.email1);
    this.cartservice.removeAllCart()
  }

}
