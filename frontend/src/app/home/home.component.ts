import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { MediaService } from '../media.service';
import { MediaList } from '../media';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  location = '/media';
  mediaList: MediaList;
  pressedFormat: string;


  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private mediaService: MediaService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    } else if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    } else if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    } else if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  ngOnInit() {
    if (!this.mediaService.getMediaFromLocalStorage) {
      localStorage.setItem('mediaList', '[]');
    }
    this.getAllMedia();
  }

  getAllMedia() {
    this.mediaService.getAllMedia()
      .subscribe(list => {
        this.mediaList = list;
        this.mediaService.saveMediaToLocalStorage(this.mediaList);
      });
  }


}
