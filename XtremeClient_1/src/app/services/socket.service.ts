import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io,Socket } from "socket.io-client";
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;

  constructor(
    private store: LocalStorageService
  ) {
      //this.socket = io('http://localhost:8080/admin', {
      this.socket = io('http://localhost:8080/admin', {
      transports : ['websocket'],
      withCredentials: true,
      extraHeaders: {
        authorization: "Bearer " + store.getItem('token'),
        //'Origin': 'http://localhost:4200'
        'Origin': 'http://localhost:4200'
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            //'Origin': 'http://localhost:4200'
            'Origin': 'http://localhost:4200'
          }
        }
      }
    });
    
  }
  sendMessage(canal:string,msg: string) {
    console.log(canal);
    console.log(msg);
    this.socket.emit(canal, { message: msg });
  }
  
  onNewAnnonce() {
    return new Observable(observer => {
      this.socket.on('newAnnonce', (msg:any) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }
}
