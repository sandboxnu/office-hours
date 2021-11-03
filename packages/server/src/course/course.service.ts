import {
  ERROR_MESSAGES,
  TACheckinPair,
  TACheckinTimesResponse,
} from '@koh/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { partition } from 'lodash';
import { EventModel, EventType } from 'profile/event-model.entity';
import { QuestionModel } from 'question/question.entity';
import { Between, Connection, In } from 'typeorm';
import { UserCourseModel } from '../profile/user-course.entity';

@Injectable()
export class CourseService {
  constructor(private connection: Connection) {}

  async getTACheckInCheckOutTimes(
    courseId: number,
    startDate: string,
    endDate: string,
  ): Promise<TACheckinTimesResponse> {
    const startDateAsDate = new Date(startDate);
    const endDateAsDate = new Date(endDate);
    if (startDateAsDate.getUTCDate() === endDateAsDate.getUTCDate()) {
      endDateAsDate.setUTCDate(endDateAsDate.getUTCDate() + 1);
    }

    const taEvents = await EventModel.find({
      where: {
        eventType: In([
          EventType.TA_CHECKED_IN,
          EventType.TA_CHECKED_OUT,
          EventType.TA_CHECKED_OUT_FORCED,
        ]),
        time: Between(startDateAsDate, endDateAsDate),
        courseId,
      },
      relations: ['user'],
    });

    const [checkinEvents, otherEvents] = partition(
      taEvents,
      (e) => e.eventType === EventType.TA_CHECKED_IN,
    );

    const taCheckinTimes: TACheckinPair[] = [];

    for (const checkinEvent of checkinEvents) {
      let closestEvent: EventModel = null;
      let mostRecentTime = new Date();
      const originalDate = mostRecentTime;

      for (const checkoutEvent of otherEvents) {
        if (
          checkoutEvent.userId === checkinEvent.userId &&
          checkoutEvent.time > checkinEvent.time &&
          checkoutEvent.time.getTime() - checkinEvent.time.getTime() <
            mostRecentTime.getTime() - checkinEvent.time.getTime()
        ) {
          closestEvent = checkoutEvent;
          mostRecentTime = checkoutEvent.time;
        }
      }

      const numHelped = await QuestionModel.count({
        where: {
          taHelpedId: checkinEvent.userId,
          helpedAt: Between(
            checkinEvent.time,
            closestEvent?.time || new Date(),
          ),
        },
      });

      taCheckinTimes.push({
        name: checkinEvent.user.name,
        checkinTime: checkinEvent.time,
        checkoutTime: closestEvent?.time,
        inProgress: mostRecentTime === originalDate,
        forced: closestEvent?.eventType === EventType.TA_CHECKED_OUT_FORCED,
        numHelped,
      });
    }

    return { taCheckinTimes };
  }

  async removeUserFromCourse(userCourse: UserCourseModel): Promise<void> {
    if (!userCourse) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseNotFound,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await UserCourseModel.remove(userCourse);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.courseController.removeCourse,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
