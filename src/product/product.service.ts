import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import { product_findone_request_dto } from 'src/dto/product.findone.request';
import { product_findone_reponse_dto } from 'src/dto/product.findone.response';
import { product_findone_byID_request_dto } from 'src/dto/product.findone.byID.request';
import { product_create_request_dto } from 'src/dto/product.create.request';
import { product_delete_request_dto } from 'src/dto/product.delete.request';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    // 상품 생성
    async create(body:product_create_request_dto): Promise<void> {
        const user_ok : User | null = await this.userRepository.findOne({
        where: { id : body.sellerid }
        });

        if (user_ok && user_ok.pw === body.sellerpw) {
            if (user_ok.isSeller) {
                const productData = new Product();
                productData.setter(body); 
                productData.user = user_ok;
                await this.productRepository.save(productData);
            }
            else {
                throw new BadRequestException('상품 등록은 판매자 회원만 가능합니다.');
            }
        } else {
            throw new BadRequestException('회원 정보가 일치하지 않습니다!');
        }
    }

    // 상품 리스트 조회
    async findAll_product(): Promise<Product[]> {
        return this.productRepository.find();
    }

    // 상품 상세 조회 (상품 이름 검색)
    async findOneByName(dto: product_findone_request_dto): Promise<product_findone_reponse_dto[]> {
        try {
            const products = await this.productRepository.createQueryBuilder('product')
                .leftJoinAndSelect('product.user', 'user') 
                .where('product.name = :productName', { productName: dto.name })
                .getMany();

            if (!products || products.length === 0) {
                throw new NotFoundException('해당 상품을 찾을 수 없습니다.');
            }

            return products.map(product => ({
                productnumber: product.productnumber,
                name: product.name,
                price: product.price,
                stock: product.stock,
                sellerid: product.user.id,
            }));
        } catch (error) {
            console.error("Error finding products by name:", error);
            throw new NotFoundException('해당 상품을 찾을 수 없습니다.');
        }
    }

    // 상품 상세 조회 (판매자 ID 검색)
    async findOneByUserId(body: product_findone_byID_request_dto): Promise<product_findone_reponse_dto[]> {
        try {
            const products = await this.productRepository.createQueryBuilder('product')
                .leftJoinAndSelect('product.user', 'user')
                .where('user.id = :userId', { userId: body.sellerid })
                .getMany();

            if (!products || products.length === 0) {
                throw new NotFoundException('해당 유저의 상품을 찾을 수 없습니다.');
            }
            return products.map(product => ({
                productnumber: product.productnumber,
                name: product.name,
                price: product.price,
                stock: product.stock,
                sellerid: product.user.id,
            }));
        } catch (error) {
            console.error("Error finding products by user ID:", error);
            throw new NotFoundException('해당 유저의 상품을 찾을 수 없습니다.');
        }
    }

    // 상품 삭제
    async remove_product(body: product_delete_request_dto): Promise<void> {
        const user_ok = await this.userRepository.findOne({
        where: { id: body.sellerid }
        });

        if (!user_ok || user_ok.pw !== body.sellerpw) {
            throw new BadRequestException('회원 정보가 일치하지 않습니다!');
        }
        const product = await this.productRepository.findOne({
            where: { productnumber: body.productnumber },
            relations: ['user']
        });
        if (!product) {
            throw new NotFoundException('상품이 존재하지 않습니다.');
        }
        if (product.user.id !== body.sellerid) {
            throw new BadRequestException('본인의 상품만 삭제할 수 있습니다.');
        }
        await this.productRepository.delete(body.productnumber);
    }
}
