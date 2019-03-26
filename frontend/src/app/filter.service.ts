import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterType = new Subject<string>();
  private searchTerm = new Subject<string>();
  private _chosenFormat: string;

  constructor() { }

  get chosenFormat(): string {
    return this._chosenFormat;
  }
  set chosenFormat(value: string) {
    this._chosenFormat = value;
  }

  filter = this.filterType.asObservable(); // hides filterType and exposes as Observable
  search = this.searchTerm.asObservable();

  setFilter(type: string) {
    this.filterType.next(type);
    this.chosenFormat = type;
  }

  setSearch(term: string) {
    this.searchTerm.next(term);
  }

}
