import { Component, OnInit } from '@angular/core';
import { ApiproductService } from 'src/app/Service/apiproduct.service';
import { CartService } from 'src/app/Service/cart.service';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { NotificationService } from 'src/app/Service/notification.service';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Service/register.service';
import { ApicallService } from 'src/app/Service/apicall.service';


declare let window:any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  ethereum = window.ethereum as MetaMaskInpageProvider;

  public products : any = [];
  public grandtotal !: number;
  quantity1:Array<any>=[]
  food:object[]=[]
  food1:Array<number>=[]
  id=''

  constructor(private cartservice : CartService,
    private api: ApiproductService,
    private notifyService: NotificationService,
    private route:Router,
    private loginapi : ApicallService,
    private service: RegisterService) { }

  ngOnInit(): void {
    this.loginapi.getUser().subscribe(
      data =>this.id = data.toString(),
    )
    
    this.cartservice.getProducts()
    .subscribe(res=>{
      this.products=res;
      this.grandtotal = this.cartservice.getTotalprice();
      
    })

    this.products.forEach((item:any)=>{  
      this.food1=[]
      for(let i=1;i<=item.qutenty;i++){
          this.food1.push(i)   
      }
      Object.assign(item,{food:this.food1})
    }); 
     

  }

  removeItem(item:any){
    this.cartservice.removeCartItem(item)
  }

  emptyCart(){
    this.cartservice.removeAllCart()
  }

  changequtenty(value:any,item:any){
    console.log(value);
    item.total=item.Price*value;
    this.grandtotal = this.cartservice.getTotalprice();
    console.log(item);
    
    
  }

  async update(){
    const accounts:any = await this.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(this.products);
    await this.api.update(this.products,account,this.grandtotal,this.id).subscribe((data)=>{
      if(data.msg === 'Fail'){
        this.notifyService.showError("Fail", data.msg1)
      }
      else{
        this.notifyService.showSuccess("Sucess",data.msg1)
        this.route.navigate(['/thankyou'])        
      }
    })
  }

}
