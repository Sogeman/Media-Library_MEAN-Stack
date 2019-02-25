import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaService } from '../media.service';
import { MediaList } from '../media';
import { FilterService } from '../filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-get',
  templateUrl: './media-get.component.html',
  styleUrls: ['./media-get.component.css']
})
export class MediaGetComponent implements OnInit, OnDestroy {

  mediaList: MediaList;
  filterType: string;
  sub: Subscription;

  constructor(private mediaService: MediaService, private filterService: FilterService) {
  }

  ngOnInit() {
    this.sub = this.filterService.filter // subs to filtertype of filter service and refreshes the view as filtered when it changes
      .subscribe(filterType => {
        this.filterType = filterType;
        this.refreshFilteredView();
      });
    this.refreshView();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  refreshView() {
    this.mediaService.getAllMedia()
      .subscribe(list => this.mediaList = list);
  }

  refreshFilteredView() {
    this.mediaService.getFilteredMedia(this.filterType)
      .subscribe(list => this.mediaList = list);
  }

  deleteMedia(id: string) {
    this.mediaService.deleteMedia(id)
      .subscribe(() => {
        if (this.filterType === undefined) {
          this.refreshView();
        } else {
          this.refreshFilteredView();
        }
      });
  }

}
