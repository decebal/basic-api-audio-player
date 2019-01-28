export interface ISongRepository<Song> {
  create(item: Song): Promise<boolean>;
  find(item?: Song): Promise<Song[]>;
  total(): Promise<number>;
  findOne(id: string): Promise<Song>;
}
