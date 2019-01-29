import { Container } from "inversify";
import * as interfaces from "../infrastructure/interfaces";
import {REPOSITORY_PROVIDERS, SERVICE_PROVIDERS} from "../infrastructure/providers";
import {Player, Song, User} from "../model/entities";
import {IPlayerService} from "../model/services/IPlayerService";
import {ISongService} from "../model/services/ISongService";
import {PlayerService} from "../model/services/PlayerService";
import {SongService} from "../model/services/SongService";
import * as repositories from "../repositories";

const myContainer = new Container();

myContainer.bind<interfaces.IPlayerRepository<Player>>(REPOSITORY_PROVIDERS.IPlayerRepository).to(repositories.PlayerRepository);
myContainer.bind<interfaces.ISongRepository<Song>>(REPOSITORY_PROVIDERS.ISongRepository).to(repositories.SongRepository);
myContainer.bind<interfaces.IUserRepository<User>>(REPOSITORY_PROVIDERS.IUserRepository).to(repositories.UserRepository);

myContainer.bind<IPlayerService>(SERVICE_PROVIDERS.IPlayerService).to(PlayerService);
myContainer.bind<ISongService>(SERVICE_PROVIDERS.ISongService).to(SongService);

export { myContainer };
