import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket.service';
import { Scrumuser } from '../scrumuser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  WS_URL: String = 'wss://667kkhuds9.execute-api.us-east-2.amazonaws.com/test'
  messages = [];
  chat_text: String
  logincred: any;
  messageFromServer: String;
  wsSubscription: Subscription;
  status: any;
  socket: WebSocket;

  constructor(private wsService: WebsocketService) {
    // this.wsSubscription = this.wsService.createObservableSocket("wss://0l90clyplf.execute-api.us-east-2.amazonaws.com/test").subscribe(
    //   data =>{
    //     this.messageFromServer = data
    //   },
    //   err =>{
    //     console.log('err', err);
    //   }
    // )
    this.socket = new WebSocket('wss://667kkhuds9.execute-api.us-east-2.amazonaws.com/test');
    console.log('connect', this.socket)

  }

  ngOnInit(): void {
    this.socket.onopen = (event) => {
      const context = { action: "getRecentMessages" }
      this.socket.send(JSON.stringify(context))

      this.socket.onmessage = (event) =>{
        let data = JSON.parse(event.data)
        console.log("message things" + data['messages'])
        if (data['messages'] !== undefined){
          data['messages'].forEach((message) => {
            console.log("new =" + JSON.stringify(message))
            this.messages.push(message)

          })
          console.log("Array "+ this.messages)
          this.messages.forEach((message) =>{
            console.log("allmessages " + message.username )
          })
        }
      }
    }
  }

  scrumLoginUserModel = new Scrumuser('', '', '', '', '');

  getUsername(): string {
   this.logincred = JSON.parse(localStorage.getItem('Authobj'));
   console.log("The User ="+this.logincred.name)
   return this.logincred.name
 }
 getCurrentTime(){
   return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
 }


 sendMessage() {
   const chat_text = this.scrumLoginUserModel.projectname;

   if(chat_text){
     const context = {
     "action": "sendMessage",
     "username": this.getUsername(),
     "content": chat_text,
     "timestamp": this.getCurrentTime() }
     const cc = JSON.stringify(context);
     this.socket.send(cc)
     this.chat_text =''
     this.scrumLoginUserModel.projectname = '';
   window.setInterval(function () {
     const elem = document.getElementById('data');
     elem.scrollTop = elem.scrollHeight;
   }, 5000);
   }

 }


 ngOnDestroy(){
   this.socket.close()
 }
}
