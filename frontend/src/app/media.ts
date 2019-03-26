export interface MediaList {
  status: 'success';
  data: Media[];
}

export interface Media {
  media_name: String;
  media_format: String;
  media_location: String;
  _id?: String;
}


