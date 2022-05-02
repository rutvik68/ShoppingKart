import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { FormService } from 'src/app/Service/form.service';
import { NotificationService } from 'src/app/Service/notification.service';

@Component({
  selector: 'app-removeproduct',
  templateUrl: './removeproduct.component.html',
  styleUrls: ['./removeproduct.component.css']
})
export class RemoveproductComponent implements OnInit {

  image:any ;

  constructor(public service : FormService,
    public apiservice : ApiserviceService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
  }

  select(event:any){
    if(event.target.files.length > 0){
      const file1 = event.target.files[0];
      this.image=file1  
    }
  }

  onSubmit(){
    console.log(this.service.RemoveProduct.value);
     
    // const formData = new FormData();
    // formData.append('id',this.service.RemoveProduct.value.id);
    // formData.append('t','ji');
    // console.log(formData);
    
    

    this.apiservice.removeProduct(this.service.RemoveProduct.value).subscribe((data)=>{
      if(data.msg==="Success"){
        this.notifyService.showSuccess("Sucess", data.msg1)
      }
      else{
        this.notifyService.showError("Fail", data.msg1)
      }
    })

  }

}
