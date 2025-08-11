import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
      JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '300s' },
    }),
      PassportModule],
  exports: [TypeOrmModule],
  providers: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
