import {injectable} from "inversify";
import {IPlayerRepository} from "../../infrastructure/interfaces/IPlayerRepository";
import {Player} from "../../model/entities/Player";
import {User} from "../../model/entities/User";
import {BaseRepository} from "../base/BaseRepository";

@injectable()
export class PlayerRepository extends BaseRepository<Player> implements IPlayerRepository<Player> {
  findOne(user: User): Promise<Player> {
    return undefined;
  }

  update(user: User, item: Player): Promise<boolean> {
    return undefined;
  }

}
