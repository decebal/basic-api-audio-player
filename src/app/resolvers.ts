import {lensPath, mergeDeepLeft, view} from 'ramda';
import 'reflect-metadata';
import {ISongRepository, IUserRepository} from "../infrastructure/interfaces";
import {REPOSITORY_PROVIDERS, SERVICE_PROVIDERS} from "../infrastructure/providers";
import {Song, User} from "../model/entities";
import {IPlayerService} from "../model/services/IPlayerService";
import {myContainer} from "./inversify.config";

const playerService = myContainer.get<IPlayerService>(SERVICE_PROVIDERS.IPlayerService);
const songRepository = myContainer.get<ISongRepository<Song>>(REPOSITORY_PROVIDERS.ISongRepository);
const userRepository = myContainer.get<IUserRepository<User>>(REPOSITORY_PROVIDERS.IUserRepository);

const resolvers = {
  Mutation: {
    StoreUser: async (root, args, context, info) => {

    },
    PlaySong: async (root, args, context, info) => {
      const player = await playerService.play(
        new User({id: context.user.uuid}),
        new Song({id: args.input.id})
      );
      const findClientMutationId = lensPath(['input', 'clientMutationId']);

      return mergeDeepLeft(
        { clientMutationId: view(findClientMutationId, args) },
        { player }
      );
    },
    PauseSong: async (root, args, context, info) => {
      const player = await playerService.pause(
        new User({id: context.user.uuid}),
        new Song({id: args.input.id})
      );
      const findClientMutationId = lensPath(['input', 'clientMutationId']);

      return mergeDeepLeft(
        { clientMutationId: view(findClientMutationId, args) },
        { player }
      );
    },
    StopSong: async (root, args, context, info) => {
      const player = await playerService.stop(
        new User({id: context.user.uuid}),
        new Song({id: args.input.id})
      );
      const findClientMutationId = lensPath(['input', 'clientMutationId']);

      return mergeDeepLeft(
        { clientMutationId: view(findClientMutationId, args) },
        { player }
      );
    },
    StoreSong: async (root, args, context, info) => {

    },
  },
  Query: {
    viewer: async (root, args, context, info) => {
      return userRepository.findOne(context.user.uuid);
    },
    song: async (root, args, context, info) => {
      const player = await playerService.getPlayer(context.user.uuid);
      return player.currentSong;
    },
    songs: async (root, args, context, info) => {
      return songRepository.find();
    },
  },
};

export { resolvers };
