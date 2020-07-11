import { GetCourseResponse, QuestionType } from "@template/common";

export const MOCK_GET_COURSE_RESPONSE: GetCourseResponse = {
  name: "CS 2500",
  officeHours: [
    {
      id: 84,
      title: "OH - Will",
      room: "RY 154",
      startTime: new Date("2019-09-21T12:00:00-04:00"),
      endTime: new Date("2019-09-21T14:00:00-04:00"),
    },
    {
      id: 82,
      title: "OH - Grisha",
      room: "KA 110",
      startTime: new Date("2019-09-04T06:00:00-04:00"),
      endTime: new Date("2019-09-04T08:00:00-04:00"),
    },
  ],
  queues: [
    {
      id: 45,
      room: "RY 154",
      course: {
        id: 169,
        name: "CS 2500",
      },
      createdAt: new Date("2019-09-04T06:00:00-04:00"),
      closedAt: null,
      staffList: [
        {
          id: 54,
          name: "Will Stenzel",
          photoURL: "https://i.imgur.com/UrYRn0c.jpg",
        },
        {
          id: 42,
          name: "Grisha Zaytsev",
          photoURL: "https://i.imgur.com/iyQyUiN.jpeg",
        },
      ],
      questions: [
        {
          id: 50,
          creator: {
            id: 510,
            name: "Jack Gelinas",
            photoURL:
              "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=601893e5d2e5b25dd08e07f9d7378173e82db54bd9205838172999c54e7976af875c4a6115fa895ccffa2632479ad0de17845fa8e6f2c986",
          },
          text: null,
          taHelped: null,
          createdAt: new Date("2019-08-08T00:57:06.959226-04:00"),
          helpedAt: null,
          closedAt: null,
          questionType: null,
          status: "Drafting",
        },
        {
          id: 51,
          creator: {
            id: 602,
            name: "Ryan Drew",
            photoURL:
              "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=334cee8c85ba5ee2cf0a1cf37323b307d1f2b3ca2305d48808f8d76925cfeee73ccf8a50c5309f3b764511e9292a2b141820b7591cd19329",
          },
          text: "My code it not working. Idk why",
          taHelped: {
            id: 589,
            name: "Josh Rosenberg",
            photoURL: null,
          },
          createdAt: new Date("2019-08-08T00:57:47.149211-04:00"),
          helpedAt: new Date("2019-08-08T00:57:30.470570-04:00"),
          closedAt: new Date("2019-08-08T00:57:47.149107-04:00"),
          questionType: QuestionType.Bug,
          status: "Resolved",
        },
      ],
    },
  ],
};
