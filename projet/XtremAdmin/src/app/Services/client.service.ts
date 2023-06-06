import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { client } from '../Model/Client';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.baseUrl+'/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<client[]> {
    return this.http.get<client[]>(this.apiUrl);
  }
}
