import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { User } from 'src/user/entity/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  exports: [TypeOrmModule],
  providers: [ProductService, JwtService],
  controllers: [ProductController]
})

export class ProductModule {}