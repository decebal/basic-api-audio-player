import { ISongRepository } from "../../repositories/interfaces/ISongRepository";
import { Song } from "../entities/Song";

export class SongService {

    private repository: ISongRepository;

    constructor(repository:ISongRepository){
        this.repository= repository;
    }

    public get(): Song[] {
        return this.repository.get();
    }
    public getById(id: number): Song {
        return this.repository.getById(id);
    }
    public add(song: Song): number {
        return this.repository.add(song);
    }
    public edit(id: number, song: Song): Song {
        return this.repository.edit(id, song);
    }
    public delete(id: number): Song {
        return this.repository.delete(id);
    }
}
