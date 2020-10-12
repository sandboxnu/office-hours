import { AdminUserModel } from './admin-user.entity';
export declare const adminCredentialValidator: {
    inject: any[];
    useFactory: () => (username: string, password: string) => Promise<AdminUserModel>;
};
