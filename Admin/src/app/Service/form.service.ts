import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  AddProductForm : FormGroup = new FormGroup({
    $key: new FormControl(null),
    id : new FormControl('',[Validators.required]),
    ProductName : new FormControl('',[Validators.required]),
    Description : new FormControl('',[Validators.required]),
    Price:new FormControl('',[Validators.required]),
    category : new FormControl('',[Validators.required]),
    qutenty : new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
  })

  RemoveProduct: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id : new FormControl('',[Validators.required])
  })

  UpdateProductForm : FormGroup = new FormGroup({
    $key: new FormControl(null),
    id : new FormControl('',[Validators.required]),
    ProductName : new FormControl('',[Validators.required]),
    Description : new FormControl('',[Validators.required]),
    Price:new FormControl('',[Validators.required]),
    category : new FormControl('',[Validators.required]),
    qutenty : new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
  })
}
