import { BaseEntity } from 'typeorm';
export declare class AdminUserModel extends BaseEntity {
    id: number;
    setPassword(password: string): void;
    username: string;
    passwordHash: string;
}
