import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'ormConfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { KeyvCacheableMemory } from 'cacheable';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    ProductModule,
    UserModule,
    AuthModule,
    ReviewModule,
    OrderModule,
    CartModule,
    CategoryModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const redisStore = createKeyv('redis://:helloredis@redis:6379');
        redisStore.on('error', (err) =>
          console.error('KEYV REDIS ERROR:', err),
        );

        const memoryStore = new Keyv({
          store: new KeyvCacheableMemory({ ttl: 60000, lruSize: 5000 }),
        });

        return {
          stores: [memoryStore, redisStore],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
