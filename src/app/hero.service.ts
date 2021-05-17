import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private _token = "";

  private faceInDB = []; /*db-be ahol a face=True*/
  private textInDB = []; /*db-be ahol a text=True*/
  private plateInDB = []; /*db-be ahol a plate=True*/

  private userImages = []; /*db-be ahol egyik alg sem talalt semmit*/




  private expired_date = 20

  constructor() { }

  get token(): string {
    return this._token;
  }

  set token(idToken) {
    this._token = idToken;
  }




}

