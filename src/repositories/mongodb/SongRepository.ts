import {injectable} from "inversify";
import {ISongRepository} from "../../infrastructure/interfaces/ISongRepository";
import {Song} from "../../model/entities/Song";
import {BaseRepository} from "../base/BaseRepository";

@injectable()
export class SongRepository extends BaseRepository<Song> implements ISongRepository<Song> {

}
