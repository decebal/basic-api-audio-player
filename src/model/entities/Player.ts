import Record from 'dataclass';
import {Song} from "./Song";
import {User} from "./User";

export type SongState = 'PLAYING' | 'PAUSED' | 'STOPPED' | null;


export class Player extends Record<Player> {
  public user: User;
  public currentSong: Song = null;
  public currentSongState: SongState = null;
}
