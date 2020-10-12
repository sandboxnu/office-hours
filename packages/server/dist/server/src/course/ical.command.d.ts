import { IcalService } from './ical.service';
export declare class ICalCommand {
    private readonly icalService;
    constructor(icalService: IcalService);
    create(): Promise<void>;
}
