import * as Koa from "koa";
import { APP_PORT } from "./app/constants";
import { server } from "./app/server";

const app: any = new Koa();
const PORT: number = parseInt(APP_PORT) || 3000;

server.applyMiddleware({ app });

app.listen({ port: PORT });
