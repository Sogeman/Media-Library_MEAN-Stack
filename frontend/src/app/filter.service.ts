import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterType = new Subject<any>();

  constructor() { }

  filter = this.filterType.asObservable(); // exposes the filtertype as Observable

  setParams(type: string) {
    this.filterType.next(type);
  }

}
