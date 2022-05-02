import { Component, Input } from '@angular/core';
import { RegisterService } from './Service/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  gender:string='';
  title = 'Shopping-Kart';
  constructor(public service: RegisterService) { }

  public get displayName(): any {
    return this.service.form.value;
  }

  ngOnInit(): void {
    this.service.cast.subscribe(gender => this.gender = gender)
    console.log(this.gender);
  }



}
