import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { NotificationService } from 'src/app/Service/notification.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-coustmber',
  templateUrl: './coustmber.component.html',
  styleUrls: ['./coustmber.component.css']
})
export class CoustmberComponent implements OnInit {

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

  formData: FormGroup= new FormGroup({
    id:new FormControl('')})

}
