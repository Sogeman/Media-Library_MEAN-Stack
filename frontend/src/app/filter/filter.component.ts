import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() location = new EventEmitter<string>();

  constructor(private router: Router, private filter: FilterService) {
    this.router.events.subscribe((event: Event) => { // subs to router event and emits the location
      if (event instanceof NavigationEnd) {
        this.location.emit(event.url);
      }
    });
  }

  ngOnInit() {
  }

  saveValue(value: string) {
    this.filter.setFilter(value); // sets value in filter service
  }

}

