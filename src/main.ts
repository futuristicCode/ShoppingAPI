import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.setGlobalPrefix('api');
  await app.useGlobalPipes(new ValidationPipe({whitelist:true}));

  const config = new DocumentBuilder()
  .setTitle('The Shopping API')
  .setDescription('The Shopping API DOC ')
  .setVersion('1.0')
  .addTag('Shopping Api')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
