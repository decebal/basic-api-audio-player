import {injectable} from "inversify";
import {User} from "../model/entities/User";
import {BaseRepository} from "./base/BaseRepository";

@injectable()
export class UserRepository extends BaseRepository<User> {

}
