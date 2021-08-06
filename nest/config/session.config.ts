import connectRedis from "connect-redis";
import session from "express-session";
import redis from "redis";
import * as dotenv from "dotenv";

dotenv.config();


const RedisStore = connectRedis(session);
const _client = redis.createClient({
   host: process.env.REDIS,
   port: Number(process.env.SESSION_PORT),
});

const sessionConfig = {
   secret: process.env.SESSEION_KEY as string,
   name: "sid",
   resave: false,
   saveUninitialized: true,
   store: new RedisStore({
      client: _client,
      ttl: 60 * 60 * 24, //second
   }),
   cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
   },
};

export default sessionConfig;