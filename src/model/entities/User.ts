export type UUID = string;

export class User {
  public id: UUID;
  public name: string = "";
  public email: string = "";
  public createdAt: number = new Date().getTime();

  constructor(custom: { id: UUID, name?: string, email?: string, createdAt?: number }) {
    const {id, name, email, createdAt} = custom;
    this.id = id;
    this.name = name;
    this.email = email;
    if (createdAt) {
      this.createdAt = createdAt;
    }
  }
}
