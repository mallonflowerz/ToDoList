import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  save(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const possible = localStorage.getItem(key);
    return possible ? JSON.parse(possible) : null;
  }

}
