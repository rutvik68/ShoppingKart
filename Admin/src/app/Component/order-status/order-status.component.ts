import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { NotificationService } from 'src/app/Service/notification.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  public product: any=[];
  public productList: any=[];
  t:number=1;
  status1:any='';
  stutas=['order_placed','order_confirm','order_packed','order_delivered']

  constructor(
    public apiservice : ApiserviceService,
    private notifyService : NotificationService
  ) { }

 async ngOnInit(){
    this.apiservice.getOrder().subscribe(res=>{
      this.product=res
    
      
    })

    setTimeout(()=>{
      this.product.forEach((item:any) => {
        if(item.status != 'order_delivered'){
          this.productList.push(item)
        }
      });
      
    }, 500);
  }

  changestatus(value:any){
    this.status1=value
    
  }

  onChangestatus(id:any){
    this.apiservice.changeOrder(id,this.status1).subscribe(data=>{
      if(data.msg==="Fail"){
        this.notifyService.showError("Fail","try again")
      }
      else{
        this.notifyService.showSuccess("Sucess", "Done")
      }
      
    })
    // );
  }
  
}


