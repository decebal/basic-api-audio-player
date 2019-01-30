import {inject, injectable} from "inversify";
import {ISongRepository} from "../../infrastructure/interfaces";
import {REPOSITORY_PROVIDERS} from "../../infrastructure/providers";
import {Song} from "../entities";
import {ISongService} from "./ISongService";
import connectionTransformer from "./relayConnection/connectionTransformer";

@injectable()
export class SongService implements ISongService {
  private songRepository: ISongRepository<Song>;

  constructor(
    @inject(REPOSITORY_PROVIDERS.ISongRepository) songRepository: ISongRepository<Song>,
  ) {
    this.songRepository = songRepository;
  }

  public async find(song?: Song): Promise<any> {
    return connectionTransformer(
      await this.songRepository.find(),
      await this.songRepository.total()
    );
  }
}
