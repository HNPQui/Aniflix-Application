import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('myjwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    async canActivate(context: ExecutionContext) : Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        await super.canActivate(context);
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user?.roles?.includes(role));
    }
}