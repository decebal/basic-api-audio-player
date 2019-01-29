export type UUID = string;
export type Uri = string;


export class Song {
  public id: UUID;
  public url: Uri = null;
  public track: string = null;
  public artist: string = null;
  public album: string = null;
  public genre: string = null;
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
    this.url = url ? url : null;
    this.track= track ? track : null;
    this.artist = artist ? artist : null;
    this.album = album ? album : null;
    this.genre = genre ? genre : null;
    if (duration) {
      this.duration = duration;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
  }
}
