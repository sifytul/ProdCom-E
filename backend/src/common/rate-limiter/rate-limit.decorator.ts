// src/common/rate-limiter/rate-limit.decorator.ts
import { SetMetadata } from '@nestjs/common';

export interface RateLimitConfig {
  capacity: number; // bucket size (burst allowance)
  refillRate: number; // tokens per second
  failClosed?: boolean; // override fail-open default for sensitive routes
}

export const RATE_LIMIT_KEY = 'rate_limit_config';
export const RateLimit = (config: RateLimitConfig) =>
  SetMetadata(RATE_LIMIT_KEY, config);
