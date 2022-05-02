import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/Service/apicall.service';
import { HistoryService } from 'src/app/Service/history.service';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  id='';
  public productList: any=[];
  constructor(
    public service: RegisterService,
    private api: HistoryService,
    private loginapi : ApicallService,
    private route:Router
  ) { this.loginapi.getUser().subscribe(
    data =>this.id = data.toString(),
  )}

  ngOnInit(): void{
    
    

    setTimeout(()=>{
      console.log(this.id);
      
      this.api.getProduct(this.id)
    .subscribe((res)=>{
      // this.productList=res;
      var i;
      for(i=res.length-1;i>=0;i--){
        this.productList.push(res[i]);
      }
      console.log(this.productList);
      
    })
      
    }, 500);
 
  }

  showdetail(id:number){
    
    this.route.navigate(['/orderstatus',id]);
  }

}
