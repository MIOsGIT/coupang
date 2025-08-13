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
        const token = request.headers?.authorization?.split("Bearer ");
        if (!token) return false;
        const jwt = token[1];
        //if (Array.isArray(token)) return false;
        
        try{
            const payload: Payload = this.jwtService.verify(jwt, {
                secret: 'SECRET',
            });
            request.headers['token'] = payload.id.toString();

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}