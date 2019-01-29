import {injectable} from "inversify";
import {IUserRepository} from "../../infrastructure/interfaces";
import {User} from "../../model/entities";
import {UUID} from "../../model/entities/Song";
import userData from "./fixtures/userData";

@injectable()
export class UserRepository implements IUserRepository<User> {
  public userList: User[] = userData;

  public async findOne(id: UUID): Promise<User> {
    return this.userList.find(user => user.id === id);
  }

  public async create(user: User): Promise<boolean> {
    return this.userList.push(user) !== -1;
  }
}
