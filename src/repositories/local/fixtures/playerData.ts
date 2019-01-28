import {Player} from "../../../model/entities/Player";
import {Song} from "../../../model/entities/Song";
import {User} from "../../../model/entities/User";

export default [
  new Player({
    user: new User({id: "bf1c16d5-118c-4ac4-9743-0df21ed29773"}),
  }),
  new Player({
    user: new User({id: "b1e7422b-d096-432d-8fe0-31a3dbe4f60c"}),
    currentSong: new Song({id: "cc8dfc03-8f9b-49f3-b6c5-9bc9c9ed59d8"}),
    currentSongState: 'PLAYING',
  }),
];
