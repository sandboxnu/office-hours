import { CanActivate } from '@nestjs/common';
export declare class NonProductionGuard implements CanActivate {
    canActivate(): boolean;
}
