import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaInputComponent } from './media-input/media-input.component';
import { MediaGetComponent } from './media-get/media-get.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/media',
    pathMatch: 'full'
  },
  {
    path: 'media/create',
    component: MediaInputComponent
  },
  {
    path: 'media/edit/:id',
    component: MediaInputComponent
  },
  {
    path: 'media',
    component: MediaGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
