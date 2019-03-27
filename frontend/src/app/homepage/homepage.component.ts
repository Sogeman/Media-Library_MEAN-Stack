import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { FilterService } from '../filter.service';
import { MediaList } from '../media';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  formats = [
    { name: 'Bücher', value: 'Buch' },
    { name: 'Filme', value: 'Film' },
    { name: 'Spiele', value: 'Spiel' },
    { name: 'Alles', value: '' }
  ];
  buttonIsPressed: boolean;
  mediaList: MediaList;

  constructor(private filter: FilterService) { }

  ngOnInit() { }

  buttonPressed(format: string) {
    this.buttonIsPressed = true;
    this.filter.chosenFormat = format;
  }

  // get all media and save into local storage and service
  // on load of homepage, retrieve from service or local storage, also reset filter (maybe not necessary because it's display none)
  // on delete and edit update both with new server data
  // on load of library fetch from service or local storage
}
