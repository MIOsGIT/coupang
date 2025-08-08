import { Controller, Get, Patch, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { user_create_reponse_dto } from 'src/dto/user.create.response';
import { user_create_request_dto } from 'src/dto/user.create.request';
import { user_delete_request_dto } from 'src/dto/user.delete.request';

@Controller('user')
export class UserController {
    private readonly userService: UserService;
    constructor(_userService: UserService) {
    this.userService = _userService;
    }

    @Get()
    findAll_user(): Promise<user_create_reponse_dto[]> {
    const result = this.userService.findAll_user();
    return result;
    }

    @Post()
    create_user(@Body() body: user_create_request_dto){
    return this.userService.create_user(body);
    }

    @Delete()
    remote_user(@Body() body: user_delete_request_dto){
    this.userService.remove_user(body);
    }
}
