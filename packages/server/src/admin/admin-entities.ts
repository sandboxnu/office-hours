import { AdminEntity } from 'nestjs-admin';
import { CourseModel } from '../course/course.entity';
import { QueueModel } from '../queue/queue.entity';
import { UserModel } from '../profile/user.entity';

export class CourseAdmin extends AdminEntity {
  entity = CourseModel;
  listDisplay = ['id', 'name'];
}

export class QueueAdmin extends AdminEntity {
  entity = QueueModel;
  listDisplay = ['id', 'room', 'courseId'];
}

export class UserAdmin extends AdminEntity {
  entity = UserModel;
  listDisplay = ['id', 'email'];
}
