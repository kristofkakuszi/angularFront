import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private _token = "";

  constructor() { }

  get token(): string {
    return this._token;
  }

  set token(idToken) {
    this._token = idToken;
  }



}

