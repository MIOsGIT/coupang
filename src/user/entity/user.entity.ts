import { user_create_reponse_dto } from 'src/dto/user.create.response';
import { user_findone_response_dto } from 'src/dto/user.findone.response';
import { Product } from 'src/product/entity/product.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
    database: 'coupang',
})
export class User{
    @PrimaryColumn()
    id: string;

    @Column()
    pw: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    createdAt: Date;

    @Column()
    isSeller: boolean

    constructor(){
        this.isActive = true;
        this.createdAt = new Date();
    }

    setter(dto: user_create_reponse_dto){
            this.id = dto.id;
            this.pw = dto.pw;
            this.name = dto.name;
            this.age = dto.age;
            this.isSeller = dto.isSeller
        }

    @OneToMany(() => Product, (product) => product.user)
    product: Product[];

    toFindOneResponse(): user_findone_response_dto {
        return {
            id: this.id,
            name: this.name,
            isActive: this.isActive,
            createdAt: this.createdAt,
            isSeller: this.isSeller,
            products: this.product?.map((p) => ({
                productnumber: p.productnumber,
                name: p.name,
                price: p.price,
                stock: p.stock,
            })) ?? [],
        };
    }
}