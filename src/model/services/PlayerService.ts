import {inject, injectable} from "inversify";
import {IPlayerRepository, ISongRepository, IUserRepository} from "../../infrastructure/interfaces";
import {REPOSITORY_PROVIDERS} from "../../infrastructure/providers";
import {Player, Song, User} from "../entities";
import {IPlayerService} from "./IPlayerService";

@injectable()
export class PlayerService implements IPlayerService {

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
    if (currentUser === undefined) {
      throw new Error("User cannot be identified!");
    }
    const songToBePlayed = await this.songRepository.findOne(song.id);
    if (songToBePlayed === undefined) {
      throw new Error("Cannot find requested song!");
    }

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
    if (currentUser === undefined) {
      throw new Error("User cannot be identified!");
    }
    const songToBePlayed = await this.songRepository.findOne(song.id);
    if (songToBePlayed === undefined) {
      throw new Error("Cannot find requested song!");
    }

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
    if (currentUser === undefined) {
      throw new Error("User cannot be identified!");
    }
    const songToBePlayed = await this.songRepository.findOne(song.id);
    if (songToBePlayed === undefined) {
      throw new Error("Cannot find requested song!");
    }

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
    if (userId === null) {
      throw new Error("An audio player instance depends on userId, it cannot be null!");
    }
    let player = await this.playerRepository.findOne(userId);

    if (!player) {
      const newPlayer = new Player({userId});
      await this.playerRepository.create(newPlayer);
      player = await this.playerRepository.findOne(userId);
    }

    if (!player.currentSongId) {
      return player;
    }

    player.currentSong = await this.songRepository.findOne(player.currentSongId);

    return player;
  }
}
