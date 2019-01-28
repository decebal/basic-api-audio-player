import Record from 'dataclass';

export type SongState = 'PLAYING' | 'PAUSED' | 'STOPPED' | null;
export type UUID = string;
export type Uri = string;


export class Song extends Record<Song> {
  public id: UUID;
  public url: Uri;
  public track: string;
  public artist: string;
  public album: string = "";
  public genre: string = "";
  public duration: number = 0;
  public state: SongState = "STOPPED";
  public createdAt: number = new Date().getTime();
}
