import { CourseModel } from './src/course/course.entity';
import { OfficeHourModel } from './src/course/office-hour.entity';
import { SemesterModel } from './src/course/semester.entity';
import { UserModel } from './src/profile/user.entity';
import { UserCourseModel } from './src/profile/user-course.entity';
import { QuestionModel } from './src/question/question.entity';
import { QueueModel } from './src/queue/queue.entity';
import { DesktopNotifModel } from './src/notification/desktop-notif.entity';
import { PhoneNotifModel } from './src/notification/phone-notif.entity';
import { AdminUserModel } from './src/admin/admin-user.entity';
import { config } from 'dotenv';
config();

const typeorm = {
  type: 'postgres',
  url: process.env.DB_URL || 'postgres://postgres@localhost:5432/dev',
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [
    CourseModel,
    OfficeHourModel,
    SemesterModel,
    UserModel,
    UserCourseModel,
    QuestionModel,
    QueueModel,
    DesktopNotifModel,
    PhoneNotifModel,
    AdminUserModel,
  ],
  keepConnectionAlive: true,
};
module.exports = typeorm;
