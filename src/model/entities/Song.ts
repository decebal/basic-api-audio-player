export type UUID = string;
export type Uri = string;


export class Song {
  public id: UUID;
  public url: Uri;
  public track: string;
  public artist: string;
  public album: string = "";
  public genre: string = "";
  public duration: number = 0;
  public createdAt: number = new Date().getTime();

  constructor(custom: {
    id: UUID,
    url?: Uri,
    track?: string,
    artist?: string,
    album?: string,
    genre?: string,
    duration?: number,
    createdAt?: number
  }) {
    const {
      id,
      url,
      track,
      artist,
      album,
      genre,
      duration,
      createdAt
    } = custom;
    this.id = id;
    this.url = url;
    this.track= track;
    this.artist = artist;
    this.album = album;
    this.genre = genre;
    if (duration) {
      this.duration = duration;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
  }
}
