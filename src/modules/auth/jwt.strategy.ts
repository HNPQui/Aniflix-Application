import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { ContextIdFactory } from "@nestjs/core";

interface JwtPayload {
    sub: string; // id của user
    username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt') {

    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        // this.authService.validateUser(payload);
        return payload;
    }
}