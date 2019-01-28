export interface IRead<T> {
  find(item: T): Promise<T[]>;
  total(): Promise<number>;
  findOne(id: string): Promise<T>;
}
