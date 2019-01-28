import {inject} from "inversify";
import {IPlayerRepository} from "../../infrastructure/interfaces/IPlayerRepository";
import {ISongRepository} from "../../infrastructure/interfaces/ISongRepository";
import {IUserRepository} from "../../infrastructure/interfaces/IUserRepository";
import {Player} from "../entities/Player";
import {Song} from "../entities/Song";
import {User} from "../entities/User";

export class PlayerService {

  private songRepository: ISongRepository<Song>;
  private userRepository: IUserRepository<User>;
  private playerRepository: IPlayerRepository<Player>;

  constructor(
    @inject("SongRepository") songRepository: ISongRepository<Song>,
    @inject("UserRepository") userRepository: IUserRepository<User>,
    @inject("UserRepository") playerRepository: IPlayerRepository<Player>
  ) {
    this.songRepository = songRepository;
    this.userRepository = userRepository;
    this.playerRepository = playerRepository;
  }

  public play(user: User, song: Song): Promise<boolean> {
    return Promise.apply(() => true);
  }

  public pause(user: User, song: Song): Promise<boolean> {
    return Promise.apply(() => true);
  }

  public stop(user: User, song: Song): Promise<boolean> {
    return Promise.apply(() => true);
  }

  public listPlaying(): Promise<Player[]> {
    return Promise.apply(() => true);
  }
}
