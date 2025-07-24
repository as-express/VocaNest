import Redis from 'ioredis';

export const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

redis.on('error', () => {
  console.log('Redis connection err');
});

redis.on('connect', () => {
  console.log('Redis connection success');
});
