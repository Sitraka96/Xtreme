import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io,Socket } from "socket.io-client";
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;

  constructor(
    private store: LocalStorageService
  ) {

    console.log("SocketService");
      this.socket = io(environment.baseUrl+'/admin', {
      transports : ['websocket'],
      withCredentials: true,
      extraHeaders: {
        authorization: "Bearer " + store.getItem('token'),
        'Origin': 'http://localhost:4200'
        //'Origin': 'https://admin.legrisy.com'
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            'Origin': 'http://localhost:4200'
            //'Origin': 'https://admin.legrisy.com'
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
