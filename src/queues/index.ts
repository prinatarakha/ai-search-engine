import Queue from 'bull';
const { REDIS_HOST, REDIS_PORT } = process.env;
export const createQueue = (
    name: string, 
    redisConnection = `redis://${REDIS_HOST}:${REDIS_PORT}`
) => new Queue(name, redisConnection);
