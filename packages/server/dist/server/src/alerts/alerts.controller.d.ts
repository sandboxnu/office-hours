import { CreateAlertParams, CreateAlertResponse, GetAlertsResponse } from '@koh/common';
import { UserModel } from 'profile/user.entity';
import { AlertsService } from './alerts.service';
export declare class AlertsController {
    private alertsService;
    constructor(alertsService: AlertsService);
    getAlerts(courseId: number, user: UserModel): Promise<GetAlertsResponse>;
    createAlert(body: CreateAlertParams): Promise<CreateAlertResponse>;
    closeAlert(alertId: number): Promise<void>;
}
