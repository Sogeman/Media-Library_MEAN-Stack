import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaService } from '../media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaList, Media } from '../media';

@Component({
  selector: 'app-media-input',
  templateUrl: './media-input.component.html',
  styleUrls: ['./media-input.component.css']
})
export class MediaInputComponent implements OnInit {

  media: MediaList;
  id: string;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private mediaService: MediaService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.createForm();
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.mediaService.getSingleMedia(this.id)
        .subscribe(mediaList => {
          this.media = mediaList;
          this.prefillForm(mediaList.data);
        });
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      media_name: ['', Validators.required],
      media_format: ['', Validators.required],
      media_location: ['', Validators.required]
    });
  }

  prefillForm(media: any) { // type any because I couldn't get it to play nice with my interface, worked but would give me errors
    this.form.get('media_name').setValue(media.media_name);
    this.form.get('media_format').setValue(media.media_format);
    this.form.get('media_location').setValue(media.media_location);
  }

  clearForm() {
    this.form.reset();
  }

  addMedia(media_name: string, media_format: string, media_location: string) {
    this.mediaService.addMedia(this.createMediaObject(media_name, media_format, media_location))
      .subscribe(() => this.clearForm());
  }

  updateMedia(media_name: string, media_format: string, media_location: string) {
    this.mediaService.updateMedia(this.createMediaObject(media_name, media_format, media_location), this.id)
      .subscribe(() => {
        this.router.navigate(['/media']);
      });
  }

  createMediaObject(media_name: string, media_format: string, media_location: string): Media {
    return {
      media_name: media_name,
      media_format: media_format,
      media_location: media_location
    };
  }


}
