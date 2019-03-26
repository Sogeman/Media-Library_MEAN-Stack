import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaInputComponent } from './media-input/media-input.component';
import { MediaGetComponent } from './media-get/media-get.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MediaService } from './media.service';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SearchComponent } from './search/search.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { HomeFormatButtonComponent } from './home-format-button/home-format-button.component';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [
    AppComponent,
    MediaInputComponent,
    MediaGetComponent,
    FilterComponent,
    DeleteConfirmationComponent,
    SearchComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    HomeFormatButtonComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MediaService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

// { provide: LocationStrategy, useClass: HashLocationStrategy }
