import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterapiService } from 'src/app/Service/registerapi.service';
import { RegisterService } from 'src/app/Service/register.service';
import { NotificationService } from 'src/app/Service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  success:string=''
  hide = true;
  constructor(public service: RegisterService,
    public apiservice : RegisterapiService,
    private route:Router,
    private notifyService : NotificationService) { 

    }

  ngOnInit(): void {
  }

  public get displayName(): any {
    return this.service.login.value;
  }

  click():any{
    this.apiservice.LoginUser(this.service.login.value).subscribe((data) => {
      if(data.msg === 'Fail'){
        this.notifyService.showError("Fail", data.msg1)
      }
      else{
        console.log(data.toString());
        this.notifyService.showSuccess("Sucess",data.msg1)
        this.route.navigate(['/'])
        
      }
      
    })
  }

}
