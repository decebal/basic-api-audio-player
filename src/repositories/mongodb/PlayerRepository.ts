import {injectable} from "inversify";
import {IPlayerRepository} from "../../infrastructure/interfaces";
import {Player} from "../../model/entities";
import {BaseRepository} from "../base/BaseRepository";

@injectable()
export class PlayerRepository extends BaseRepository<Player> implements IPlayerRepository<Player> {
  public async findOne(userId: string): Promise<Player> {
    return undefined;
  }

  public async update(userId: string, item: Player): Promise<boolean> {
    return undefined;
  }

}
