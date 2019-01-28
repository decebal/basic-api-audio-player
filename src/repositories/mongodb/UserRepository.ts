import {injectable} from "inversify";
import {IUserRepository} from "../../infrastructure/interfaces/IUserRepository";
import {User} from "../../model/entities/User";
import {BaseRepository} from "../base/BaseRepository";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository<User> {

}
