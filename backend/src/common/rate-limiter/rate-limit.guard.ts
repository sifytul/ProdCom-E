// src/common/rate-limiter/rate-limit.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenBucketService } from './rate-limit.service';
import { RATE_LIMIT_KEY, RateLimitConfig } from './rate-limit.decorator';

const DEFAULT_CONFIG: RateLimitConfig = {
  capacity: 20,
  refillRate: 20 / 60, // 20 tokens per 60s ≈ 0.33/s
};

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenBucketService: TokenBucketService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config =
      this.reflector.get<RateLimitConfig>(
        RATE_LIMIT_KEY,
        context.getHandler(),
      ) ?? DEFAULT_CONFIG;

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const identity = req.user?.id ?? req.ip;
    const routeKey = `${req.method}:${req.route?.path ?? req.url}`;
    const bucketKey = `tb:${routeKey}:${identity}`;

    const { allowed, remaining } = await this.tokenBucketService.consume(
      bucketKey,
      config.capacity,
      config.refillRate,
    );

    res.setHeader('X-RateLimit-Remaining', Math.floor(remaining));

    if (!allowed) {
      res.setHeader('Retry-After', Math.ceil(1 / config.refillRate));
      throw new HttpException(
        'Too many requests. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
