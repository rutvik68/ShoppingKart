import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Socket } from 'socket.io';
import { HistoryService } from 'src/app/Service/history.service';
import { SocketService } from 'src/app/Service/socket.service';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  public Product:any
  public pid:any
  public order:any;
  statuses:any;

  constructor(
    private api: HistoryService,
    private activatedRoute: ActivatedRoute,
    private socket: SocketService
  ) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param=>{
      // @ts-ignore: Object is possibly 'null'.
     this.pid = param.get('id')
     
     // this.pid=this.pid.toString();
     
   })
    await this.api.getorderstatus(this.pid).subscribe((res)=>{
      this.Product=res[0];
    })
    
    this.statuses=document.querySelectorAll('.status_line')

    setTimeout(()=>{
      this.UpdateStatus(this.Product)
      
    }, 500);

    this.socket.OrderStatusemit(this.pid)

    this.socket.listen('orderemit').subscribe((data:any)=>{
      // console.log(data.status);
      
      const updateorder = {...this.Product}
      // updateorder.updatedAt = moment().format()
      updateorder.status = data.status
      console.log(updateorder);
      
      this.UpdateStatus(updateorder)
      
    })

  }

  UpdateStatus(Order:any) {
    this.statuses.forEach((status:any) => {
      status.classList.remove('step-completed')
      status.classList.remove('current');
    })
    let stepCompleted =true
    this.statuses.forEach((status:any) => {
         let dataProp = status.dataset.status
         
         if(stepCompleted){
           status.classList.add('step-completed');
              
         }
      
         if(dataProp=== Order.status){
          stepCompleted=false
           if(status.nextElementSibling){
             status.nextElementSibling.classList.add('current')
           }
         }
         
    });
  }

}
