import { AdminEntity } from 'nestjs-admin';
import { CourseModel } from '../course/course.entity';
import { QueueModel } from '../queue/queue.entity';
import { UserModel } from '../profile/user.entity';
import { CourseSectionMappingModel } from '../login/course-section-mapping.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { SemesterModel } from 'semester/semester.entity';
export declare class CourseAdmin extends AdminEntity {
    entity: typeof CourseModel;
    listDisplay: string[];
    fields: string[];
}
export declare class QueueAdmin extends AdminEntity {
    entity: typeof QueueModel;
    listDisplay: string[];
}
export declare class UserAdmin extends AdminEntity {
    entity: typeof UserModel;
    listDisplay: string[];
    searchFields: string[];
    fields: string[];
}
export declare class UserCourseAdmin extends AdminEntity {
    entity: typeof UserCourseModel;
    listDisplay: string[];
}
export declare class CourseSectionMappingAdmin extends AdminEntity {
    entity: typeof CourseSectionMappingModel;
    listDisplay: string[];
}
export declare class SemesterAdmin extends AdminEntity {
    entity: typeof SemesterModel;
    listDisplay: string[];
}
