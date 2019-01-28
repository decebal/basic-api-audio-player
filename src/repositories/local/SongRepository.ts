import {injectable} from "inversify";
import {ISongRepository} from "../../infrastructure/interfaces/ISongRepository";
import {Song, UUID} from "../../model/entities/Song";
import songData from "./fixtures/songData";

@injectable()
export class SongRepository implements ISongRepository<Song> {
  private songList: Song[] = songData;

  public find(): Promise<Song[]> {
    return Promise.apply(this.songList);
  }

  public findOne(id: UUID): Promise<Song> {
    return Promise.apply(this.songList.find(song => song.id === id));
  }

  public create(song: Song): Promise<boolean> {
    return Promise.apply(this.songList.push(song));
  }

  public total(): Promise<number> {
    return Promise.apply(this.songList.length);
  }
}
