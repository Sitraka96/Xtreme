import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string) {
    const obj: any = localStorage.getItem(key);
    return JSON.parse(obj);
  }

  setItem(key: string, val: any) {
    const string = JSON.stringify(val);
    localStorage.setItem(key, string);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
