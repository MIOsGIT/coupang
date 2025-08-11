import { Controller, Get, Patch, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { product_create_response_dto } from 'src/dto/product.create.response';
import { Product } from './entity/product.entity';
import { product_findone_request_dto } from 'src/dto/product.findone.request';
import { product_create_request_dto } from 'src/dto/product.create.request';
import { product_findone_byID_request_dto } from 'src/dto/product.findone.byID.request';
import { product_delete_request_dto } from 'src/dto/product.delete.request';
import { product_purchase_request_dto } from 'src/dto/product.purchase.request';

@Controller('product')
export class ProductController {
    private readonly productservice: ProductService;
        constructor(_productservice: ProductService) {
        this.productservice = _productservice;
        }
    
        @Get('/all')
        async findAll_product(): Promise<Product[]> {
        return this.productservice.findAll_product();
        }
    
        @Get('/name')
        async findOneByName(@Body() body: product_findone_request_dto){
        return this.productservice.findOneByName(body);
        }

        @Get('/id')
        async findOneByUserId(@Body() body: product_findone_byID_request_dto){
        return this.productservice.findOneByUserId(body);
        }
    
        @Post()
        create_product(@Body() body: product_create_request_dto){
        return this.productservice.create(body);
        }
    
        @Delete()
        remove_product(@Body() body: product_delete_request_dto){
        return this.productservice.remove_product(body);
        }

        @Post('/purchase')
        async purchaseProduct(@Body() body: product_purchase_request_dto) {
        await this.productservice.purchase(body);
        return { message: '상품 구매가 완료되었습니다.' };
    }
}
