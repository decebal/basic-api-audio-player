import {Song} from "./Song";
import {UUID} from "./User";

export type SongState = 'PLAYING' | 'PAUSED' | 'STOPPED' | null;

export class Player {
  public userId: string;
  public currentSong: Song = null;
  public currentSongId: string = null;
  public currentSongState: SongState = null;

  constructor(custom: {
    userId: UUID,
    currentSong?: Song,
    currentSongId?: UUID,
    currentSongState?: SongState
  }) {
    const {
      userId,
      currentSong,
      currentSongId,
      currentSongState
    } = custom;
    this.userId = userId;
    this.currentSongId = currentSongId ? currentSongId : null;
    this.currentSong = currentSong ? currentSong : null;
    this.currentSongState = currentSongState ? currentSongState : null;
  }
}
