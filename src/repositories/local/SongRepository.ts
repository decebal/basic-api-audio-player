import {injectable} from "inversify";
import {ISongRepository} from "../../infrastructure/interfaces";
import {Song, UUID} from "../../model/entities/Song";
import songData from "./fixtures/songData";

@injectable()
export class SongRepository implements ISongRepository<Song> {
  public songList: Song[] = songData;

  public async find(song?: Song): Promise<Song[]> {
    return this.songList;
  }

  public async findOne(id: UUID): Promise<Song> {
    return this.songList.find(song => song.id === id);
  }

  public async create(song: Song): Promise<boolean> {
    return this.songList.push(song) !== -1;
  }

  public async total(): Promise<number> {
    return this.songList.length;
  }
}
