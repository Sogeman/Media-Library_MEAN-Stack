import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaInputComponent } from './media-input/media-input.component';
import { MediaGetComponent } from './media-get/media-get.component';

const routes: Routes = [
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
  },
  {
    path: '',
    redirectTo: '/media',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
