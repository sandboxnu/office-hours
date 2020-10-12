import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from '../profile/user.entity';
export interface RolesGuard {
    canActivate(context: ExecutionContext): Promise<boolean>;
    matchRoles(roles: string[], user: UserModel, courseId: number): boolean;
    setupData(request: any): Promise<{
        courseId: number;
        user: UserModel;
    }>;
}
export declare abstract class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
}
