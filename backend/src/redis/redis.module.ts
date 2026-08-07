// src/redis/redis.module.ts
import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        const client = new Redis('redis://:helloredis@redis:6379', {
          db: 1, // separate DB index from cache (which uses db 0)
          enableOfflineQueue: false, // fail fast instead of queueing during outages
        });
        client.on('error', (err) =>
          console.error('RATE LIMITER REDIS ERROR:', err),
        );
        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
