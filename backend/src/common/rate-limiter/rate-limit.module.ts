// src/common/rate-limiter/rate-limiter.module.ts
import { Global, Module } from '@nestjs/common';
import { TokenBucketService } from './rate-limit.service';
import { RateLimitGuard } from './rate-limit.guard';

@Global()
@Module({
  providers: [TokenBucketService, RateLimitGuard],
  exports: [TokenBucketService, RateLimitGuard],
})
export class RateLimiterModule {}
