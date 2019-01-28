import {inject, injectable} from "inversify";
import {IPlayerRepository, ISongRepository, IUserRepository} from "../../infrastructure/interfaces";
import {REPOSITORY_PROVIDERS} from "../../infrastructure/providers";
import {Player, Song, User} from "../entities";

@injectable()
export class PlayerService {

  private songRepository: ISongRepository<Song>;
  private userRepository: IUserRepository<User>;
  private playerRepository: IPlayerRepository<Player>;

  constructor(
    @inject(REPOSITORY_PROVIDERS.ISongRepository) songRepository: ISongRepository<Song>,
    @inject(REPOSITORY_PROVIDERS.IUserRepository) userRepository: IUserRepository<User>,
    @inject(REPOSITORY_PROVIDERS.IPlayerRepository) playerRepository: IPlayerRepository<Player>
  ) {
    this.songRepository = songRepository;
    this.userRepository = userRepository;
    this.playerRepository = playerRepository;
  }

  public async play(user: User, song: Song): Promise<Player> {
    const currentUser = await this.userRepository.findOne(user.id);
    const songToBePlayed = await this.songRepository.findOne(song.id);

    const newPlayer = new Player({
      userId: currentUser.id,
      currentSongState: 'PLAYING',
      currentSongId: songToBePlayed.id
    });

    await this.playerRepository.update(
      currentUser.id,
      newPlayer
    );

    return this.getPlayer(currentUser.id);
  }

  public async pause(user: User, song: Song): Promise<Player> {
    const currentUser = await this.userRepository.findOne(user.id);
    const songToBePlayed = await this.songRepository.findOne(song.id);

    const newPLayer = new Player({
      userId: currentUser.id,
      currentSongState: 'PAUSED',
      currentSongId: songToBePlayed.id
    });

    await this.playerRepository.update(
      currentUser.id,
      newPLayer
    );

    return this.getPlayer(currentUser.id);
  }

  public async stop(user: User, song: Song): Promise<Player> {
    const currentUser = await this.userRepository.findOne(user.id);
    const songToBePlayed = await this.songRepository.findOne(song.id);

    const newPLayer = new Player({
      userId: currentUser.id,
      currentSongState: 'STOPPED',
      currentSongId: songToBePlayed.id
    });

    await this.playerRepository.update(
      currentUser.id,
      newPLayer
    );

    return this.getPlayer(currentUser.id);
  }

  public async listPlaying(): Promise<Player[]> {
    return;
  }

  /**
   * Aggregate song onto the player entity
   * @param {string} userId
   * @returns {Promise<Player>}
   */
  public async getPlayer(userId: string): Promise<Player> {
    const player = await this.playerRepository.findOne(userId);
    player.currentSong = await this.songRepository.findOne(player.currentSongId);
    return player;
  }
}
