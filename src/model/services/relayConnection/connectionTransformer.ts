import {map} from "ramda";
import {IEntity} from "../../entities/IEntity";
import {base64} from "./base64";

const PREFIX = "connection_prefix:";
const cursorFromId = (id) => base64(PREFIX + id);

export const edgeTransformer = (item: IEntity) => ({
  cursor: cursorFromId(item.id),
  node: item,
});

const pageInfo
  = () => ({
  __typename: "PageInfo",
  endCursor: null,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: null
});

const edges = (entities: IEntity[]) => map(edgeTransformer, entities);

const connectionTransformer = (entities: IEntity[], totalCount) => ({
  edges: edges(entities),
  pageInfo: pageInfo(),
  totalCount
});

export default connectionTransformer;
