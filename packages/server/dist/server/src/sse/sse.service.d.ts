import { OnModuleDestroy } from '@nestjs/common';
import { Response } from 'express';
import { RedisService } from 'nestjs-redis';
export declare class SSEService<T> implements OnModuleDestroy {
    private readonly redisService;
    private directConnnections;
    constructor(redisService: RedisService);
    onModuleDestroy(): Promise<void>;
    private idToChannel;
    subscribeClient(room: string, res: Response, metadata: T): Promise<void>;
    sendEvent<D>(room: string, payload: (metadata: T) => Promise<D>): Promise<void>;
}
