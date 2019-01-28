import {injectable} from "inversify";
import {Song, UUID} from "../model/entities/Song";
import {BaseRepository} from "./base/BaseRepository";
import songData from "./songData";

@injectable()
export class SongRepository extends BaseRepository<Song> {
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

  public edit(id: UUID, song: Song): Song {
    const targetIndex = this.songList.findIndex((songI => songI.id === id));

    if (this.songList[targetIndex].toJSON() !== song.toJSON()) {
      const mergedProps = {...this.songList[targetIndex], ...song};
      this.songList[targetIndex] = new Song(mergedProps);
    }

    return this.songList[targetIndex];

  }

  public delete(id: UUID): Promise<boolean> {
    const targetIndex = this.songList.findIndex((song => song.id === id));
    if (targetIndex < -1) {
      return null;
    }
    return Promise.apply(() => false);
  }

  public total(): Promise<number> {
    return this.collection.countDocuments({});
  }
}
