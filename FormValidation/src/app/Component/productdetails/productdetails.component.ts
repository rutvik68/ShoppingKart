import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiproductService } from 'src/app/Service/apiproduct.service';
import { CartService } from 'src/app/Service/cart.service';
import { NotificationService } from 'src/app/Service/notification.service';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  public productList: any;
  public product:any
  public filtercategory : any;
  searchkey:string = ''
  pid:any;
  quantity1:number=1;
  food:Array<number>=[]
  id=''
  

  constructor(private api: ApiproductService,
    private cartservice: CartService,
    private activatedRoute: ActivatedRoute,
    private route:Router,
    private service : RegisterService,
    private notifyService : NotificationService
    ) { }

  async ngOnInit(): Promise<void> {

    
    

    this.route.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };

    await this.activatedRoute.paramMap.subscribe(param=>{
       // @ts-ignore: Object is possibly 'null'.
      this.pid = param.get('id')
      // this.pid=this.pid.toString();
      
    })

    await this.api.getProduct()
    .subscribe(res=>{
      this.productList=res;
      this.filtercategory = res;

      this.productList.forEach((a:any) => {
        if(a.id === this.pid){
          this.product = a
          return;
        }
        // Object.assign(a,{quantity:1,total:a.Price})
      // });
    });

    if(this.product.quantity != 0){
// 
    for(let i=1;i<=this.product.qutenty;i++){
      this.food.push(i);      
    }}else{
      this.food.push(0);
    }
    

    this.filtercategory = this.productList
    .filter((a:any)=>{
      if(a.category == this.product.category || this.product.category == ''){
        return a;
      }
    })
    
    this.cartservice.search.subscribe((val:any)=>{
      this.searchkey = val;
    })
  })

  // await this.filter(this.product.category)
  this.service.Email.subscribe(email=> this.id = email)
  console.log(this.id);

}

productdetail(id:number){
  this.route.navigate(['/product',id]);
}

addtocart(){
  Object.assign(this.product,{quantity:this.quantity1,total:(this.product.Price*this.quantity1)})
    this.cartservice.addtocart(this.product)
    this.notifyService.showSuccess("","Product Add to cart!!")
  }

  filter(category:string){
    this.filtercategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category == ''){
        return a;
      }
    })
  }

  changequtenty(value:any){
    this.quantity1=value
  }
}
