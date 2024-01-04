import morgan, {StreamOptions} from "morgan";

import config from "config"

import Logger from "../../config/logger";

const stream: StreamOptions = {
    write: (message) => Logger.http(message)
}

const skip = () => {
    const env = config.get<string>("env") || "development"
    return env !== "development"
}

const morganMiddleware = morgan(
    ":method - :url - :status - :response-time ms - :res[content-length]",
    {stream, skip}
)

export default morganMiddleware