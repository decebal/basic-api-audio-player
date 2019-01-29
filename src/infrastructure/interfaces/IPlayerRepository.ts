export interface IPlayerRepository<Player> {
  findOne(id: string): Promise<Player>;
  find(item?: Player): Promise<Player[]>;
  update(userId: string, item: Player): Promise<boolean>;
  create(item: Player): Promise<boolean>;
}
