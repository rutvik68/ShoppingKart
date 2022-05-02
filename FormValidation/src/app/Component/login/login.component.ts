import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/Service/apicall.service';
import { NotificationService } from 'src/app/Service/notification.service';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  success:string=''
  hide = true;
  email1=''
  constructor(public service: RegisterService,
    public apiservice : ApicallService,
    private route:Router,
    private notifyService:NotificationService) { 

    }

  ngOnInit(): void {
    this.service.Email.subscribe(email=> this.email1 = email)
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
        localStorage.setItem('token',data.token.toString())
        this.notifyService.showSuccess("Sucess",data.msg1)
        this.service.getemail(this.service.form.value.email);
        this.route.navigate(['/'])        
      }
      
    })
  }

}
