import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // 创建Nest应用 （引入根模块）
  const app = await NestFactory.create(AppModule);
  // 创建swagger接口文档以及接口测试应用
  const config = new DocumentBuilder()
    .setTitle('接口文档标题')
    .setDescription('描述')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
