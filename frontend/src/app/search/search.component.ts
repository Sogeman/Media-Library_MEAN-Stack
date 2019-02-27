import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchTerm = new EventEmitter<string>();

  constructor(private filter: FilterService) {
  }

  ngOnInit() {}

  setSearchTerm(term: string) {
    this.filter.setSearch(term);
  }
}
