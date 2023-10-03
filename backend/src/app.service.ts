import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      success: true,
      message: 'Api is running',
    };
  }
}
