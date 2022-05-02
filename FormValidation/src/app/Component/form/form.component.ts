import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { RegisterService } from 'src/app/Service/register.service';
import { ApicallService } from 'src/app/Service/apicall.service';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { NotificationService } from 'src/app/Service/notification.service';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { LocationService } from 'src/app/Service/location.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Moment}  from 'moment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

interface Country {
  shortName: string;
  name: string;
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  maxDate = new Date();
  gender:string='';
  email1:string='';
  success:string = '';
  hide = true;
  y:any=[] 
  isLinear = true;
  date:any;

  
  matcher = new MyErrorStateMatcher();

  countries: Country[];
  states: string[]=[];
  cities: string[]=[];


  address = new FormControl(null, [Validators.required]);
  country = new FormControl(null, [Validators.required]);
  state = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  city = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  pincode = new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]);

  
  
  @Output() change: EventEmitter<MatRadioChange> = new EventEmitter<MatRadioChange>()

  form: FormGroup= new FormGroup({
    address:this.address,
    country: this.country,
    state: this.state,
    city: this.city,
    pincode: this.pincode
  });

  formData: FormGroup= new FormGroup({
FirstName:new FormControl(''),
LastName:new FormControl(''),
email:new FormControl(''),
mobile:new FormControl(''),
gender:new FormControl(''),
dob:new FormControl(''),
password:new FormControl(''),
address:new FormControl(''),
country:new FormControl(''),
state:new FormControl(''),
city:new FormControl(''),
pincode:new FormControl(''),
  });

  constructor(public service: RegisterService,
    public apiservice : ApicallService,
    private route:Router,
    private notifyService : NotificationService,
    private locationservice: LocationService) {
      
      
      this.countries = this.locationservice.getCountries();
}

  ngOnInit(): void {
    this.service.cast.subscribe(gender => this.gender = gender)
    this.service.Email.subscribe(email=> this.email1 = email)

    this.country.valueChanges.subscribe((country) => {
      this.state.reset();
      this.state.disable();
      if (country) {
        this.states = this.locationservice.getStatesByCountry(country);
        this.state.enable();
      }
    });

    this.state.valueChanges.subscribe((state) => {
      this.city.reset();
      this.city.disable();
      if (state) {
        this.cities = this.locationservice.getCitiesByState(this.country.value, state);
        this.city.enable();
      }
    });
  }

  public get displayName(): any {
    return this.service.form.value;
  }

  register(){

    console.log(this.service.form.value.FirstName,
      this.service.form.value.LastName,
      this.service.form.value.email,
      this.service.form.value.mobile,
      this.service.form.value.gender,
      this.service.form.value.dob,
      this.service.form.value.password,
      this.form.value.address,
      this.form.value.country,
      this.form.value.state,
      this.form.value.city,
      this.form.value.pincode);
    

    this.formData.setValue({
      // Key:this.service.form.value.key,
FirstName:this.service.form.value.FirstName,
LastName:this.service.form.value.LastName,
email:this.service.form.value.email,
mobile:this.service.form.value.mobile,
gender:this.service.form.value.gender,
dob:this.service.form.value.dob,
password:this.service.form.value.password,
address:this.form.value.address,
country:this.form.value.country,
state:this.form.value.state,
city:this.form.value.city,
pincode:this.form.value.pincode
    });

    console.log(this.formData.value);
    
    // formData.append('Key',this.service.form.value.key);
    // formData.append('FirstName',this.service.form.value.FirstName);
    // formData.append('LastName',this.service.form.value.LastName);
    // formData.append('email',this.service.form.value.email);
    // formData.append('mobile',this.service.form.value.mobile);
    // formData.append('gender',this.service.form.value.gender);
    // formData.append('dob',this.service.form.value.dob);
    // formData.append('password',this.service.form.value.password);
    // formData.append('address',this.form.value.address);
    // formData.append('country',this.form.value.country);
    // formData.append('state',this.form.value.state);
    // formData.append('city',this.form.value.city);
    // formData.append('pincode',this.form.value.pincode);
// 
    // console.log(formData);
    

    this.apiservice.AddUser(this.formData.value).subscribe((data) => {
      if(data.msg === 'Success'){
        console.log(data);
        
        localStorage.setItem('token',data.token.toString());
        this.notifyService.showSuccess("Sucess",data.msg1);
        this.service.getemail(this.service.form.value.email);
        
        this.route.navigate(['/'])
      }
      else{
        this.notifyService.showError("Fail", data.msg1)
      }
      
    })
  }

  
  
  onChange(mrChange: MatRadioChange) {
    this.service.getgender(mrChange.value)
    
 }
 events:any;
 addEvent(event: MatDatepickerInputEvent<Date>) {
   
  // @ts-ignore: Object is possibly 'null'.
  this.events=event.value;
  var today = new Date(this.events);
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  this.date= dd + '/' + mm + '/' + yyyy;
}

}

  


