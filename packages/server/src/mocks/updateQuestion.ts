import { UpdateQuestionResponse, QuestionType } from "@template/common";

export const MOCK_STUDENT_UPDATE_QUESTION_RESPONSE: UpdateQuestionResponse = {
  id: 83,
  creator: {
    id: 740,
    name: "Will Stenzel",
    photoURL:
      "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=9e41ba5f7da6fbd09ac4a992d613132cbc11a9315ed85cedb6c059a47b4e0d9d13df2a3ffd786aa8a1c36bece1bcb062aa82550f647a466c",
  },
  text: "Do not understand map or filter",
  taHelped: null,
  createdAt: new Date("2019-11-05T09:12:41.856308-05:00"),
  helpedAt: null,
  closedAt: null,
  questionType: QuestionType.Concept,
  status: "Queued",
};

export const MOCK_TA_UPDATE_QUESTION: UpdateQuestionResponse = {
  id: 110,
  creator: {
    id: 202,
    name: "Ryan Drew",
    photoURL:
      "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=93e5370e7fdbdb669f4a75c4de9cfa9ccffbe3e22119d3a51aed1d485d85129e1455cc78b34614367ec6a8a363ca61ed6bd1074bd00c3e6e",
  },
  text: "Having trouble with recursion on problem 2",
  taHelped: {
    id: 132,
    name: "Eddy Li",
    photoURL:
      "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=680b8ab584c39a3363fa902e3f6460b65458761d5cf580eec4ebabc70c3883eebb23ab273736e767a5de99a595a56b7c729c1dc3e50dca22",
  },
  createdAt: new Date("2019-11-05T09:10:46.922147-05:00"),
  helpedAt: new Date("2019-11-05T09:10:46.922055-05:00"),
  closedAt: null,
  questionType: QuestionType.Concept,
  status: "Helping",
};
