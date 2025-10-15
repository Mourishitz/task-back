import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL!;
const redisPassword = process.env.REDIS_PASSWORD!;

export const redis = createClient({
  url: redisUrl,
  password: redisPassword,
});

redis.on("error", (err) => console.log("Redis Client Error", err));

let instance = await redis.connect();

export function getRedis() {
  return instance;
}

