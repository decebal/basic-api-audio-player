import * as R from "ramda";
import {IEntity} from "../../entities/IEntity";
import {base64} from "./base64";

const PREFIX = "connection_prefix:";

interface IPageInfo {
  __typename: "PageInfo",
  endCursor: string | null,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string | null
}

interface IEdge {
  cursor: string,
  node: IEntity
}

export type ITransformer = (entities: IEntity[], totalCount: number) => {
  edges: IEdge[] | [],
  pageInfo: IPageInfo,
  totalCount: number
};

const cursorFromId = (id) => base64(PREFIX + id);

export const edgeTransformer = (item: IEntity) => ({
  cursor: cursorFromId(item.id),
  node: item,
});

const pageInfo: () => IPageInfo
  = () => ({
  __typename: "PageInfo",
  endCursor: null,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: null
});

const edges = (entities: IEntity[]) => R.map(edgeTransformer, entities);


const connectionTransformer: ITransformer = (entities, totalCount) => ({
  edges: edges(entities),
  pageInfo: pageInfo(),
  totalCount
});

export default connectionTransformer;
