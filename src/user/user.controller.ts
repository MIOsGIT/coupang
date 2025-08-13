import { Controller, Get, Patch, Post, Body, Query, Delete, Param, Res, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { user_create_reponse_dto } from 'src/dto/user.create.response';
import { user_create_request_dto } from 'src/dto/user.create.request';
import { user_delete_request_dto } from 'src/dto/user.delete.request';
import { user_findone_request_dto } from 'src/dto/user.findone.request';
import { user_login_request_dto } from 'src/dto/user.login.request';
import { Response, Request } from 'express';
import { AuthGuard } from './security/auth.guard';

@Controller('user')
export class UserController {
    private readonly userService: UserService;
    constructor(_userService: UserService) {
        this.userService = _userService;
    }

    // 유저 조회
    @Get('/all')
    findAll_user(): Promise<user_create_reponse_dto[]> {
    const result = this.userService.findAll_user();
        return result;
    }

    // 유저 조회 (유저 id)
    @Get()
    async findOne(@Body() body: user_findone_request_dto){
        return this.userService.findOneByUserId(body);
    }

    // 유저 생성
    @Post()
    async create_user(@Body() body: user_create_request_dto){
        return this.userService.create_user(body);
    }

    // 유저 삭제
    @Delete()
    @UseGuards(AuthGuard)
    async remote_user(@Body() body: user_delete_request_dto){
        this.userService.remove_user(body);
    }

    // 유저 로그인
    @Post('/login')
    async login(@Body() body: user_login_request_dto): Promise<any> {
        const result = await this.userService.login(body);
        return result;
    }

    // @Get('/authenticate')
    // @UseGuards(AuthGuard)
    // isAuthenticated(@Req() req: Request): any { 
    //     const user: any = req.user;
    //     return user;
    // }
}
