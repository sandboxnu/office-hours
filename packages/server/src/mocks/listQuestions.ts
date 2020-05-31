import { ListQuestionsResponse, QuestionType } from "@template/common";

export const MOCK_STUDENT_LIST_QUESTIONS_RESPONSE: ListQuestionsResponse = [
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
    createdAt: "2019-08-08T00:57:06.959226-04:00",
    helpedAt: null,
    closedAt: null,
    questionType: QuestionType.Concept,
    status: "Queued",
  },
  {
    id: 51,
    creator: {
      id: 602,
      name: "Ryan Drew",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=334cee8c85ba5ee2cf0a1cf37323b307d1f2b3ca2305d48808f8d76925cfeee73ccf8a50c5309f3b764511e9292a2b141820b7591cd19329",
    },
    text: null,
    taHelped: {
      id: 589,
      name: "Josh Rosenberg",
      photoURL: "",
    },
    createdAt: "2019-08-08T00:57:47.149211-04:00",
    helpedAt: "2019-08-08T00:57:30.470570-04:00",
    closedAt: "2019-08-08T00:57:47.149107-04:00",
    questionType: QuestionType.Bug,
    status: "Resolved",
  },
  {
    id: 52,
    creator: {
      id: 298,
      name: "Will Stenzel",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=8833284ae940c1ee05c93c0e4fc9635df9a0c5ba09ff08878fe6e1b4a95a26328a85b9722144f97ce49910ae699ccd719eb49f5c6a6e3426",
    },
    text: null,
    taHelped: {
      id: 589,
      name: "Josh Rosenberg",
      photoURL: "",
    },
    createdAt: "2019-08-08T15:24:10.156893-04:00",
    helpedAt: "2019-08-08T15:23:49.440087-04:00",
    closedAt: "2019-08-08T15:24:10.156755-04:00",
    questionType: QuestionType.Concept,
    status: "Resolved",
  },
  {
    id: 53,
    creator: {
      id: 122,
      name: "Grigory Zaytsev",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=0dba5b33adabc4276bd9469c7e71a4d3f48a8a561bf66242bc50fc4fbb55d7daf7cd00609b918edc9ed3bb95f97c7c0d9d1d92388c43c4ac",
    },
    text: null,
    taHelped: {
      id: 589,
      name: "Josh Rosenberg",
      photoURL: "",
    },
    createdAt: "2019-08-08T15:24:16.651921-04:00",
    helpedAt: "2019-08-08T15:24:16.651827-04:00",
    closedAt: null,
    questionType: QuestionType.Testing,
    status: "Helping",
  },
];

export const MOCK_TA_LIST_QUESTIONS_RESPONSE: ListQuestionsResponse = [
  {
    id: 50,
    creator: {
      id: 510,
      name: "Jack Gelinas",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=601893e5d2e5b25dd08e07f9d7378173e82db54bd9205838172999c54e7976af875c4a6115fa895ccffa2632479ad0de17845fa8e6f2c986",
    },
    text: "Can't figure out on-tick for big bang.",
    taHelped: null,
    createdAt: "2019-08-08T00:57:06.959226-04:00",
    helpedAt: null,
    closedAt: null,
    questionType: QuestionType.Concept,
    status: "Queued",
  },
  {
    id: 51,
    creator: {
      id: 602,
      name: "Ryan Drew",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=334cee8c85ba5ee2cf0a1cf37323b307d1f2b3ca2305d48808f8d76925cfeee73ccf8a50c5309f3b764511e9292a2b141820b7591cd19329",
    },
    text: "Can't figure out bug in my code",
    taHelped: {
      id: 589,
      name: "Josh Rosenberg",
      photoURL: "",
    },
    createdAt: "2019-08-08T00:57:47.149211-04:00",
    helpedAt: "2019-08-08T00:57:30.470570-04:00",
    closedAt: "2019-08-08T00:57:47.149107-04:00",
    questionType: QuestionType.Bug,
    status: "Resolved",
  },
  {
    id: 52,
    creator: {
      id: 298,
      name: "Will Stenzel",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=8833284ae940c1ee05c93c0e4fc9635df9a0c5ba09ff08878fe6e1b4a95a26328a85b9722144f97ce49910ae699ccd719eb49f5c6a6e3426",
    },
    text: "I have no idea what's going on",
    taHelped: {
      id: 589,
      name: "Josh Rosenberg",
      photoURL: "",
    },
    createdAt: "2019-08-08T15:24:10.156893-04:00",
    helpedAt: "2019-08-08T15:23:49.440087-04:00",
    closedAt: "2019-08-08T15:24:10.156755-04:00",
    questionType: QuestionType.Concept,
    status: "Resolved",
  },
  {
    id: 53,
    creator: {
      id: 122,
      name: "Grigory Zaytsev",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=0dba5b33adabc4276bd9469c7e71a4d3f48a8a561bf66242bc50fc4fbb55d7daf7cd00609b918edc9ed3bb95f97c7c0d9d1d92388c43c4ac",
    },
    text: "How do I write Java Docs and tests?",
    taHelped: {
      id: 589,
      name: "Josh Rosenberg",
      photoURL: "",
    },
    createdAt: "2019-08-08T15:24:16.651921-04:00",
    helpedAt: "2019-08-08T15:24:16.651827-04:00",
    closedAt: null,
    questionType: QuestionType.Testing,
    status: "Helping",
  },
];
