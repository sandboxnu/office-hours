import { BaseEntity } from 'typeorm';
import { CourseModel } from '../course/course.entity';
export declare class CourseSectionMappingModel extends BaseEntity {
    id: number;
    genericCourseName: string;
    section: number;
    course: CourseModel;
    courseId: number;
}
