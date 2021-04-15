import { TACheckinTimesResponse } from '@koh/common';
import { Connection } from 'typeorm';
export declare class CourseService {
    private connection;
    constructor(connection: Connection);
    getTACheckInCheckOutTimes(courseId: number, startDate: string, endDate: string): Promise<TACheckinTimesResponse>;
}
