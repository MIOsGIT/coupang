import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  exports: [TypeOrmModule],
  providers: [UserService, JwtService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
