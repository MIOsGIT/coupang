import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  exports: [TypeOrmModule],
  providers: [ProductService],
  controllers: [ProductController]
})

export class ProductModule {}