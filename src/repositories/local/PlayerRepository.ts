import {injectable} from "inversify";
import {IPlayerRepository} from "../../infrastructure/interfaces";
import {Player} from "../../model/entities";
import playerData from "./fixtures/playerData";

@injectable()
export class PlayerRepository implements IPlayerRepository<Player> {
  private playerList: Player[] = playerData;

  public create(item: Player): Promise<boolean> {
    return Promise.apply(this.playerList.push(item));
  }

  public async findOne(userId: string): Promise<Player> {
    return this.playerList.find(item => item.userId === userId);
  }

  public async update(userId: string, item: Player): Promise<boolean> {
    const targetIndex = this.playerList.findIndex(player => player.userId === userId);
    this.playerList[targetIndex] = new Player({...this.playerList[targetIndex], ...item});
    return true;
  }

  public async find(item: Player): Promise<Player[]> {
    return this.playerList;
  }
}
