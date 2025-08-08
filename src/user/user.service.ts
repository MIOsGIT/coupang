import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { user_create_request_dto } from 'src/dto/user.create.request';
import { user_delete_request_dto } from 'src/dto/user.delete.request';
import { user_findone_request_dto } from 'src/dto/user.findone.request';
import { user_findone_response_dto } from 'src/dto/user.findone.response';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    // 유저 생성
    async create_user(body: user_create_request_dto): Promise<void> {
        const userData = new User();
        userData.setter(body)
        this.userRepository.save(userData);
        return;
    }

    // 유저 리스트 조회
    async findAll_user(): Promise<User[]> {
        return this.userRepository.find();
    }

    // 유저 상세 조회
    async findOneByUserId(dto: user_findone_request_dto): Promise<user_findone_response_dto> {
        const user = await this.userRepository.findOne({
            where: { id: dto.id },
            relations: ['product'],
        });

        if (!user) {
            throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
        }

        return user.toFindOneResponse();
    }

    // 유저 삭제
    async remove_user(body: user_delete_request_dto): Promise<void> {
        await this.userRepository.delete(body);
    }
}
