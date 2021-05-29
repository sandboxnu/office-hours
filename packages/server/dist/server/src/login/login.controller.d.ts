import { GetSelfEnrollResponse, KhouryDataParams, KhouryRedirectResponse } from '@koh/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserModel } from 'profile/user.entity';
import { Connection } from 'typeorm';
import { LoginCourseService } from './login-course.service';
export declare class LoginController {
    private connection;
    private loginCourseService;
    private jwtService;
    private configService;
    constructor(connection: Connection, loginCourseService: LoginCourseService, jwtService: JwtService, configService: ConfigService);
    recieveDataFromKhoury(req: Request, body: KhouryDataParams): Promise<KhouryRedirectResponse>;
    enterFromKhoury(res: Response, token: string): Promise<void>;
    enterFromDev(res: Response, userId: number): Promise<void>;
    private enter;
    logout(res: Response): Promise<void>;
    selfEnrollEnabledAnywhere(): Promise<GetSelfEnrollResponse>;
    createSelfEnrollOverride(courseId: number, user: UserModel): Promise<void>;
}
