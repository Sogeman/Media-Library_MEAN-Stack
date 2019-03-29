import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaService } from '../media.service';
import { MediaList, Media } from '../media';
import { FilterService } from '../filter.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-media-get',
  templateUrl: './media-get.component.html',
  styleUrls: ['./media-get.component.css']
})
export class MediaGetComponent implements OnInit, OnDestroy {

  mediaList: MediaList;
  filteredList: Media[];
  filterType: string;
  searchTerm: string;
  filter: Subscription;
  search: Subscription;
  confirmationBox: boolean;
  mediaId: string;

  constructor(private mediaService: MediaService, private filterService: FilterService) {
  }

  ngOnInit() {
    this.filterType = this.filterService.chosenFormat;
    this.mediaList = this.mediaService.getMediaFromLocalStorage();
    if (this.filterType) {
      this.mediaList.data = this.mediaList.data.filter(media => media.media_format === this.filterType);
    }
    this.filter = this.filterService.filter // subs to filtertype of filter service and refreshes the view as filtered when it changes
      .subscribe(filterType => {
        this.filterType = filterType;
        this.refreshFilteredView();
      });
    this.search = this.filterService.search
      .pipe(debounceTime(400)) // wait 400ms before getting new search term
      .subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        this.refreshSearchedView();
      });
    if (!this.filterType) {
      this.refreshView();
    } else {
      this.refreshFilteredView();
    }
  }

  ngOnDestroy() {
    this.filter.unsubscribe();
    this.search.unsubscribe();
  }


  refreshView() {
    this.mediaService.getAllMedia()
      .subscribe(list => {
        this.mediaList = list;
        localStorage.setItem('mediaList', JSON.stringify(list));
      });
  }

  refreshFilteredView() {
    this.mediaService.getFilteredMedia(this.filterType)
      .subscribe(list => this.mediaList = list);
  }

  refreshSearchedView() {
    this.mediaService.getSearchResults(this.searchTerm)
      .subscribe(list => this.mediaList = list);
  }

  startDeleteMedia(id: string) {
    this.confirmationBox = true;
    this.mediaId = id;
  }

  deleteMedia(id: string) {
    this.confirmationBox = false;
    this.mediaService.deleteMedia(id)
      .subscribe(() => {
        this.mediaService.refreshLocalMedia();
        if (this.filterType === undefined) {
          this.refreshView();
        } else {
          this.refreshFilteredView();
        }
      });
  }

}
