import { Controller, Get, Patch, Post, Body, Query, Delete, Param, Res, Req, UseGuards, Headers } from '@nestjs/common';
import { ProductService } from './product.service';
import { product_create_response_dto } from 'src/dto/product.create.response';
import { Product } from './entity/product.entity';
import { product_findone_request_dto } from 'src/dto/product.findone.request';
import { product_create_request_dto } from 'src/dto/product.create.request';
import { product_findone_byID_request_dto } from 'src/dto/product.findone.byID.request';
import { product_delete_request_dto } from 'src/dto/product.delete.request';
import { product_purchase_request_dto } from 'src/dto/product.purchase.request';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/user/security/auth.guard';

@Controller('product')
export class ProductController {
    private readonly productservice: ProductService;
    constructor(_productservice: ProductService) {
        this.productservice = _productservice;
    }
    
        // 상품 조회
        @Get('/all')
        async findAll_product(): Promise<Product[]> {
            return this.productservice.findAll_product();
        }
    
        // 상품 조회 (상품 이름)
        @Get('/name')
        async findOneByName(@Body() body: product_findone_request_dto){
            return this.productservice.findOneByName(body);
        }

        // 상품 조회 (판매자 id)
        @Get('/id')
        async findOneByUserId(@Body() body: product_findone_byID_request_dto){
            return this.productservice.findOneByUserId(body);
        }
    
        // 상품 생성
        @Post()
        @UseGuards(AuthGuard)
        create_product(@Body() body: product_create_request_dto, @Headers('token') token : string){
            // console.log('토큰 검증 후 req.user 객체:', req.user);
            // const buyerId = (req.user as any).id;
            return this.productservice.create(body, token);
        }
    
        // 상품 삭제
        @Delete()
        @UseGuards(AuthGuard)
        remove_product(@Body() body: product_delete_request_dto, @Req() req: Request){
            const buyerId = (req.user as any).id;
            return this.productservice.remove_product(body, buyerId);
        }

        // 상품 구매
        @Post('/purchase')
        @UseGuards(AuthGuard)
        async purchaseProduct(@Body() body: product_purchase_request_dto, @Req() req: Request) {
            const buyerId = (req.user as any).id;
            await this.productservice.purchase(body, buyerId);
        return { message: '상품 구매가 완료되었습니다.' };
        }
}
