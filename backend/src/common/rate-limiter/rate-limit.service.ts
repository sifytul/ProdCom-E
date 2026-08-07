// src/common/rate-limiter/token-bucket.service.ts
import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../../redis/redis.module';
import { TOKEN_BUCKET_SCRIPT } from './token-bucket.lua';

interface TokenBucketRedis extends Redis {
  tokenBucket(
    key: string,
    capacity: number,
    refillRate: number,
    requested: number,
    now: number,
  ): Promise<[number, string]>;
}

@Injectable()
export class TokenBucketService implements OnModuleInit {
  private readonly logger = new Logger(TokenBucketService.name);
  private client: TokenBucketRedis;

  constructor(@Inject(REDIS_CLIENT) redisClient: Redis) {
    // no "private readonly" here — plain param, not a class field
    this.client = redisClient as TokenBucketRedis;
  }

  onModuleInit() {
    this.client.defineCommand('tokenBucket', {
      numberOfKeys: 1,
      lua: TOKEN_BUCKET_SCRIPT,
    });

    this.logger.log('Token bucket Lua script loaded');
  }

  async consume(
    key: string,
    capacity: number,
    refillRate: number,
    requested = 1,
  ): Promise<{ allowed: boolean; remaining: number }> {
    try {
      const now = Date.now();
      const [allowed, remaining] = await this.client.tokenBucket(
        key,
        capacity,
        refillRate,
        requested,
        now,
      );
      return { allowed: allowed === 1, remaining: parseFloat(remaining) };
    } catch (err) {
      this.logger.error(
        `Token bucket consume failed for ${key}: ${err.message}`,
      );
      return { allowed: true, remaining: -1 };
    }
  }
}
