import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiserviceService } from './Service/apiservice.service';
import { FormService } from './Service/form.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Admin';
  image:any ;

  constructor(private http: HttpClient,private form:FormBuilder,
    private apiservice : ApiserviceService,
    public service : FormService){

  }

  ngOnInit(){

  }

  select(event:any){
    if(event.target.files.length > 0){
      const file1 = event.target.files[0];
      this.image=file1  
    }
  }

  upload(){
    const formData = new FormData();
    formData.append('file',this.image);
    console.log(this.service.AddProductForm.value);
    
    formData.append('name',this.service.AddProductForm.value.FirstName)

    this.apiservice.AddProduct(formData).subscribe()

  }
}
