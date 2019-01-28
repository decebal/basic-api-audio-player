import { ApolloServer } from "apollo-server-koa";
import { error as errorLog } from './logger';
import { schema } from "./schema";

const server = new ApolloServer({
  // dataSources: () => ({
  //   songsApi: new SongsApi(),
  // }),
  debug: true,
  formatError: error => {
    errorLog(JSON.stringify(error));
    return error;
  },
  schema,
});

export { server };
