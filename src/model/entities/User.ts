import Record from "dataclass";

export type UUID = string;

export class User extends Record<User>{
  public id: UUID;
  public name: string = "";
  public email: string = "";
  public createdAt: number = new Date().getTime();
}
