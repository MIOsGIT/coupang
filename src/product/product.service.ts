import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ProductService {

}
