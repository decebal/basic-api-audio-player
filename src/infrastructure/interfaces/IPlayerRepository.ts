import {User} from "../../model/entities/User";

export interface IPlayerRepository<Player> {
  create(item: Player): Promise<boolean>;
  findOne(user: User): Promise<Player>;
  find(item: Player): Promise<Player[]>;
  update(user: User, item: Player): Promise<boolean>;
}
