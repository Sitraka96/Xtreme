import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetraitService {
  private apiUrl = 'http://localhost:8080/retraits'; // Remplacez l'URL par votre endpoint API

  constructor(private http: HttpClient) { }

  getAllRetraits(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
