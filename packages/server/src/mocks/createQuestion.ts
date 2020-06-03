import { CreateQuestionResponse, QuestionType } from "@template/common";

export const MOCK_CREATE_QUESTION_RESPONSE: CreateQuestionResponse = {
  id: 55,
  creator: {
    id: 884,
    name: "Ryan Drew",
    photoURL:
      "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=120f196b763f1ad522489d35b6818fc25faf0d022cb83ab73c7808a3588da03feabbe92744d2ebad6dda7d41a884ec7a27ada42022d5ea96",
  },
  text: "MCV arcitecture is not making sense",
  taHelped: null,
  createdAt: "2019-09-05T09:44:46.058327-04:00",
  helpedAt: null,
  closedAt: null,
  questionType: QuestionType.Concept,
  status: "Queued",
};
