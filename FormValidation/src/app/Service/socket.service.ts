import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'; 
import { Observable, subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }


  // emit event
	OrderStatusemit(data:any) {
		this.socket.emit('join',`order_${data}`);
	} 

     listen(orderemit:string) {
		return new Observable((subscribe)=>{
			this.socket.on(orderemit,(data:any)=>{
				subscribe.next(data)
			})
		})
	}

}
