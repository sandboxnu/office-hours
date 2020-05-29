import { GetQuestionResponse } from "@template/common";

export const MOCK_GET_QUESTION_RESPONSE: GetQuestionResponse = {
  id: 28,
  creator: {
    id: 528,
    name: "Will Stenzel",
    photoURL:
      "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=0b2884680c33dae82b5dcf3bb12bfbf2bfd8a22fef75e9611dca66b0b100549e578d27fe47e25e7d123781f721ac1c760ea864e391e3cc80",
  },
  text: "Recursion is wrecking me",
  taHelped: null,
  createdAt: "2019-07-18T00:56:30.254545-04:00",
  helpedAt: null,
  closedAt: null,
  questionType: "Other",
  status: "Queued",
};
