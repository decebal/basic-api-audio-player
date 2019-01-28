import {injectable} from "inversify";
import {IPlayerRepository} from "../../infrastructure/interfaces/IPlayerRepository";
import {Player} from "../../model/entities/Player";
import {User} from "../../model/entities/User";
import playerData from "./fixtures/playerData";

@injectable()
export class PlayerRepository implements IPlayerRepository<Player> {
  private playerList: Player[] = playerData;

  public create(item: Player): Promise<boolean> {
    return Promise.apply(this.playerList.push(item));
  }

  public findOne(user: User): Promise<Player> {
    return Promise.apply(this.playerList.find(item => item.user.id === user.id));
  }

  public update(user: User, item: Player): Promise<boolean> {
    const targetIndex = this.playerList.findIndex(player => player.user.id === user.id);

    this.playerList[targetIndex] = new Player({...this.playerList[targetIndex], ...item});

    return Promise.apply(true);
  }

  public find(item: Player): Promise<Player[]> {
    return Promise.apply(this.playerList);
  }

}
