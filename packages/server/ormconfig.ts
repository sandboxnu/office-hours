import { config } from 'dotenv';
import { AdminUserModel } from './src/admin/admin-user.entity';
import { CourseModel } from './src/course/course.entity';
import { SemesterModel } from './src/semester/semester.entity';
import { CourseSectionMappingModel } from './src/login/course-section-mapping.entity';
import { DesktopNotifModel } from './src/notification/desktop-notif.entity';
import { PhoneNotifModel } from './src/notification/phone-notif.entity';
import { EventModel } from './src/profile/event-model.entity';
import { UserCourseModel } from './src/profile/user-course.entity';
import { UserModel } from './src/profile/user.entity';
import { QuestionModel } from './src/question/question.entity';
import { QuestionGroupModel } from './src/question/question-group.entity';
import { QueueModel } from './src/queue/queue.entity';
import { AlertModel } from './src/alerts/alerts.entity';
import { LastRegistrationModel } from './src/login/last-registration-model.entity';
import { ProfSectionGroupsModel } from './src/login/prof-section-groups.entity';
import { QuestionTypeModel } from './src/question/question-type.entity';
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
  url:
    process.env.DB_URL ||
    'postgres://helpme:helpme22@cosc304.ok.ubc.ca:5432/helpme',
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [
    CourseModel,
    CourseSectionMappingModel,
    SemesterModel,
    UserModel,
    UserCourseModel,
    QuestionModel,
    QuestionTypeModel,
    QueueModel,
    DesktopNotifModel,
    PhoneNotifModel,
    AdminUserModel,
    EventModel,
    QuestionGroupModel,
    AlertModel,
    LastRegistrationModel,
    ProfSectionGroupsModel,
  ],
  keepConnectionAlive: true,
  logging:
    process.env.NODE_ENV !== 'production'
      ? ['error']
      : !!process.env.TYPEORM_LOGGING,
  ...(!!process.env.TYPEORM_CLI ? inCLI : {}),
};
module.exports = typeorm;
