import {Player, Song, User} from "../entities";

export interface IPlayerService {
  play(user: User, song: Song): Promise<Player>;
  pause(user: User, song: Song): Promise<Player>;
  stop(user: User, song: Song): Promise<Player>;
  getPlayer(userId: string): Promise<Player>;
  listPlaying(player?: Player): Promise<Player[]>;
}
