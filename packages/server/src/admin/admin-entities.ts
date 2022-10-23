import { AdminEntity } from 'nestjs-admin';
import { CourseModel } from '../course/course.entity';
import { QueueModel } from '../queue/queue.entity';
import { UserModel } from '../profile/user.entity';
import { CourseSectionMappingModel } from '../login/course-section-mapping.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { SemesterModel } from 'semester/semester.entity';

export class CourseAdmin extends AdminEntity {
  entity = CourseModel;
  listDisplay = ['id', 'name'];
  fields = ['id', 'name', 'icalURL', 'semesterId', 'enabled', 'timezone'];
}

export class QueueAdmin extends AdminEntity {
  entity = QueueModel;
  listDisplay = ['id', 'room', 'courseId'];
}

export class UserAdmin extends AdminEntity {
  entity = UserModel;
  listDisplay = ['id', 'email', 'firstName'];
  searchFields = ['email', 'firstName'];
  fields = [
    'id',
    'email',
    'name',
    'desktopNotifsEnabled',
    'phoneNotifsEnabled',
    'queues',
  ];
}

export class UserCourseAdmin extends AdminEntity {
  entity = UserCourseModel;
  listDisplay = ['id', 'userId', 'courseId'];
}

export class CourseSectionMappingAdmin extends AdminEntity {
  entity = CourseSectionMappingModel;
  listDisplay = ['id', 'genericCourseName', 'section', 'courseId'];
}

export class SemesterAdmin extends AdminEntity {
  entity = SemesterModel;
  listDisplay = ['id', 'season', 'year'];
}
