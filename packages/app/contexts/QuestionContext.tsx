import { createContext } from "react";
import {
  Question,
  QuestionStatus,
  QuestionType,
  User,
  UserPartial,
} from "@template/common";

type QuestionContextProps = {
  question: Question;
  updateQuestionType(q: Question, type: QuestionType): void;
  updateText(q: Question, text: string): void;
};
export const QuestionContext = createContext<Partial<QuestionContextProps>>({
  updateQuestionType: (q, type) => {
    q.questionType = type;
  },
  updateText(q: Question, text: string): void {
    q.text = text;
  },
});
