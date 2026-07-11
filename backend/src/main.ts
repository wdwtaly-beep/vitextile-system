import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? ['https://yourdomain.com'] : '*',
    credentials: true,
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Aplikasi berjalan di http://localhost:${port}`);
}

bootstrap();
