import {inject, injectable} from "inversify";
import {map} from "ramda";
import {ISongRepository} from "../../infrastructure/interfaces";
import {REPOSITORY_PROVIDERS} from "../../infrastructure/providers";
import {Song} from "../entities";
import {base64} from "./edge/base64";
import {ISongService} from "./ISongService";

const PREFIX = "connection_prefix:";
const cursorFromId = (id) => base64(PREFIX + id);

const edgeTransformer = (song: Song) => ({
  cursor: cursorFromId(song.id),
  node: song,
});

const pageInfo
  = (connectionL) => ({
  __typename: "PageInfo",
  // endCursor: view(lensPath(["data", "pageInfo", "endCursor"]), connectionL) || null,
  // hasNextPage: view(lensPath(["data", "pageInfo", "hasNextPage"]), connectionL) || false,
  // hasPreviousPage: view(lensPath(["data", "pageInfo", "hasPreviousPage"]), connectionL) || false,
  // startCursor: view(lensPath(["data", "pageInfo", "startCursor"]), connectionL) || null
});

const edges = (songs: Song[]) => map(edgeTransformer, songs);

const connectionTransformer = (songs: Song[], totalCount) => ({
  edges: edges(songs),
  // pageInfo: pageInfo(songs),
  totalCount
});

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
