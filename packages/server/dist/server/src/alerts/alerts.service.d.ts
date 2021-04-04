import { Alert } from '@koh/common';
import { Connection } from 'typeorm';
export declare class AlertsService {
    private connection;
    constructor(connection: Connection);
    removeStaleAlerts(alerts: Alert[]): Promise<Alert[]>;
}
