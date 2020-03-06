import { Component, OnInit } from '@angular/core';
import { Scrumuser } from '../scrumuser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  WS_URL: string = 'wss://667kkhuds9.execute-api.us-east-2.amazonaws.com/test'
  websocketConnection:WebSocket
  logincred:any;
  chat_text:String

  messages = [];

  constructor(


  ) {
    this.websocketConnection = new WebSocket(this.WS_URL)
  }

  ngOnInit(): void {
    this.websocketConnection.onopen=(event)=>{
       const context = {action:'getRecentMessages'}
       this.websocketConnection.send(JSON.stringify(context))


    }
    this.websocketConnection.onmessage=(event)=>{
       let data=JSON.parse(event.data)

       if  (data['messages']!==undefined) {
         data['messages'].forEach((message)=>{
           this.messages.push(message);
         })
       }
       console.log(this.messages);

    }



  }

 getUsername(): string{
    this.logincred = JSON.parse(localStorage.getItem('Authobj'));
    return this.logincred.name;
  };

  userLoginData = new Scrumuser('', '','','', '')

getCurrentTime() {
  return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
}


  sendMessage(chat_text) {



    if (chat_text) {
      const context = {"action":"sendMessage", "content":chat_text, "username":this.getUsername(), "timestamp":this.getCurrentTime()}
      let strContext = JSON.stringify(context);
      this.websocketConnection.send(strContext);
      this.chat_text = '';
      this.userLoginData.projectname = '';

      window.setInterval(function () {
      const elem = document.getElementById('data');
      elem.scrollTop = elem.scrollHeight;
    }, 5000);

    }
  }

  ngOnDestroy() {
    this.websocketConnection.close();
  }
}
