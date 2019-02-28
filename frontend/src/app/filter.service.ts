import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterType = new Subject<string>();
  private searchTerm = new Subject<string>();

  constructor() { }

  filter = this.filterType.asObservable(); // hides filterType and exposes as Observable
  search = this.searchTerm.asObservable();

  setFilter(type: string) {
    this.filterType.next(type);
  }

  setSearch(term: string) {
    this.searchTerm.next(term);
  }

}
