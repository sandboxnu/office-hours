import { BaseEntity } from 'typeorm';
import { Season } from '@koh/common';
import { CourseModel } from './course.entity';
export declare class SemesterModel extends BaseEntity {
    id: number;
    season: Season;
    year: number;
    courses: CourseModel[];
}
