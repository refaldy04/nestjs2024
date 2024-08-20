import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [PropertyController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // whitelist untuk mengabaikan field yang tidak ada di dto
        whitelist: true,
        // forbidNonWhitelisted untuk memberikan error ketika ada field yang tidak ada di dto
        forbidNonWhitelisted: true,
        // ini untuk mengonversi param dan query
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class PropertyModule {}
