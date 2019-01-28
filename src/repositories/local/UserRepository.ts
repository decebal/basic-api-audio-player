import {injectable} from "inversify";
import {IUserRepository} from "../../infrastructure/interfaces/IUserRepository";
import {UUID} from "../../model/entities/Song";
import {User} from "../../model/entities/User";
import userData from "./fixtures/userData";

@injectable()
export class UserRepository implements IUserRepository<User> {
  private userList: User[] = userData;

  public findOne(id: UUID): Promise<User> {
    return Promise.apply(this.userList.find(user => user.id === id));
  }

  public create(user: User): Promise<boolean> {
    return Promise.apply(this.userList.push(user));
  }
}
