import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { FormService } from 'src/app/Service/form.service';
import { NotificationService } from 'src/app/Service/notification.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

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
    const formData = new FormData();
    formData.append('id',this.service.UpdateProductForm.value.id);
    formData.append('ProductName',this.service.UpdateProductForm.value.ProductName);
    formData.append('Description',this.service.UpdateProductForm.value.Description);
    formData.append('Price',this.service.UpdateProductForm.value.Price);
    formData.append('category',this.service.UpdateProductForm.value.category);
    formData.append('qutenty',this.service.UpdateProductForm.value.qutenty);
    formData.append('image',this.image);
    

    this.apiservice.updateProduct(formData).subscribe((data)=>{
      if(data.msg==="Success"){
        this.notifyService.showSuccess("Sucess", data.msg1)
      }
      else{
        this.notifyService.showError("Fail", data.msg1)
      }
    })

  }

}
