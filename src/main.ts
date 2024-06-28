import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('coloc API')
    .setDescription('API to communicate the front to the back')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document, {
    swaggerOptions: {
      operationsSorter: function (a: any, b: any) {
        var order = { post: '0', get: '1', put: '2', delete: '3' };
        return order[a.get('method')].localeCompare(order[b.get('method')]);
      },
    },
  });

  await app.listen(3000);
}
bootstrap();
