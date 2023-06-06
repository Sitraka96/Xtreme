import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8080/paiements'; // Remplacez l'URL par celle de votre API

  constructor(private http: HttpClient) { }

  getAllPaiement(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
