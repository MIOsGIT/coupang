import { product_create_response_dto } from 'src/dto/product.create.response';
import { User } from 'src/user/entity/user.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity({
    database: 'coupang',
})
export class Product{
    @PrimaryGeneratedColumn()
    productnumber: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @Column({ default: true })
    isActive: boolean;

    constructor(){
        this.isActive = true;
    }

    setter(dto: product_create_response_dto){
            this.productnumber = dto.productnumber;
            this.name = dto.name;
            this.price = dto.price;
            this.stock = dto.stock;
        }

}