import { Type } from '@nestjs/common';
import { TestingModuleBuilder } from '@nestjs/testing';
import * as supertest from 'supertest';
export interface SupertestOptions {
    userId?: number;
}
export declare type ModuleModifier = (t: TestingModuleBuilder) => TestingModuleBuilder;
export declare const TestTypeOrmModule: import("@nestjs/common").DynamicModule;
export declare const mockTwilio: {
    getFullPhoneNumber: (s: string) => Promise<string>;
    sendSMS: () => Promise<any>;
};
export declare const TestConfigModule: import("@nestjs/common").DynamicModule;
export declare function setupIntegrationTest(module: Type<any>, modifyModule?: ModuleModifier): (u?: SupertestOptions) => supertest.SuperTest<supertest.Test>;
export declare const modifyMockNotifs: ModuleModifier;
export declare const expectUserNotified: (userId: number) => void;
