import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo deja los parametros establecidos en el dto
      forbidNonWhitelisted: true // lanza un error si se envian mas parametros de los establecidos en el dto
    })
  )
  await app.listen(3000);
}
bootstrap();
