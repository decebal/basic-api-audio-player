import {Song} from "../entities";

export interface ISongService {
  find(song?: Song): Promise<any>;
}
