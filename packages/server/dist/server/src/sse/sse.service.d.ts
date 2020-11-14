import { Response } from 'express';
export interface Client<T> {
    metadata: T;
    res: Response;
}
export declare class SSEService<T> {
    private clients;
    subscribeClient(room: string, client: Client<T>): void;
    sendEvent<D>(room: string, payload: (metadata: T) => Promise<D>): Promise<void>;
}
