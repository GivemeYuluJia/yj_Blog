import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

// nest 中的模块装饰器
@Module({
  // 引入子模块
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
