import { config } from 'dotenv';
import { AdminUserModel } from './src/admin/admin-user.entity';
import { CourseModel } from './src/course/course.entity';
import { OfficeHourModel } from './src/course/office-hour.entity';
import { SemesterModel } from './src/course/semester.entity';
import { CourseSectionMappingModel } from './src/login/course-section-mapping.entity';
import { DesktopNotifModel } from './src/notification/desktop-notif.entity';
import { PhoneNotifModel } from './src/notification/phone-notif.entity';
import { EventModel } from './src/profile/event-model.entity';
import { UserCourseModel } from './src/profile/user-course.entity';
import { UserModel } from './src/profile/user.entity';
import { QuestionModel } from './src/question/question.entity';
import { QuestionGroupModel } from './src/question/question-group.entity';
import { QueueModel } from './src/queue/queue.entity';
config();

// Options only used whe run via CLI
const inCLI = {
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
};

const typeorm = {
  type: 'postgres',
  url: process.env.DB_URL || 'postgres://postgres@localhost:5432/dev',
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [
    CourseModel,
    CourseSectionMappingModel,
    OfficeHourModel,
    SemesterModel,
    UserModel,
    UserCourseModel,
    QuestionModel,
    QueueModel,
    DesktopNotifModel,
    PhoneNotifModel,
    AdminUserModel,
    EventModel,
    QuestionGroupModel,
  ],
  keepConnectionAlive: true,
  logging: !!process.env.TYPEORM_LOGGING,
  ...(!!process.env.TYPEORM_CLI ? inCLI : {}),
};
module.exports = typeorm;
