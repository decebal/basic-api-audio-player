export interface IUserRepository<User> {
  create(item: User): Promise<boolean>;
  findOne(id: string): Promise<User>;
}
