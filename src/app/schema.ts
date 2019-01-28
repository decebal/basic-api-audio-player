import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import * as path from "path";

import { resolvers } from "./resolvers";

const typeDefs = importSchema(path.join(__dirname, "../model/schema/schema.graphql"));

export const schema = makeExecutableSchema({
  allowUndefinedInResolve: false, // optional
  inheritResolversFromInterfaces: false,  // optional
  parseOptions: {},  // optional
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  }, // optional
  resolvers, // optional
  typeDefs,
});
