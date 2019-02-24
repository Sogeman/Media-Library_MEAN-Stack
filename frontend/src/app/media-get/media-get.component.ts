import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { MediaList } from '../media';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-media-get',
  templateUrl: './media-get.component.html',
  styleUrls: ['./media-get.component.css']
})
export class MediaGetComponent implements OnInit {

  mediaList: MediaList;
  filterType: string;

  constructor(private mediaService: MediaService, private filterService: FilterService) {
    this.filterService.filter // subs to filtertype of filter service and refreshes the view as filtered when it changes
      .subscribe(filterType => {
        this.filterType = filterType;
        this.refreshFilteredView();
      });
  }

  ngOnInit() {
    this.refreshView();
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
        this.refreshFilteredView();
      });
  }

}
