import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { RegisterService } from 'src/app/Service/register.service';
import { RegisterapiService } from 'src/app/Service/registerapi.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  gender:string='';
  success:string = '';
  hide = true;
  y:any=[] 
  
  @Output() change: EventEmitter<MatRadioChange> = new EventEmitter<MatRadioChange>()

  constructor(public service: RegisterService,
    public apiservice : RegisterapiService,
    private route:Router,
    private notifyService : NotificationService) {
}

  ngOnInit(): void {
    this.service.cast.subscribe(gender => this.gender = gender)
  }

  public get displayName(): any {
    return this.service.form.value;
  }

  click():any{
    this.apiservice.AddUser(this.service.form.value).subscribe((data) => {
      if(data.msg==="Success"){
        this.notifyService.showSuccess("Sucess",data.msg1)
        this.route.navigate(['/'])
      }
      else{
        this.notifyService.showError("Fail", data.msg1)
      }
      
    })
  }

  onCountryChange(event:any)
  {
    this.service.getcode(event.dialCode,event.name)
    // this.service.form.value['mobileCode']=event.dialCode
    // this.service.form.value['country']=event.name
  }
  
  onChange(mrChange: MatRadioChange) {
    this.service.getgender(mrChange.value)
    
 }

}
