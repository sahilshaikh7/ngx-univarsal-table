import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalFilterService {

  constructor() { }
  rendering(event , localData){

    return localData
  }
}
