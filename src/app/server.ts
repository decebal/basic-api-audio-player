import {ApolloServer} from "apollo-server-koa";
import {compose} from "ramda";
import {reqToken} from "./http/middleware/reqToken";
import {error as errorLog} from './logger';
import {schema} from "./schema";

export const userContextMap = (token) => {
  let userUuid = null;
  let ut = null;
  let isValidToken = false;

  if (token) {
    userUuid = token.sub;
    ut = token.ut;
    isValidToken = true;
  } else {
    // mock some user up
    userUuid = "bf1c16d5-118c-4ac4-9743-0df21ed29773";
    ut = '';
    isValidToken = true;
  }

  return {
    user: {uuid: userUuid},
    userType: ut,
    hasValidToken: isValidToken
  }
};

const server = new ApolloServer({
  // dataSources: () => ({
  //   playerService: ,
  // }),
  debug: true,
  formatError: error => {
    errorLog(JSON.stringify(error));
    return error;
  },
  schema,
  context: ({ctx}) => {
    return compose(
      userContextMap,
      reqToken
    )(ctx);
  },
});

export {server};
