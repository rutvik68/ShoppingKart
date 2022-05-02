import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartItemList:any = []
  //act like emit & subscriber
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtocart(product:any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalprice();
    console.log(this.cartItemList);
    
  }

  getTotalprice() : number{
    let grandtotal = 0;
    this.cartItemList.map((a:any)=>{
      grandtotal += a.total;
    })
    return grandtotal;
  }

  removeCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id === a.id)
      {
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList)
  }

  removeAllCart(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList);
  }
  
}
