import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // ← Güvenlik başlıklarını aktif ettik
  app.enableCors(); // ← Bu satır CORS sorununu çözer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Fazla alanları temizle
      forbidNonWhitelisted: true, // Fazla alan varsa hata ver
      transform: true, // Tip dönüşümlerine izin ver (string → number vs.)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
