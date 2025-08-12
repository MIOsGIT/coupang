// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

// @Injectable()
// export class UserGuards extends NestAuthGuard('jwt') {
//     canActivate(context: ExecutionContext): any {
//         return super.canActivate(context);
//     }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = request.headers['token'];
        if (!token) return false;
        if (Array.isArray(token)) return false;

        const payload: Payload = this.jwtService.verify(token);
        request.headers['token'] = payload.id.toString();

        return true;
    }
}