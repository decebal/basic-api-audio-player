import * as winston from "winston";
import { LOG_LEVEL, LOG_TO_CONSOLE, NODE_ENV } from "./constants";

const logger = new winston.Logger({
    level: LOG_LEVEL,
    transports: [],
});

if (NODE_ENV === "dev" && LOG_TO_CONSOLE) {
    logger.configure({
        transports: [
            new winston.transports.Console({}),
        ],
    });
}

export const info = (...message) =>
    logger.log(
        "info",
        message.reduce((firstPart, secondPart) => firstPart + secondPart),
        {tags: "api-" + NODE_ENV},
    );

export const error = (...message) =>
    logger.log(
        "error",
        message.reduce((firstPart, secondPart) => firstPart + secondPart),
        {tags: "api-" + NODE_ENV},
    );
