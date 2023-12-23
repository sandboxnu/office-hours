import { QuestionGroupModel } from 'question/question-group.entity';
import { AlertType, OrganizationRole, QuestionType, Role } from '@koh/common';
import { AlertModel } from 'alerts/alerts.entity';
import { EventModel, EventType } from 'profile/event-model.entity';
import { Factory } from 'typeorm-factory';
import { CourseModel } from '../../src/course/course.entity';
import { SemesterModel } from '../../src/semester/semester.entity';
import { CourseSectionMappingModel } from '../../src/login/course-section-mapping.entity';
import { UserCourseModel } from '../../src/profile/user-course.entity';
import { UserModel } from '../../src/profile/user.entity';
import { QuestionModel } from '../../src/question/question.entity';
import { QueueModel } from '../../src/queue/queue.entity';
import { LastRegistrationModel } from 'login/last-registration-model.entity';
import { ProfSectionGroupsModel } from 'login/prof-section-groups.entity';
import { OrganizationModel } from '../../src/organization/organization.entity';
import { InteractionModel } from 'chatbot/interaction.entity';
import { OrganizationCourseModel } from 'organization/organization-course.entity';
import { OrganizationUserModel } from 'organization/organization-user.entity';

export const UserFactory = new Factory(UserModel)
  .attr('email', `user@ubc.ca`)
  .attr('firstName', 'User')
  .attr('lastName', 'Person')
  .attr('hideInsights', []);

export const StudentCourseFactory = new Factory(UserCourseModel).attr(
  'role',
  Role.STUDENT,
);

export const TACourseFactory = new Factory(UserCourseModel).attr(
  'role',
  Role.TA,
);

export const SemesterFactory = new Factory(SemesterModel)
  .attr('season', 'Fall')
  .attr('year', 2022);

export const CourseFactory = new Factory(CourseModel)
  .attr('name', 'CS 304')
  // calendar is owned by sandboxneu@gmail.com
  .attr(
    'icalURL',
    'https://calendar.google.com/calendar/ical/t6lu2pic7u9otrbpkuk26sl34g%40group.calendar.google.com/public/basic.ics',
  )
  .attr('sectionGroupName', 'CS 304')
  .attr('enabled', true)
  .attr('courseInviteCode', 'invite-code')
  .assocOne('semester', SemesterFactory);

export const CourseSectionFactory = new Factory(CourseSectionMappingModel)
  .attr('crn', 12345)
  .assocOne('course', CourseFactory);

export const UserCourseFactory = new Factory(UserCourseModel)
  .assocOne('user', UserFactory)
  .assocOne('course', CourseFactory)
  .attr('role', Role.STUDENT)
  .attr('override', false);

export const QueueFactory = new Factory(QueueModel)
  .attr('room', 'Online')
  .assocOne('course', CourseFactory)
  .attr('allowQuestions', false)
  .assocMany('staffList', UserFactory, 0)
  .attr('isProfessorQueue', false)
  .attr('isDisabled', false);

// WARNING: DO NOT USE CREATORID. AS YOU SEE HERE, WE ONLY ACCEPT CREATOR
//TODO: make it accept creatorId as well
export const QuestionFactory = new Factory(QuestionModel)
  .attr('text', 'question description')
  .attr('status', 'Queued')
  .attr('questionType', QuestionType.Other)
  .attr('groupable', true)
  .assocOne('queue', QueueFactory)
  .assocOne('creator', UserFactory)
  .attr('createdAt', new Date());

export const QuestionGroupFactory = new Factory(QuestionGroupModel)
  .assocOne('creator', UserCourseFactory)
  .assocOne('queue', QueueFactory);

export const EventFactory = new Factory(EventModel)
  .attr('time', new Date())
  .attr('eventType', EventType.TA_CHECKED_IN)
  .assocOne('user', UserFactory)
  .assocOne('course', CourseFactory);

export const LastRegistrationFactory = new Factory(LastRegistrationModel)
  .attr('lastRegisteredSemester', '202210') // Fall 2022
  .assocOne('prof', UserFactory);

export const ProfSectionGroupsFactory = new Factory(ProfSectionGroupsModel)
  .assocOne('prof', UserFactory)
  .attr('sectionGroups', []);
export const AlertFactory = new Factory(AlertModel)
  .attr('alertType', AlertType.REPHRASE_QUESTION)
  .attr('sent', new Date(Date.now() - 86400000))
  .assocOne('user', UserFactory)
  .assocOne('course', CourseFactory)
  .attr('payload', {});

export const OrganizationFactory = new Factory(OrganizationModel)
  .attr('name', 'UBCO')
  .attr('description', 'UBC Okanagan');

export const InteractionFactory = new Factory(InteractionModel)
  .assocOne('course', CourseFactory)
  .assocOne('user', UserFactory)
  .attr('timestamp', new Date());

export const OrganizationCourseFactory = new Factory(OrganizationCourseModel)
  .assocOne('organization', OrganizationFactory)
  .assocOne('course', CourseFactory);

export const OrganizationUserFactory = new Factory(OrganizationUserModel)
  .assocOne('organization', OrganizationFactory)
  .assocOne('organizationUser', UserFactory)
  .attr('role', OrganizationRole.MEMBER);
