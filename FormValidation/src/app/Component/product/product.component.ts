import { Component, OnInit } from '@angular/core';
import { ApiproductService } from 'src/app/Service/apiproduct.service';
import { CartService } from 'src/app/Service/cart.service';
import {Router} from '@angular/router';
import { ApicallService } from 'src/app/Service/apicall.service';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList: any;
  public filtercategory : any;
  searchkey:string = '';
  username = '';
  id='';

  constructor(private api: ApiproductService,
    private cartservice: CartService,
    private loginapi : ApicallService,
    public service: RegisterService,
    private route:Router) {
      this.loginapi.getUser().subscribe(
        data =>this.username = data.toString(),
        error=>this.route.navigate(['/login'])
      )
     }

  ngOnInit(): void {
    
    
    this.api.getProduct()
    .subscribe(res=>{
      this.productList=res;
      this.filtercategory = res;

      // this.productList.forEach((a:any) => {
        // if(a.category === "women's clothing" || a.category === "men's clothing"){
          // a.category = "fashion"
        // }
        // Object.assign(a,{quantity:1,total:a.Price})
      // });
    });
    this.cartservice.search.subscribe((val:any)=>{
      this.searchkey = val;
    })

    setTimeout(()=>{
      this.service.getemail(this.username);
      this.service.Email.subscribe(email=> this.id = email);
      console.log(this.id);
      
    }, 1000);

  }

  // addtocart(item:any){
    // this.cartservice.addtocart(item)
  // }

  productdetail(id:number){
    
    this.route.navigate(['/product',id]);
  }

  filter(category:string){
    this.filtercategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category == ''){
        return a;
      }
    })
  }

}
