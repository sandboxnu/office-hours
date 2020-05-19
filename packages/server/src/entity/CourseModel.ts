import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

/**
 * Represents a course in the context of office hours.
 * @param id - The id number of this Course.
 * @param name - The subject and course number of this course. Ex: "CS 2500"
 * @param semester - The semester of this course.
 */
/*interface Course {
    id: number;
    name: string;
    url: string;
    semester: Semester;
    users: UserCourse[]
}*/


@Entity("course_model")
export class CourseModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("text")
    icalUrl: string;

    //todo: add semester + userCourse

}
