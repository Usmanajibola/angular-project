import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public messages: Rx.Subject<any>;
  private subject: Rx.Subject<any>;
  public ws: WebSocket;

  socketIsOpen = 1;


  constructor() { }

  public createObservableSocket(url:string) {
    // this.ws = new WebSocket(url);
    // return new Rx.Observable(
    //   (observer: Rx.Observer<any>) => {
    //     this.ws.onmessage = (event) => observer.next.bind(observer);
    //     this.ws.onerror = (event) => observer.error.bind(observer);
    //     this.ws.onclose = (event) => observer.complete.bind(observer);
    //     return this.ws.close(1000, "The user disconnected");
    //   }
    // );
  }

  // sendMessage(message: string): string{
  //   if (this.ws.readyState === this.socketIsOpen){
  //     this.ws.send(message);
  //     return `Sent to server ${message}`;
  //   }else{
  //     return 'Message was not sent - the socket is closed';
  //   }
  // }




}
