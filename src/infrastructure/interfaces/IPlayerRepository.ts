export interface IPlayerRepository<Player> {
  create(item: Player): Promise<boolean>;
  findOne(userId: string): Promise<Player>;
  find(item: Player): Promise<Player[]>;
  update(userId: string, item: Player): Promise<boolean>;
}
