import { Controller, Get, Patch, Post, Body, Query, Delete, Param, Res, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { user_create_reponse_dto } from 'src/dto/user.create.response';
import { user_create_request_dto } from 'src/dto/user.create.request';
import { user_delete_request_dto } from 'src/dto/user.delete.request';
import { user_findone_request_dto } from 'src/dto/user.findone.request';
import { user_login_request_dto } from 'src/dto/user.login.request';
import { Response, Request } from 'express';
import { UserGuards } from './security/user.guard';

@Controller('user')
export class UserController {
    private readonly userService: UserService;
    constructor(_userService: UserService) {
    this.userService = _userService;
    }

    @Get('/all')
    findAll_user(): Promise<user_create_reponse_dto[]> {
    const result = this.userService.findAll_user();
    return result;
    }

    @Get()
    async findOne(@Body() body: user_findone_request_dto){
    return this.userService.findOneByUserId(body);
    }

    @Post()
    async create_user(@Body() body: user_create_request_dto){
    return this.userService.create_user(body);
    }

    @Delete()
    async remote_user(@Body() body: user_delete_request_dto){
    this.userService.remove_user(body);
    }

    @Post('/login')
    async login(@Body() body: user_login_request_dto, @Res() res: Response): Promise<any> {
    const jwt = await this.userService.validateUser(body);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
    }

    @Get('/authenticate')
    @UseGuards(UserGuards)
    isAuthenticated(@Req() req: Request): any { 
        const user: any = req.user;
        return user;
    }
}
