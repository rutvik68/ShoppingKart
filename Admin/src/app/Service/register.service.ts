import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  private gender = new BehaviorSubject<string>('other')
  cast = this.gender.asObservable();

  code = new BehaviorSubject<string>('')
  cast1 = this.code.asObservable();

  code1 = new BehaviorSubject<string>('')
  cast2 = this.code.asObservable();

  code2=''

  getgender(newgender:string){
    this.gender.next(newgender);
  }

  getcode(p:any,q:any){
    this.code.next(p)
    this.code1.next(q)
  }

  form : FormGroup = new FormGroup({
    $key: new FormControl(null),
    FirstName : new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
    LastName : new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    // mobileCode:new FormControl(''),
    // country:new FormControl(this.cast1.subscribe(this.code)),
    mobile:new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/),Validators.minLength(10),Validators.maxLength(10)]),
    gender: new FormControl('other'),
    dob:new FormControl(''),
    password:new FormControl('', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
  })

  login : FormGroup = new FormGroup({
    $key : new FormControl(null),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
  })
}
