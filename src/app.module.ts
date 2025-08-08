import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'coupang',
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'alwnalwn',
      database: 'coupang',
      entities: [User, Product],
      synchronize: true,
    }),
    UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
