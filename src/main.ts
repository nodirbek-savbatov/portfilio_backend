import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function startApp() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: ["GET","POST","PUT","PATCH","DELETE"],
  })
  const config = new DocumentBuilder()
    .setTitle('Portfilio')
    .setDescription('The Portfilio API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('app.port'), () => {
    console.log(
      `server is running on port: ${configService.get<number>('app.port')}`,
    );
  });
}
startApp();
