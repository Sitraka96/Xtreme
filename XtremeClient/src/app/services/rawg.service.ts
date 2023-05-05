import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private API_KEY = '2d35da3bfefe44089f93e7f1e302eed3';

  constructor(private http: HttpClient) { }

  getPopularGames() {
    return this.http.get(`https://api.rawg.io/api/games?key=${this.API_KEY}&ordering=-rating&page_size=5`);
  }
}
