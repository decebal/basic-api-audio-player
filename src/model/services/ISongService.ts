import {Song} from "../entities";
import {ITransformer} from "./relayConnection/connectionTransformer";

export interface ISongService {
  find(song?: Song, transformer?: ITransformer): Promise<any>;
}
